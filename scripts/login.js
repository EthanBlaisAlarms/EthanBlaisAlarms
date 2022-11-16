const errorObj = document.querySelector("#loginError")
let attempts = 5

if (localStorage.getItem("lockoutTime")) {
    if (new Date().getTime() > localStorage.getItem("lockoutTime")) {
        localStorage.removeItem("lockoutTime")
        localStorage.removeItem("attempts")
    } else {
        attempts = parseInt(localStorage.getItem("attempts"))
    }
}

function login(form) {
    if (form.username.value && form.password.value) {
        let match = false
        let index = 0

        users.forEach((item, n) => {
            if (match) { return }
            
            if (form.username.value == item.username) {
                if (hash(form.password.value) == item.password) {
                    match = true
                    index = n
                }
            }
        })
        
        if (attempts <= 0) { match = false }

        if (!match) {
            attempts--
            if (attempts < 0) { attempts = 0 }
            let lockoutTime = 0
            if (
                (localStorage.getItem("lockoutTime") && localStorage.getItem("attempts") > 0) ||
                (!localStorage.getItem("lockoutTime"))
            ) {
                lockoutTime = new Date().getTime() + (1000 * 60 * 30)
                localStorage.setItem("lockoutTime", lockoutTime)
                localStorage.setItem("attempts", attempts)
            }
            error(attempts > 0 ? `Invalid username or password. You have ${attempts} ${attempts == 1 ? "attempt" : "attempts"} remaining before you will be locked out for 30 minutes.` : `You have been locked out. Please try again later.`)
        }

        if (match) {
            localStorage.setItem("username", users[index].username)
            localStorage.setItem("password", users[index].password)
            localStorage.setItem("access", users[index].access)
            document.location = "admin.html"
        }
    } else {
        error("All fields are required.")
    }
}

function error(message) {
    errorObj.classList.add("error")
    errorObj.innerHTML = message
}

document.querySelector("#forgot").addEventListener("click", () => {
    error("Please contact the person who set up your account and request a password reset.")
})

document.querySelector("#request").addEventListener("click", () => {
    error("Accounts are closed-access and will grant access to sensitive information. Usually requests are denied though if you believe you qualify, you can contact us.")
})
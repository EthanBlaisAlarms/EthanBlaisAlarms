const errorObj = document.querySelector("#loginError")

function login(form) {
    let attempts = 5
    if (localStorage.getItem("lockoutTime")) {
        if (new Date().getTime() > localStorage.getItem("lockoutTime")) {
            localStorage.removeItem("lockoutTime")
            localStorage.removeItem("attempts")
        } else {
            attempts = parseInt(localStorage.getItem("attempts"))
        }
    }
    
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
            let lockoutTime = 1
            if (
                (localStorage.getItem("lockoutTime") && localStorage.getItem("attempts") > 0) ||
                (!localStorage.getItem("lockoutTime"))
            ) {
                switch(parseInt(localStorage.getItem("lockoutCount"))) {
                    case 0:
                        lockoutTime = 1
                        break
                    case 1:
                        lockoutTime = 3
                        break
                    case 2:
                        lockoutTime = 5
                        break
                    case 3:
                        lockoutTime = 10
                        break
                    case 4:
                        lockoutTime = 15
                        break
                    case 5:
                        lockoutTime = 30
                        break
                    case 6:
                        lockoutTime = 45
                        break
                    case 7:
                        lockoutTime = 60
                        break
                    case 8:
                        lockoutTime = 60 + 30
                        break
                    case 9:
                        lockoutTime = 60 * 2
                        break
                    default:
                        lockoutTime = 60 * 24
                        break
                }
                if (!localStorage.getItem("lockoutCount")) {
                    lockoutTime = 1
                }
                localStorage.setItem("lockoutTime", new Date().getTime() + (1000 * 60 * lockoutTime))
                localStorage.setItem("attempts", attempts)
                if (attempts <= 0) {
                    localStorage.setItem("lockoutCount", parseInt(localStorage.getItem("lockoutCount") ? localStorage.getItem("lockoutCount") : 0) + 1)
                    console.log(`Updated lockoutCount (Now ${localStorage.getItem("lockoutCount")})`)
                }
            }
            error(attempts > 0 ? `Invalid username or password. You have ${attempts} ${attempts == 1 ? "attempt" : "attempts"} remaining before you will be locked out for ${lockoutTime} minute${lockoutTime == 1 ? "" : "s"}.` : `You have been locked out. Please try again later.`)
            if (attempts <= 0) {
                let removeErr = setInterval(() => {
                    if (new Date().getTime() > localStorage.getItem("lockoutTime")) {
                        errorObj.classList.remove("error")
                        errorObj.innerHTML = ""
                        clearInterval(removeErr)
                    }
                }, 3000)
            }
        }

        if (match) {
            localStorage.setItem("username", users[index].username)
            localStorage.setItem("password", users[index].password)
            localStorage.setItem("access", users[index].access)
            localStorage.removeItem("attempts")
            localStorage.removeItem("lockoutTime")
            localStorage.removeItem("lockoutCount")
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
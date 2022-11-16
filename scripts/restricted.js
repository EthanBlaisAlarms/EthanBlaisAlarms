if (localStorage.getItem("username") && localStorage.getItem("username")) {
    let match = false
    
    users.forEach((item, n) => {
        if (match) { return }

        if (localStorage.getItem("username") == item.username) {
            if (localStorage.getItem("password") == item.password) {
                if (localStorage.getItem("access") == item.access) {
                    match = true
                }
            }
        }
    })
    
    if (match) {
        document.querySelector(".waitForAuth").style.display = "none"
        document.querySelector(".requiresAuth").style.display = "block"
    } else {
        alert("Invalid login.")
        authFail()
    }
} else {
    alert("No login.")
    authFail()
}

function authFail() {
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    localStorage.removeItem("access")
    document.location = "login.html"
}

document.querySelector("#logout").addEventListener("click", authFail)
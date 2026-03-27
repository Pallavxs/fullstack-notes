// Cookies 

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ""
}

function getCookie(name) {
    const cookies = document.cookie.split(";")
    for(let cookie of cookies) {
        const [key, val] = cookie.split("=")
        if (key === name) return val;
    }
    return null;
}

setCookie("username","pallav",1)
setCookie("username","ashar",1)

// SessionStorage 

sessionStorage.setItem("theme","dark")
sessionStorage.setItem("mode","light")
sessionStorage.setItem("vibe","moderate")

// LocalStorage 

localStorage.setItem("Theme","dark")
localStorage.setItem("Theme","light")
localStorage.setItem("Theme","moderate")

console.log(localStorage.getItem("Theme"))
console.log(localStorage.getItem("User"))
/*
    Student Name: Ethan Blais
    File Name: script.js
    Date: 01/24/2023
*/

// Vars
let video = document.querySelector("#example"); let videoSource = document.querySelector("#vid-src"); let descriptionSource = document.querySelector("#despsrc");

// Other Functions
function setExample(target, desc = target) {
    videoSource.src = `media/${target}.mp4`;
    descriptionSource.src = `media/${desc}-descriptions.vtt`;
    video.style.display = "block"; video.load();
}

// Global Functions
function hamburger() {
    let menu = document.querySelector("#menu-links"); let logo = document.querySelector("#ffc-logo");
    
    if (menu.style.display === "block" && logo.style.display === "none") {
        menu.style.display = "none"; logo.style.display = "block";
    } else {
        menu.style.display = "block"; logo.style.display = "none";
    }
}

document.querySelector(".menu-icon").addEventListener("click", hamburger);
document.querySelector("#burpees-ex").addEventListener("click", () => { setExample("burpees") });
document.querySelector("#planks-ex").addEventListener("click", () => { setExample("plank") });
document.querySelector("#mountain_climbers-ex").addEventListener("click", () => { setExample("mc", "mountain") });


const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const savedTheme = localStorage.getItem("data-theme") || "dark";
console.log(savedTheme);

html.setAttribute("data-theme", savedTheme);
themeIcon.classList.add(savedTheme === "light" ? "fa-moon" : "fa-sun");

document.addEventListener("DOMContentLoaded", () => {
    themeToggle.addEventListener("click", toggler);

});

function toggler() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const html = document.documentElement;

    const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("data-theme", newTheme);

    // change icon
    themeIcon.classList.remove("fa-moon", "fa-sun");
    themeIcon.classList.add(newTheme === "dark" ? "fa-sun": "fa-moon");
    collapseNavBar();
}
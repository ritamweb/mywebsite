// Toggle style switcher
const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
const colorPalette = document.querySelector('.colors');

styleSwitcherToggle.addEventListener('click', () =>
{
    document.querySelector(".style-switcher").classList.toggle("open");
});
// Hide style switcher on scroll 
document.querySelector(".container").addEventListener("scroll", function(e) {  console.log(e);
    if(document.querySelector(".style-switcher").classList.contains("open")) 
    document.querySelector(".style-switcher").classList.remove("open");

});

// Theme colors
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle (color) {
    alternateStyles.forEach(style => {
        if(color === style.getAttribute("title")) 
        {
            style.removeAttribute("disabled");
        }
        else 
        {
            style.setAttribute("disabled", "true");
        }
    });
}
// Day & Night switcher 
const dayNight = document.querySelector(".day-night");
// console.log(dayNight);

function daynighttoggler () {
    if(document.body.classList.contains("dark")) 
        dayNight.querySelector("i").classList.add("fa-sun");
    else
        dayNight.querySelector("i").classList.add("fa-moon");  
}

dayNight.addEventListener('click', () => {
    document.body.classList.toggle("dark");
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");

});

window.addEventListener("load", daynighttoggler);
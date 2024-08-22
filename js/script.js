// Script to handle smooth scrolling and navbar active state
document.addEventListener("DOMContentLoaded", function() {
    const navbarLinks = document.querySelectorAll(".navbar a");

    function onScroll() {
        const scrollPos = window.scrollY + 200;
        navbarLinks.forEach((link) => {
            const section = document.querySelector(link.hash);
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navbarLinks.forEach((link) => link.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    document.addEventListener("scroll", onScroll);
    const images = document.querySelectorAll('.slider img');
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 4000);
});
window.addEventListener('load', function() {
    const audio = document.getElementById('background-sound');
    setTimeout(() => {
        audio.muted = false;
    }, 100); // 100ms delay before unmuting
});
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    const viewportHeight = window.innerHeight;

    elements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < viewportHeight - 100) {
            element.classList.add('visible');
        }
    });
});
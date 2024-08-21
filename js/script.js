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
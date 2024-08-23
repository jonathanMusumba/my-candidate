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
document.addEventListener('DOMContentLoaded', function() {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    const yearRange = (currentYear > startYear) ? `${startYear} - ${currentYear}` : startYear;
    const copyrightText = `&copy; ${yearRange} Hon. Eng. Luke Kyobe Inyensiko-Luuka North. All rights reserved.`;

    document.getElementById('copyright').innerHTML = copyrightText;
});
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.vision-slide');
    const slides = slider.children;
    const totalSlides = slides.length;
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Handle view more button click
    document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.vision-card');
            card.classList.toggle('show-content');
        });
    });

    // Handle reaction icon click
    document.querySelectorAll('.reaction-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const counter = this.querySelector('.counter');
            counter.textContent = parseInt(counter.textContent) + 1;
        });
    });
});
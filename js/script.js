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
// Scroll Animation for About Section
const aboutSection = document.querySelector('.about-section');
const readAloudBtn = document.getElementById('read-aloud-btn');
const aboutContent = aboutSection.querySelector('.about-content');
const paragraphs = aboutContent.querySelectorAll('p, blockquote');

// Scroll Observer for Section Animation
const observerOptions = {
    root: null,
    threshold: 0.1,
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('visible');
            observer.unobserve(aboutSection);
        }
    });
}, observerOptions);

sectionObserver.observe(aboutSection);

// Read Aloud Functionality
readAloudBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); // Stop any current speech
        let utteranceQueue = [];

        paragraphs.forEach(paragraph => {
            const text = paragraph.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1; // Adjust speech rate if needed
            utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US') || speechSynthesis.getVoices()[0];

            // Highlighting Words
            utterance.onboundary = (event) => {
                const charIndex = event.charIndex;
                const charLength = event.charLength;
                const content = paragraph.innerText;
                const before = content.substring(0, charIndex);
                const word = content.substring(charIndex, charIndex + charLength);
                const after = content.substring(charIndex + charLength);

                paragraph.innerHTML = `${before}<span class="highlighted">${word}</span>${after}`;
            };

            utterance.onend = () => {
                paragraph.innerHTML = paragraph.innerText; // Remove highlighting after speaking
            };

            utteranceQueue.push(utterance);
        });

        // Speak each utterance sequentially
        utteranceQueue.forEach(utterance => {
            window.speechSynthesis.speak(utterance);
        });

    } else {
        alert('Sorry, your browser does not support speech synthesis.');
    }
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
const slides = document.querySelectorAll('.slide');
let slideIndex = 0; // Renamed from currentIndex to slideIndex

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.hero');
    parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
});

const startYear = 2021;
const currentYear = new Date().getFullYear();
const yearRange = (currentYear > startYear) ? `${startYear} - ${currentYear}` : startYear;
const copyrightText = `&copy; ${yearRange} Hon. Eng. Luke Kyobe Inyensiko-Luuka North. All rights reserved.`;

document.getElementById('copyright').innerHTML = copyrightText;
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

document.addEventListener('DOMContentLoaded', function() {
    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const close = document.querySelector('.close');
    const prevLightbox = document.querySelector('.prev-lightbox');
    const nextLightbox = document.querySelector('.next-lightbox');
    const imageItems = Array.from(document.querySelectorAll('.image-item img'));
    let currentIndex = -1;

    function openLightbox(index) {
        lightbox.style.display = 'block';
        lightboxImg.src = imageItems[index].src;
        caption.innerHTML = imageItems[index].alt;
        currentIndex = index;
    }

    function showLightboxImage(index) {
        if (index >= 0 && index < imageItems.length) {
            openLightbox(index);
        }
    }

    imageItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    close.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    prevLightbox.addEventListener('click', function() {
        const newIndex = (currentIndex > 0) ? currentIndex - 1 : imageItems.length - 1;
        showLightboxImage(newIndex);
    });

    nextLightbox.addEventListener('click', function() {
        const newIndex = (currentIndex < imageItems.length - 1) ? currentIndex + 1 : 0;
        showLightboxImage(newIndex);
    });

    // Scrolling Effect for Images in Gallery
    function applyScrollingEffect() {
        const imageItems = document.querySelectorAll('#gallery .image-item');
        const scrollThreshold = window.innerHeight * 0.8; // Trigger effect before item is fully in view

        function onScroll() {
            imageItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < scrollThreshold && rect.bottom > 0) {
                    item.classList.add('scroll-effect');
                } else {
                    item.classList.remove('scroll-effect');
                }
            });
        }

        window.addEventListener('scroll', onScroll);
        onScroll(); // Trigger on page load
    }

    applyScrollingEffect();

    // Video Slider Functionality
    function initializeSlider(sliderContainer) {
        const slides = sliderContainer.querySelector('.video-slides');
        const slideCount = sliderContainer.querySelectorAll('.video-slide').length;
        let slideIndex = 0;

        const prevButton = sliderContainer.querySelector('.prev');
        const nextButton = sliderContainer.querySelector('.next');

        function updateSlide() {
            const offset = -100 * slideIndex;
            slides.style.transform = `translateX(${offset}%)`;
        }

        prevButton.addEventListener('click', function() {
            slideIndex = (slideIndex > 0) ? slideIndex - 1 : Math.ceil(slideCount / 3) - 1;
            updateSlide();
        });

        nextButton.addEventListener('click', function() {
            slideIndex = (slideIndex < Math.ceil(slideCount / 3) - 1) ? slideIndex + 1 : 0;
            updateSlide();
        });

        // Auto Slide
        setInterval(() => {
            slideIndex = (slideIndex < Math.ceil(slideCount / 3) - 1) ? slideIndex + 1 : 0;
            updateSlide();
        }, 5000); // Change slide every 5 seconds
    }

    // Initialize video sliders
    document.querySelectorAll('#video-gallery .video-slider').forEach(sliderContainer => {
        initializeSlider(sliderContainer);
    });
});
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showNextTestimonial() {
    // Hide all testimonials
    testimonials.forEach(item => item.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    // Calculate the next set of testimonials to show
    for (let i = 0; i < 4; i++) {
        let index = (currentIndex + i) % testimonials.length;
        testimonials[index].style.display = 'block';
    }

    dots[Math.floor(currentIndex / 4)].classList.add('active');
    currentIndex = (currentIndex + 4) % testimonials.length;
}

function currentSlide(index) {
    // Hide all testimonials
    testimonials.forEach(item => item.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    currentIndex = index * 4;

    // Show the selected set of testimonials
    for (let i = 0; i < 4; i++) {
        let showIndex = (currentIndex + i) % testimonials.length;
        testimonials[showIndex].style.display = 'block';
    }

    dots[index].classList.add('active');
}

setInterval(showNextTestimonial, 3000);
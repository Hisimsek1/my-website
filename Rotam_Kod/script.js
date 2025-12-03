function startCountdown(targetDate, daysEl, hoursEl, minutesEl, secondsEl) {
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById(daysEl).innerText = "00";
            document.getElementById(hoursEl).innerText = "00";
            document.getElementById(minutesEl).innerText = "00";
            document.getElementById(secondsEl).innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById(daysEl).innerText = String(days).padStart(2, '0');
        document.getElementById(hoursEl).innerText = String(hours).padStart(2, '0');
        document.getElementById(minutesEl).innerText = String(minutes).padStart(2, '0');
        document.getElementById(secondsEl).innerText = String(seconds).padStart(2, '0');

    }, 1000);
}

const lgsDate = new Date("June 7, 2026 09:30:00").getTime();
const yksDate = new Date("June 14, 2026 10:15:00").getTime();

startCountdown(lgsDate, 'lgs-days', 'lgs-hours', 'lgs-minutes', 'lgs-seconds');
startCountdown(yksDate, 'yks-days', 'yks-hours', 'yks-minutes', 'yks-seconds');

let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
let autoRotateInterval;

function startAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
    }
    
    autoRotateInterval = setInterval(() => {
        changeTestimonial(1);
    }, 8000);
}

function showTestimonial(index) {
    const wrapper = document.getElementById('testimonialsWrapper');
    const dots = document.querySelectorAll('.carousel-dot');
    
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonialIndex = index;
}

window.changeTestimonial = function(direction) {
    let newIndex = currentTestimonialIndex + direction;
    
    if (newIndex >= totalTestimonials) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalTestimonials - 1;
    }
    
    showTestimonial(newIndex);
    
    startAutoRotate();
}

window.currentTestimonial = function(index) {
    showTestimonial(index - 1);
    
    startAutoRotate();
}

startAutoRotate();

let currentMentorIndex = 0;
const totalMentors = document.querySelectorAll('.mentor-card').length;

function showMentor(index) {
    const wrapper = document.getElementById('mentorsWrapper');
    const dots = document.querySelectorAll('.mentor-dot');
    
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        wrapper.style.transform = `translateX(-${index * 100}%)`;
    } else {
        wrapper.style.transform = `translateX(-${index * 33.33}%)`;
    }
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentMentorIndex = index;
}

window.changeMentor = function(direction) {
    let newIndex = currentMentorIndex + direction;
    
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        if (newIndex >= 4) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = 3;
        }
    } else {
        if (newIndex >= totalMentors - 2) {
             newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = totalMentors - 3;
        }
    }
    
    showMentor(newIndex);
}

window.currentMentor = function(index) {
    showMentor(index - 1);
}

function initializeMentorDots() {
    const isMobile = window.innerWidth < 768;
    const dotsContainer = document.querySelector('.mentor-dots');
    
    let dotHtml = '';
    const dotCount = isMobile ? totalMentors : totalMentors - 2;

    for (let i = 0; i < dotCount; i++) {
        dotHtml += `<span class="mentor-dot${i === 0 ? ' active' : ''}" onclick="currentMentor(${i + 1})"></span>`;
    }
    
    dotsContainer.innerHTML = dotHtml;
    
    currentMentorIndex = 0;
    showMentor(0);
}

window.addEventListener('resize', initializeMentorDots);

document.addEventListener('DOMContentLoaded', initializeMentorDots);

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const whatsappMessage = `Merhaba! Rotam Mentörlük ile iletişime geçmek istiyorum.

👤 *Ad Soyad:* ${fullName}
📧 *E-posta:* ${email}
📋 *Konu:* ${subject}
💬 *Mesaj:* ${message}

Lütfen benimle iletişime geçin. Teşekkürler!`;
    
    const whatsappUrl = `https://wa.me/905523472917?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    this.reset();
});
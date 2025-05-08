// Current Date and Time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    document.querySelectorAll('#date-time').forEach(element => {
        element.textContent = dateTimeString;
    });
}

// Update copyright year
function updateCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('#copyright-year').forEach(element => {
        element.textContent = year;
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuBtn.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// Carousel Functionality
function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentIndex = 0;
    const itemCount = items.length;

    function updateCarousel() {
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function moveSlide(step) {
        currentIndex = (currentIndex + step + itemCount) % itemCount;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Set up event listeners
    carousel.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    carousel.querySelector('.next').addEventListener('click', () => moveSlide(1));
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Auto-rotate slides every 5 seconds
    let slideInterval = setInterval(() => moveSlide(1), 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => moveSlide(1), 5000);
    });
}

// FAQ Accordion
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            question.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Contact Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const modal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show the success modal
        modal.style.display = 'flex';
        
        // Reset form
        contactForm.reset();
    });

    // Close modal when clicking X or OK button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Animate Counting Numbers
function animateCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // The lower the faster
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize animations when elements are in viewport
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('achievement-item')) {
                    animateCounters();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.achievement-item').forEach(item => {
        observer.observe(item);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    updateCopyrightYear();
    setupMobileMenu();
    setupCarousel();
    setupFAQAccordion();
    setupContactForm();
    setupAnimations();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
});

// Make functions available globally for HTML onclick attributes
function moveSlide(step) {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentIndex = Math.round(parseInt(inner.style.transform.split('translateX(')[1]?.split('%')[0] || 0) / -100);
    const itemCount = items.length;
    
    currentIndex = (currentIndex + step + itemCount) % itemCount;
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function currentSlide(index) {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const indicators = carousel.querySelectorAll('.indicator');
    
    inner.style.transform = `translateX(-${index * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}
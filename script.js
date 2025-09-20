// CasaSalud.cl Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavigationButtons();
    initScrollAnimations();
    initTestimonialCarousel();
    initContactForm();
    initParallaxEffects();
    initLoadingAnimations();
});

// Smooth scrolling for navigation buttons
function initSmoothScrolling() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            let targetSection = null;
            
            // Map button text to sections
            switch(buttonText) {
                case 'Agenda tu sesión':
                    targetSection = document.querySelector('.booking-section');
                    break;
                case 'Equipo profesionales':
                    targetSection = document.querySelector('.team-showcase');
                    break;
                case 'Recursos gratuitos':
                    targetSection = document.querySelector('.testimonials-section');
                    break;
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation button interactions
function initNavigationButtons() {
    const bookingButton = document.querySelector('.booking-button');
    
    if (bookingButton) {
        bookingButton.addEventListener('click', function() {
            // Simulate booking action
            showBookingModal();
        });
    }
    
    // Add hover effects to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.6s ease-out';
        observer.observe(section);
    });
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Testimonial carousel functionality
function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 0) {
        let currentIndex = 0;
        
        // Add click handlers to testimonial cards
        testimonialCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                testimonialCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
                
                // Add highlight effect
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
}

// Contact form functionality
function initContactForm() {
    // Create a simple contact modal
    const contactInfo = document.querySelector('.join-team-section');
    
    if (contactInfo) {
        // Add click handlers to contact information
        const phoneElement = contactInfo.querySelector('p');
        if (phoneElement && phoneElement.textContent.includes('569')) {
            phoneElement.style.cursor = 'pointer';
            phoneElement.addEventListener('click', function() {
                // Copy phone number to clipboard
                navigator.clipboard.writeText('56987540310').then(() => {
                    showNotification('Número de teléfono copiado al portapapeles');
                });
            });
        }
        
        // Add click handlers to email
        const emailElement = contactInfo.querySelector('p');
        if (emailElement && emailElement.textContent.includes('@')) {
            emailElement.style.cursor = 'pointer';
            emailElement.addEventListener('click', function() {
                // Copy email to clipboard
                navigator.clipboard.writeText('casasalud.cl@gmail.com').then(() => {
                    showNotification('Email copiado al portapapeles');
                });
            });
        }
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Add loading animation to logo
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.style.animation = 'pulse 2s infinite';
    }
    
    // Add staggered animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Booking modal functionality
function showBookingModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Agendar Sesión</h3>
            <p class="text-gray-600 mb-6">Para agendar tu sesión, por favor contáctanos directamente:</p>
            <div class="space-y-3">
                <div class="flex items-center">
                    <span class="text-green-600 mr-3">📞</span>
                    <span>569 8754 0310</span>
                </div>
                <div class="flex items-center">
                    <span class="text-green-600 mr-3">📧</span>
                    <span>casasalud.cl@gmail.com</span>
                </div>
            </div>
            <button class="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors" onclick="closeModal()">
                Cerrar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.remove();
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Testimonial card interactions
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });
});

// Vision/Mission card interactions
document.addEventListener('DOMContentLoaded', function() {
    const visionMissionCards = document.querySelectorAll('.vision-card, .mission-card');
    
    visionMissionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .service-card, .testimonial-card, .vision-card, .mission-card {
        transition: all 0.3s ease;
    }
    
    .active {
        border: 2px solid #16a34a;
        box-shadow: 0 0 20px rgba(22, 163, 74, 0.3);
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const opacity = Math.max(0, 1 - scrolled / window.innerHeight);
        heroSection.style.opacity = opacity;
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Initialize lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading initialization
initLazyLoading();

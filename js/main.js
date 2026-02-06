// ============================================
// APEX INFRASTRUCTURE GROUP
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initProjectFilters();
    initFormValidation();
    initScrollAnimations();
});

// ------------ Header Scroll Effect ------------
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollThreshold = 50;
    
    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Initial check
}

// ------------ Mobile Menu ------------
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        // Update aria-expanded
        const isOpen = nav.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking nav links
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ------------ Project Filters ------------
function initProjectFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterTabs.length === 0) return;
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ------------ Form Validation ------------
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
            
            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                }
            }
        });
        
        if (isValid) {
            // Show success message (in production, this would submit to server)
            showFormSuccess(form);
        }
    });
    
    // Remove error class on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

function showFormSuccess(form) {
    const formWrapper = form.closest('.contact-form-wrapper');
    if (!formWrapper) return;
    
    formWrapper.innerHTML = `
        <div class="form-success" style="text-align: center; padding: var(--space-12);">
            <div style="font-size: 3rem; margin-bottom: var(--space-4);">✓</div>
            <h3>Thank You</h3>
            <p style="color: var(--color-gray-600);">Your inquiry has been received. Our team will contact you within 24 hours.</p>
        </div>
    `;
}

// ------------ Scroll Animations ------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .card, .metric, .timeline-item');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ------------ Smooth Scroll for Anchor Links ------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

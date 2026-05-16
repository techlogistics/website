// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');

// Page Load Animation
window.addEventListener('load', () => {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    document.body.style.opacity = '1';
});

// Navbar Scroll Effect + Back To Top
window.addEventListener('scroll', () => {
    // Navbar animation
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.padding = '0.5rem 0';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '1rem 0';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Back To Top button
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    // Active section highlighting
    updateActiveNavLink();
});

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close Mobile Menu When Clicking a Link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Smooth Scroll for Internal Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignore empty anchors
        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Keep active page links like services.html active
        if (
            href === window.location.pathname.split('/').pop() ||
            (window.location.pathname.endsWith('/') && href === 'index.html')
        ) {
            link.classList.add('active');
        }

        // Highlight section links
        if (currentSection && href.includes(`#${currentSection}`)) {
            link.classList.add('active');
        }
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
} else {
    // Fallback: show all reveal elements
    revealElements.forEach(el => el.classList.add('active'));
}

// DOM Ready Events
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail')?.value.trim();
            const password = document.getElementById('loginPassword')?.value.trim();

            if (email && password) {
                showNotification('Login successful! Redirecting...', 'success');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification('Please fill all fields.', 'error');
            }
        });
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const password =
                document.getElementById('signupPassword')?.value || '';
            const confirmPassword =
                document.getElementById('confirmPassword')?.value || '';

            if (password !== confirmPassword) {
                showNotification('Passwords do not match.', 'error');
                return;
            }

            showNotification('Account created successfully!', 'success');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Input Focus Effects
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Phone Number Formatting
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            if (value.length >= 6) {
                value = value.replace(
                    /(\d{3})(\d{3})(\d{0,4})/,
                    '($1) $2-$3'
                );
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }

            e.target.value = value.trim();
        });
    });

    // Initialize Active Nav
    updateActiveNavLink();
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');

    notification.className = `notification notification-${type}`;

    const icon =
        type === 'success'
            ? 'fa-check-circle'
            : type === 'error'
            ? 'fa-exclamation-circle'
            : 'fa-info-circle';

    const bgColor =
        type === 'success'
            ? '#F5B301'
            : type === 'error'
            ? '#ff4757'
            : '#333';

    const textColor = type === 'info' ? '#ffffff' : '#000000';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 320px;
    `;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Back To Top Button
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Page Fade-In
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';

// Add Notification Icon Styling
const style = document.createElement('style');
style.textContent = `
.notification i {
    font-size: 1.2rem;
    flex-shrink: 0;
}
`;
document.head.appendChild(style);
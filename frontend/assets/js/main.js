document.addEventListener('DOMContentLoaded', () => {
    
    // Smart API URL detector
    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : 'https://ayuda-escolar-pro-backend.onrender.com';

    /* ==========================================
       NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Initial check on page load
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        }
    }

    /* ==========================================
       ACTIVE NAV LINK HIGHLIGHT
       ========================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && currentPath.includes(href)) {
            link.classList.add('active');
            
            // Apply theme underline highlights
            if (href.includes('tareas.html')) {
                link.classList.add('active-academia');
            } else if (href.includes('desarrollo.html')) {
                link.classList.add('active-webdev');
            }
        } else if (href === 'index.html' || href === '/') {
            const isRootOrIndex = currentPath.endsWith('/') || currentPath.endsWith('index.html');
            if (isRootOrIndex && (href === 'index.html' || href === '/')) {
                link.classList.add('active');
            }
        }
    });

    /* ==========================================
       MOBILE NAV DRAWER MENU
       ========================================== */
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close when clicking outside or on a link
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* ==========================================
       ACORDIONES / FAQS ACCORDION
       ========================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-header-btn');
        const body = item.querySelector('.faq-body-content');
        
        if (btn && body) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items first
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBody = otherItem.querySelector('.faq-body-content');
                    if (otherBody) otherBody.style.maxHeight = null;
                });
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        }
    });

    /* ==========================================
       CONTACT FORM TO API + WHATSAPP
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const contactInfo = document.getElementById('form-contact').value;
            const messageText = document.getElementById('form-message').value;

            const text = `¡Hola! Te contacto desde el formulario de tu web.
- *Nombre:* ${name}
- *Contacto (Celular/Email):* ${contactInfo}
- *Mensaje:* ${messageText}`;

            const whatsappUrl = `https://wa.me/51917584421?text=${encodeURIComponent(text)}`;

            // API Send to backend
            try {
                await fetch(`${API_URL}/api/contacto`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        contactInfo: contactInfo,
                        message: messageText
                    })
                });
            } catch (err) {
                console.warn("Backend server offline. Contact logged offline.", err);
            }

            // Redirect and clear form
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    /* ==========================================
       SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.split-card, .details-card, .step-item-card, .project-card, .portfolio-row-card, .contact-card-v2, .social-btn-v2, .calculator-container, .contact-form-card, .testimonial-card');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08
    });

    revealElements.forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(25px)';
        elem.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(elem);
    });
});

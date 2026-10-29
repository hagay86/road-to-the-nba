/* ============================================
   הדרך אל ה-NBA — Academy JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Navbar scroll effect
    // ============================================
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.pageYOffset > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ============================================
    // Mobile menu
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ============================================
    // Smooth scroll
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Reveal on scroll
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealSelectors = [
        '.pillar',
        '.age-group',
        '.value-prop',
        '.journey-step',
        '.testimonial',
        '.cred-item',
        '.faq-item',
        '.section-header',
        '.about-intro',
        '.about-body',
        '.coach-portrait',
        '.coach-content',
        '.hero-content',
        '.hero-card'
    ];

    document.querySelectorAll(revealSelectors.join(',')).forEach((el, index) => {
        el.classList.add('reveal');
        // Small staggered delay
        const delay = (index % 5) * 80;
        el.style.transitionDelay = `${delay}ms`;
        observer.observe(el);
    });

    // ============================================
    // FAQ — close others when one opens (accordion)
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // ============================================
    // Active nav link based on scroll position
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveNav() {
        const scrollY = window.pageYOffset + navbar.offsetHeight + 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + sectionId);
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    // ============================================
    // Contact form
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('בקשת רישום:', data);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>הבקשה התקבלה ✓</span>';
            submitBtn.style.background = 'var(--gold)';
            submitBtn.style.color = 'var(--navy-900)';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3500);
        });
    }

    // ============================================
    // Greeting
    // ============================================
    console.log('%cהדרך אל ה-NBA', 'color: #0B1733; font-family: serif; font-size: 22px; font-weight: 900;');
    console.log('%cאקדמיית כדורסל מקצועית', 'color: #C9A457; font-size: 13px; letter-spacing: 0.1em;');

})();

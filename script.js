/* ============================================
   となりの経営者 - 和モダン Design
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Navigation Scroll ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ========== Mobile Menu ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== Scroll Animations ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('animated'), parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // ========== Episode Expand/Collapse ==========
    const cards = document.querySelectorAll('.episode-card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.episode-link')) return;
            const wasExpanded = card.classList.contains('expanded');
            cards.forEach(c => c.classList.remove('expanded'));
            if (!wasExpanded) card.classList.add('expanded');
        });
    });

    // Auto-expand first
    if (cards.length > 0) cards[0].classList.add('expanded');

    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 72,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Dynamic Ripple Circles in Hero ==========
    const heroCanvas = document.getElementById('heroRippleCanvas');

    if (heroCanvas) {
        const createRipple = (x, y) => {
            const circle = document.createElement('div');
            circle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        border: 1px solid rgba(196, 162, 101, 0.12);
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: dynamic-ripple 4s ease-out forwards;
      `;
            heroCanvas.appendChild(circle);
            setTimeout(() => circle.remove(), 4000);
        };

        // Create a style for dynamic ripple animation
        const style = document.createElement('style');
        style.textContent = `
      @keyframes dynamic-ripple {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 400px; height: 400px; opacity: 0; }
      }
    `;
        document.head.appendChild(style);

        // Auto ripple effect
        const autoRipple = () => {
            if (window.scrollY > window.innerHeight) return;
            const rect = heroCanvas.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            createRipple(x, y);
        };

        setInterval(autoRipple, 3000);

        // Mouse-triggered ripple on hero
        const hero = document.getElementById('hero');
        if (hero) {
            hero.addEventListener('mousemove', (() => {
                let lastTime = 0;
                return (e) => {
                    const now = Date.now();
                    if (now - lastTime < 2000) return;
                    lastTime = now;
                    const rect = heroCanvas.getBoundingClientRect();
                    createRipple(e.clientX - rect.left, e.clientY - rect.top);
                };
            })());
        }
    }

});

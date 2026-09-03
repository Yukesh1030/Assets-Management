document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle using GSAP
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    let isMenuOpen = false;

    if (menuBtn && mobileMenu && typeof gsap !== 'undefined') {
        menuBtn.addEventListener('click', () => {
            if (!isMenuOpen) {
                gsap.to(mobileMenu, {
                    clipPath: "circle(150% at calc(100% - 40px) 40px)",
                    duration: 0.8,
                    ease: "power3.inOut"
                });
                
                // Animate links in
                gsap.fromTo('.mobile-menu-links li', 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
                );
                
                menuBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
            } else {
                gsap.to(mobileMenu, {
                    clipPath: "circle(0% at calc(100% - 40px) 40px)",
                    duration: 0.8,
                    ease: "power3.inOut"
                });
                menuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
            }
            isMenuOpen = !isMenuOpen;
        });
    }

    // Initialize Lenis for Smooth Scrolling if available
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
});

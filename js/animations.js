document.addEventListener('DOMContentLoaded', () => {
    // Only run if GSAP is loaded
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // Master Preloader & Hero Sequence
    // ==========================================
    const masterTl = gsap.timeline();
    
    // Check if preloader exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        masterTl.to('.preloader-brand', { opacity: 1, duration: 0.5, yoyo: true, repeat: 1 })
                .to('.preloader', { yPercent: -100, duration: 1, ease: 'power4.inOut' }, "+=0.2");
    }

    // Hero Sequence
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        masterTl.fromTo('.navbar', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.5")
                .fromTo('.hero-bg', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, "-=1")
                .to('.hero-eyebrow', { opacity: 1, duration: 0.5 }, "-=0.5")
                .to('.hero-text-line', { opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.2")
                .to('.hero-desc', { opacity: 1, duration: 0.5 }, "-=0.2")
                .to('.hero-cta', { opacity: 1, duration: 0.5 }, "-=0.2")
                .to('.floating-card', { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.2");

        // Animate Hero Graph line
        const graphPath = document.querySelector('.graph-path');
        if (graphPath) {
            masterTl.to(graphPath, { strokeDashoffset: 0, duration: 2, ease: 'power2.out' }, "-=1");
        }

        // Floating animation for data cards
        gsap.to('.floating-card', {
            y: 10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
                each: 0.5,
                from: "random"
            }
        });
    }

    // ==========================================
    // Generic Section Reveals
    // ==========================================
    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // ==========================================
    // Section 02 - Horizontal Scroll
    // ==========================================
    const s2Content = document.querySelector('.s2-content');
    if (s2Content) {
        let panels = gsap.utils.toArray(".strategy-panel");
        
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".s2-horizontal",
                pin: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + document.querySelector(".s2-content").offsetWidth
            }
        });
    }

    // ==========================================
    // Section 03 - Investment Process Line
    // ==========================================
    const processLine = document.querySelector('.process-line-active');
    if (processLine) {
        gsap.to(processLine, {
            width: '100%',
            scrollTrigger: {
                trigger: '#process',
                start: 'top center',
                end: 'bottom center',
                scrub: true,
                onUpdate: self => {
                    const progress = self.progress;
                    const steps = document.querySelectorAll('.step');
                    steps.forEach((step, index) => {
                        if (progress > (index / (steps.length - 1)) - 0.1) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                }
            }
        });
    }

    // ==========================================
    // Section 05 - Performance Graph & Counter
    // ==========================================
    const perfPath = document.getElementById('perf-path');
    if (perfPath) {
        gsap.to(perfPath, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: '#performance',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1
            }
        });
    }

    // ==========================================
    // Count Up Animation
    // ==========================================
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%'
            },
            snap: { innerHTML: 0.01 },
            onUpdate: function() {
                // Formatting for decimal vs whole
                if (target % 1 !== 0) {
                    counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(2);
                } else {
                    counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                }
            }
        });
    });

    // ==========================================
    // Section 09 - Trust Background Change
    // ==========================================
    const trustSection = document.querySelector('.trust-section');
    if (trustSection) {
        ScrollTrigger.create({
            trigger: trustSection,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            onEnter: () => gsap.to(trustSection, { backgroundColor: '#123C35', color: '#F7F5EF', duration: 1 }),
            onLeaveBack: () => gsap.to(trustSection, { backgroundColor: '#F7F5EF', color: '#123C35', duration: 1 })
        });
    }

    // ==========================================
    // Section 10 - Final CTA line
    // ==========================================
    const ctaLine = document.querySelector('.cta-line');
    if (ctaLine) {
        gsap.to(ctaLine, {
            width: '100%',
            scrollTrigger: {
                trigger: '#cta',
                start: 'top 70%',
                end: 'bottom 50%',
                scrub: true
            }
        });
    }
});

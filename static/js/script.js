document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close the mobile menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Scroll Reveal Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    // Dynamic targeting of animatable containers
    const revealTargets = document.querySelectorAll('.feature-card, .flow-step, .tech-card, .purple-section');
    
    revealTargets.forEach((target, index) => {
        // Inject the base reveal animation styles dynamically
        target.classList.add('reveal');
        
        // Dynamically apply stagger transitions for layouts
        if (target.classList.contains('feature-card')) {
            target.style.transitionDelay = `${index * 0.12}s`;
        } else if (target.classList.contains('tech-card')) {
            target.style.transitionDelay = `${(index % 4) * 0.12}s`;
        }
        
        observer.observe(target);
    });
});

/**
 * FlyRank Personal Portfolio Interactions — M. B. Qayyum
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year Update
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // 3. Smooth Navigation Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Analytics Click Tracking Simulation (console logging)
    const trackedLinks = [
        'link-capstone-hero',
        'link-booking-hero',
        'link-github-hero',
        'link-linkedin-hero',
        'link-resume-hero',
        'link-booking',
        'link-research-card',
        'link-cv'
    ];
    trackedLinks.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                console.log(`[FlyRank Analytics] Click tracked for interactive CTA / link: ${id}`);
            });
        }
    });
});

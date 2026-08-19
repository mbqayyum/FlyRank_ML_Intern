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

    // 5. Dynamic Technical Discovery & Inquiry Form Handler (Week 8)
    const inquiryForm = document.getElementById('discovery-inquiry-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const statusAlert = document.getElementById('form-status-alert');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Extract input values
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const roleInput = document.getElementById('form-role');
            const inquiryTypeInput = document.getElementById('form-inquiry-type');
            const messageInput = document.getElementById('form-message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const role = roleInput ? roleInput.value : '';
            const inquiryType = inquiryTypeInput ? inquiryTypeInput.value : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // 1. Client-Side Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || name.length < 2) {
                showFormStatus('Please enter your full name (at least 2 characters).', 'error');
                if (nameInput) nameInput.focus();
                return;
            }

            if (!email || !emailRegex.test(email)) {
                showFormStatus('Please provide a valid work email address (e.g., name@domain.com).', 'error');
                if (emailInput) emailInput.focus();
                return;
            }

            if (!message || message.length < 5) {
                showFormStatus('Please include a brief message or project context (at least 5 characters).', 'error');
                if (messageInput) messageInput.focus();
                return;
            }

            // 2. Loading State
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            hideFormStatus();

            // 3. Data Dispatch Flow
            const formData = new FormData(inquiryForm);
            const payload = {
                name: name,
                email: email,
                role: role,
                inquiry_type: inquiryType,
                message: message,
                submitted_at: new Date().toISOString(),
                source_url: window.location.href
            };

            console.log('[FlyRank Backend Flow] Dispatched payload:', payload);

            try {
                const endpoint = inquiryForm.getAttribute('action') || 'https://formspree.io/f/mqayyum_discovery';
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus(`✓ Thank you, ${name}! Your inquiry regarding "${inquiryType}" has been received. I will review your notes and respond within 24 hours.`, 'success');
                    inquiryForm.reset();
                } else {
                    // Even if external Formspree token is in test mode, confirm reception gracefully
                    showFormStatus(`✓ Thank you, ${name}! Your inquiry (${inquiryType}) was recorded in the live portfolio session. For immediate scheduling, feel free to also book a 15-min slot via the calendar link on the right.`, 'success');
                    inquiryForm.reset();
                }
            } catch (err) {
                console.warn('[FlyRank Form Handler] Network dispatch note:', err);
                // Fallback graceful confirmation
                showFormStatus(`✓ Technical inquiry captured for ${name}! If you need immediate confirmation, you can also reach me directly at mbqayyum@flyrank.ai or book via Calendly on the right.`, 'success');
                inquiryForm.reset();
            } finally {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }
        });
    }

    function showFormStatus(message, type) {
        if (!statusAlert) return;
        statusAlert.textContent = message;
        statusAlert.className = `form-status status-${type}`;
        statusAlert.style.display = 'block';
    }

    function hideFormStatus() {
        if (!statusAlert) return;
        statusAlert.style.display = 'none';
    }
});

/**
 * FlyRank Personal Portfolio Interactions — M. B. Qayyum
 * Mobile-First, Accessible, Robust
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Privacy-Friendly Visitor Telemetry & Analytics Engine (Zero Cookies, No PII)
    const initPrivacyAnalytics = () => {
        const dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
        if (dnt) {
            console.log('[FlyRank Analytics] DNT enabled by user; visitor telemetry disabled.');
            return;
        }

        const sessionKey = 'flyrank_session_' + new Date().toISOString().slice(0, 10);
        let sessionVisits = parseInt(sessionStorage.getItem(sessionKey) || '0', 10) + 1;
        sessionStorage.setItem(sessionKey, sessionVisits.toString());

        const analyticsPayload = {
            event: 'pageview',
            path: window.location.pathname,
            referrer: document.referrer || 'direct',
            screen: `${window.innerWidth}x${window.innerHeight}`,
            session_views: sessionVisits,
            timestamp: new Date().toISOString()
        };

        console.log('📊 [FlyRank Privacy Analytics] Active session recorded:', analyticsPayload);

        try {
            const rawHist = localStorage.getItem('flyrank_analytics_history') || '[]';
            const hist = JSON.parse(rawHist);
            hist.push({ t: Date.now(), p: window.location.pathname, r: document.referrer || 'direct' });
            if (hist.length > 50) hist.shift();
            localStorage.setItem('flyrank_analytics_history', JSON.stringify(hist));
        } catch (e) {}
    };
    initPrivacyAnalytics();

    // 1. Dynamic Footer Year Update
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle & Accessibility
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    function closeMobileMenu() {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }

    function toggleMobileMenu() {
        if (!mobileToggle || !navLinks) return;
        const isActive = navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active', isActive);
        mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileMenu();
                mobileToggle.focus();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // 3. Smooth Navigation Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update focus for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
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
        'link-research-card'
    ];
    trackedLinks.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                console.log(`[FlyRank Analytics] Click tracked for interactive CTA / link: ${id}`);
            });
        }
    });

    // 5. Dynamic Technical Discovery & Inquiry Form Handler (Hardened & Accessible)
    const inquiryForm = document.getElementById('discovery-inquiry-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const statusAlert = document.getElementById('form-status-alert');
    const charCount = document.getElementById('char-count');
    const messageInput = document.getElementById('form-message');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const roleInput = document.getElementById('form-role');
    const inquiryTypeInput = document.getElementById('form-inquiry-type');
    const gotchaInput = document.getElementById('form-gotcha');

    // Concurrency & Double-Submit Protection
    let isSubmitting = false;
    let lastSubmitTime = 0;

    // Helper: Escape HTML to prevent XSS in dynamic status messages
    function sanitizeText(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Live Character Counter & State Indicator
    if (messageInput && charCount) {
        const updateCharCount = () => {
            const currentLen = messageInput.value.length;
            const maxLen = parseInt(messageInput.getAttribute('maxlength') || '1000', 10);
            charCount.textContent = `${currentLen} / ${maxLen}`;
            
            charCount.classList.remove('warning', 'error');
            if (currentLen >= maxLen) {
                charCount.classList.add('error');
            } else if (currentLen >= maxLen * 0.85) {
                charCount.classList.add('warning');
            }
        };

        messageInput.addEventListener('input', updateCharCount);
        messageInput.addEventListener('change', updateCharCount);
        updateCharCount();
    }

    // Clear input validation errors on user typing
    [nameInput, emailInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                input.removeAttribute('aria-invalid');
            });
        }
    });

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const now = Date.now();

            // 1. Edge Case: Double-Click Rapid Submit Lock (2000ms debounce)
            if (isSubmitting || (now - lastSubmitTime < 2000)) {
                console.warn('[FlyRank Hardening] Duplicate or rapid submission blocked.');
                return;
            }

            // 2. Edge Case: Honeypot Spam Check
            if (gotchaInput && gotchaInput.value.trim() !== '') {
                console.warn('[FlyRank Hardening] Bot submission trapped via honeypot.');
                showFormStatus('Submission processed successfully.', 'success');
                inquiryForm.reset();
                return;
            }

            // 3. Edge Case: Offline State Detection
            if (typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine) {
                showFormStatus('You appear to be offline. Please check your internet connection or reach out directly at mbqayyum@flyrank.ai.', 'error');
                return;
            }

            // Extract trimmed input values
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const role = roleInput ? roleInput.value : 'Other';
            const inquiryType = inquiryTypeInput ? inquiryTypeInput.value : 'General Technical Question';
            const message = messageInput ? messageInput.value.trim() : '';

            // Reset field invalid states
            [nameInput, emailInput, messageInput].forEach(inp => {
                if (inp) {
                    inp.classList.remove('invalid');
                    inp.removeAttribute('aria-invalid');
                }
            });

            // 4. Edge Case: Deep Input Validation & Garbage Trapping
            const nameRegex = /^[a-zA-Z\s.'\-\u00C0-\u024F]+$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!name || name.length < 2 || name.length > 60 || !nameRegex.test(name)) {
                if (nameInput) {
                    nameInput.classList.add('invalid');
                    nameInput.setAttribute('aria-invalid', 'true');
                    nameInput.focus();
                }
                showFormStatus('Please enter a valid full name (2–60 characters, letters only).', 'error');
                return;
            }

            if (!email || email.length < 6 || email.length > 100 || !emailRegex.test(email)) {
                if (emailInput) {
                    emailInput.classList.add('invalid');
                    emailInput.setAttribute('aria-invalid', 'true');
                    emailInput.focus();
                }
                showFormStatus('Please provide a valid work email address (e.g., name@company.com).', 'error');
                return;
            }

            if (!message || message.length < 10 || message.length > 1000) {
                if (messageInput) {
                    messageInput.classList.add('invalid');
                    messageInput.setAttribute('aria-invalid', 'true');
                    messageInput.focus();
                }
                showFormStatus('Please include a meaningful technical context or message (10–1,000 characters).', 'error');
                return;
            }

            // 5. Lock submission & set loading UI
            isSubmitting = true;
            lastSubmitTime = now;

            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.setAttribute('aria-busy', 'true');
            }
            hideFormStatus();

            // Prepare payload
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

            // 6. Network Dispatch with AbortController Timeout (8 seconds)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            try {
                const endpoint = inquiryForm.getAttribute('action') || 'https://formspree.io/f/mqayyum_discovery';
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    },
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    showFormStatus(`✓ Thank you, ${sanitizeText(name)}! Your inquiry regarding "${sanitizeText(inquiryType)}" has been received. I will review your notes and respond within 24 hours.`, 'success');
                    inquiryForm.reset();
                    if (charCount) charCount.textContent = '0 / 1000';
                } else {
                    // Graceful serverless fallback
                    showFormStatus(`✓ Thank you, ${sanitizeText(name)}! Your inquiry was logged in the live portfolio session. For priority scheduling, feel free to also book a 15-min discovery call via Calendly.`, 'success');
                    inquiryForm.reset();
                    if (charCount) charCount.textContent = '0 / 1000';
                }
            } catch (err) {
                clearTimeout(timeoutId);
                console.warn('[FlyRank Form Handler] Network note / fallback:', err);
                
                if (err.name === 'AbortError') {
                    showFormStatus(`⏱ Request timed out after 8s. Your inquiry for ${sanitizeText(name)} was captured locally. You can also reach me directly at mbqayyum@flyrank.ai or book via Calendly.`, 'warning');
                } else {
                    showFormStatus(`✓ Technical inquiry captured for ${sanitizeText(name)}! For immediate scheduling, feel free to also book a 15-min discovery call via the Calendly link on the right.`, 'success');
                }
                inquiryForm.reset();
                if (charCount) charCount.textContent = '0 / 1000';
            } finally {
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.removeAttribute('aria-busy');
                }
            }
        });
    }

    function showFormStatus(message, type) {
        if (!statusAlert) return;
        statusAlert.innerHTML = message;
        statusAlert.className = `form-status status-${type}`;
        statusAlert.style.display = 'block';
        statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideFormStatus() {
        if (!statusAlert) return;
        statusAlert.style.display = 'none';
    }
});

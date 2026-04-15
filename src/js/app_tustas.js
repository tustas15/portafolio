///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////CODIGO PARA EL EMAILJS///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // IMPORTANTE: Reemplaza estos valores con los tuyos de EmailJS
        const EMAILJS_CONFIG = {
            serviceId: 'TU_SERVICE_ID',      // Reemplaza con tu Service ID
            templateId: 'TU_TEMPLATE_ID',    // Reemplaza con tu Template ID
            publicKey: 'TU_PUBLIC_KEY'       // Reemplaza con tu Public Key
        };

        document.addEventListener('DOMContentLoaded', function () {
            // Inicializar EmailJS
            emailjs.init(EMAILJS_CONFIG.publicKey);

            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');

            // Elements for error messages
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            // Function to reset all error states
            function resetErrors() {
                [nameError, emailError, messageError].forEach(el => {
                    el.textContent = '';
                    el.classList.add('hidden');
                });

                // Remove error classes from inputs
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('border-red-400');
                    input.classList.add('border-light-gray/30');
                });
            }

            // Function to show error for a specific field
            function showError(field, message) {
                let errorElement;
                let inputElement;

                switch (field) {
                    case 'name':
                        errorElement = nameError;
                        inputElement = document.getElementById('name');
                        break;
                    case 'email':
                        errorElement = emailError;
                        inputElement = document.getElementById('email');
                        break;
                    case 'message':
                        errorElement = messageError;
                        inputElement = document.getElementById('message');
                        break;
                }

                if (errorElement && inputElement) {
                    errorElement.textContent = message;
                    errorElement.classList.remove('hidden');
                    inputElement.classList.remove('border-light-gray/30');
                    inputElement.classList.add('border-red-400');
                    inputElement.focus();
                }
            }

            // Client-side validation before submission
            function validateForm() {
                resetErrors();
                let isValid = true;

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                const honeypot = document.getElementById('website').value;

                // Honeypot check for bots
                if (honeypot) {
                    console.log('Bot detected via honeypot');
                    return false;
                }

                // Name validation
                if (!name) {
                    showError('name', 'Por favor, ingresa tu nombre completo');
                    isValid = false;
                } else if (name.length < 2) {
                    showError('name', 'El nombre debe tener al menos 2 caracteres');
                    isValid = false;
                } else if (name.length > 100) {
                    showError('name', 'El nombre no puede exceder los 100 caracteres');
                    isValid = false;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email) {
                    showError('email', 'Por favor, ingresa tu correo electrónico');
                    isValid = false;
                } else if (!emailRegex.test(email)) {
                    showError('email', 'Por favor, ingresa un correo electrónico válido');
                    isValid = false;
                }

                // Message validation
                if (!message) {
                    showError('message', 'Por favor, escribe tu mensaje');
                    isValid = false;
                } else if (message.length < 10) {
                    showError('message', 'El mensaje debe tener al menos 10 caracteres');
                    isValid = false;
                } else if (message.length > 2000) {
                    showError('message', 'El mensaje no puede exceder los 2000 caracteres');
                    isValid = false;
                }

                return isValid;
            }

            // Form submission handler
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Validate form before submission
                if (!validateForm()) {
                    return;
                }

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                const originalState = submitBtn.disabled;

                // Show loading state
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando...</span>
                `;
                submitBtn.disabled = true;

                // Hide previous messages
                formMessage.classList.add('hidden');
                resetErrors();

                try {
                    // Preparar los parámetros del template
                    const templateParams = {
                        from_name: document.getElementById('name').value.trim(),
                        from_email: document.getElementById('email').value.trim(),
                        message: document.getElementById('message').value.trim(),
                        to_email: 'alvarezfranly@gmail.com'
                    };

                    // Enviar email usando EmailJS
                    const response = await emailjs.send(
                        EMAILJS_CONFIG.serviceId,
                        EMAILJS_CONFIG.templateId,
                        templateParams
                    );

                    if (response.status === 200) {
                        // Success message
                        formMessage.className = "mt-4 p-4 rounded-lg text-center bg-green-500/20 border border-green-500/30 text-green-400";
                        formMessage.innerHTML = `
                            <div class="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span class="font-medium">¡Mensaje enviado con éxito!</span>
                            </div>
                            <p class="text-sm mt-1">Te responderé en breve a tu correo electrónico.</p>
                        `;
                        formMessage.classList.remove('hidden');

                        // Reset form
                        contactForm.reset();

                        // Scroll to message
                        setTimeout(() => {
                            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 100);

                        // Set focus to success message for screen readers
                        formMessage.setAttribute('tabindex', '-1');
                        formMessage.focus();

                    } else {
                        throw new Error('Error al enviar el mensaje');
                    }

                } catch (error) {
                    console.error('Form submission error:', error);

                    // Error message
                    formMessage.className = "mt-4 p-4 rounded-lg text-center bg-red-500/20 border border-red-500/30 text-red-400";
                    formMessage.innerHTML = `
                        <div class="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span class="font-medium">Error al enviar el mensaje</span>
                        </div>
                        <p class="text-sm mt-1">Por favor, verifica tu configuración de EmailJS o intenta de nuevo más tarde.</p>
                    `;
                    formMessage.classList.remove('hidden');

                    // Set focus to error message for screen readers
                    formMessage.setAttribute('tabindex', '-1');
                    formMessage.focus();

                } finally {
                    // Restore button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = originalState;
                }
            });

            // Real-time validation on blur
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', function () {
                    if (this.value.trim()) {
                        // Only validate if field has value
                        validateField(this);
                    }
                });

                // Also validate on input to provide immediate feedback for some fields
                if (input.id === 'email') {
                    input.addEventListener('input', function () {
                        if (this.value.trim()) {
                            validateField(this);
                        }
                    });
                }
            });

            function validateField(field) {
                const value = field.value.trim();
                let error = '';

                switch (field.id) {
                    case 'name':
                        if (value.length < 2 && value.length > 0) {
                            error = 'El nombre debe tener al menos 2 caracteres';
                        } else if (value.length > 100) {
                            error = 'El nombre no puede exceder los 100 caracteres';
                        }
                        break;
                    case 'email':
                        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            error = 'Por favor, ingresa un correo electrónico válido';
                        }
                        break;
                    case 'message':
                        if (value.length < 10 && value.length > 0) {
                            error = 'El mensaje debe tener al menos 10 caracteres';
                        } else if (value.length > 2000) {
                            error = 'El mensaje no puede exceder los 2000 caracteres';
                        }
                        break;
                }

                if (error) {
                    showError(field.id, error);
                } else {
                    // Clear error if field is valid
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.classList.add('hidden');
                        field.classList.remove('border-red-400');
                        field.classList.add('border-light-gray/30');
                    }
                }
            }
        });




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////SCROLL DEL NAVBAR PARA EL HASH ID////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        // Scroll positioning - Only "Quién Soy" goes to exact start, others keep consistent margin
        document.addEventListener('DOMContentLoaded', function () {
            // Consistent margin for most sections (except "Quién Soy")
            const CONSISTENT_MARGIN = 30;

            // 1. Handle all hash navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href === '#' || href === '#!') return;

                    e.preventDefault();
                    const targetSection = document.querySelector(href);

                    if (targetSection) {
                        const navbar = document.querySelector('.notch-navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 70;

                        let scrollPosition;

                        // SPECIAL CASE: "Quién Soy" goes to exact start
                        if (href === '#quien-soy') {
                            // Scroll to very top of the section
                            scrollPosition = targetSection.offsetTop - navbarHeight;
                        }
                        // NORMAL CASES: Other sections keep consistent margin
                        else {
                            // Find the title in the section
                            const sectionTitle = targetSection.querySelector('h1, h2, .section-title');

                            if (sectionTitle) {
                                // Scroll to the title with consistent margin
                                const titleRect = sectionTitle.getBoundingClientRect();
                                scrollPosition = window.pageYOffset + titleRect.top - navbarHeight - CONSISTENT_MARGIN;
                            } else {
                                // Fallback
                                scrollPosition = targetSection.offsetTop - navbarHeight - CONSISTENT_MARGIN;
                            }
                        }

                        window.scrollTo({
                            top: Math.max(0, scrollPosition),
                            behavior: 'smooth'
                        });

                        // Update URL
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                });
            });

            // 2. Fix initial page load with hash
            if (window.location.hash) {
                setTimeout(() => {
                    const hash = window.location.hash;
                    const targetSection = document.querySelector(hash);

                    if (targetSection) {
                        const navbar = document.querySelector('.notch-navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 70;

                        let scrollPosition;

                        // SPECIAL CASE: "Quién Soy"
                        if (hash === '#quien-soy') {
                            scrollPosition = targetSection.offsetTop - navbarHeight;
                        }
                        // NORMAL CASES: Other sections
                        else {
                            const sectionTitle = targetSection.querySelector('h1, h2, .section-title');

                            if (sectionTitle) {
                                scrollPosition = sectionTitle.offsetTop - navbarHeight - CONSISTENT_MARGIN;
                            } else {
                                scrollPosition = targetSection.offsetTop - navbarHeight - CONSISTENT_MARGIN;
                            }
                        }

                        window.scrollTo({
                            top: Math.max(0, scrollPosition),
                            behavior: 'instant'
                        });
                    }
                }, 100);
            }

            // 3. CSS scroll-margin for modern browsers (different for "Quién Soy")
            const style = document.createElement('style');
            style.textContent = `
            /* "Quién Soy" - exact start */
            #quien-soy {
                scroll-margin-top: 70px; /* Just navbar height */
            }
            
            /* Other sections - consistent margin */
            #habilidades, #proyectos, #contactame {
                scroll-margin-top: ${70 + CONSISTENT_MARGIN}px;
            }
            
            /* Fallback for older browsers */
            @supports not (scroll-margin-top: 70px) {
                #quien-soy::before {
                    content: '';
                    display: block;
                    height: 70px;
                    margin-top: -70px;
                    visibility: hidden;
                    pointer-events: none;
                }
                
                #habilidades::before,
                #proyectos::before,
                #contactame::before {
                    content: '';
                    display: block;
                    height: ${70 + CONSISTENT_MARGIN}px;
                    margin-top: -${70 + CONSISTENT_MARGIN}px;
                    visibility: hidden;
                    pointer-events: none;
                }
            }
        `;
            document.head.appendChild(style);
        });
    
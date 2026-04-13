
        // ===== LOADER =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 800);
        });

        // ===== NAVBAR SCROLL =====
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        // ===== HAMBURGER MENU =====
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
            observer.observe(el);
        });

        // ===== COUNTER ANIMATION =====
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;

                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                counter.textContent = Math.ceil(current) + '+';
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + '+';
                            }
                        };
                        updateCounter();
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });

        // ===== FORM SUBMIT =====
        function handleSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#2ECC71';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                e.target.reset();
            }, 2500);
        }

        // ===== TYPING EFFECT FOR GREETING =====
        const greetingDesc = document.querySelector('.greeting-desc');
        if (greetingDesc) {
            const originalText = greetingDesc.textContent;
            greetingDesc.textContent = '';
            let charIndex = 0;

            function typeText() {
                if (charIndex < originalText.length) {
                    greetingDesc.textContent += originalText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeText, 15);
                }
            }

            setTimeout(typeText, 1200);
        }

        // ===== PARALLAX ON PROFILE CARD =====
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            profileCard.addEventListener('mousemove', (e) => {
                const rect = profileCard.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                profileCard.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
            });

            profileCard.addEventListener('mouseleave', () => {
                profileCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
                profileCard.style.transition = 'transform 0.5s ease';
            });

            profileCard.addEventListener('mouseenter', () => {
                profileCard.style.transition = 'none';
            });
        }

        // ===== ACTIVE NAV LINK HIGHLIGHT =====
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--red-primary)';
                }
            });
        });

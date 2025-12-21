// ==========================================
// Mobile Detection & Performance Settings
// ==========================================
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
const perfSettings = {
    welcomeStars: isMobile ? 25 : 50,
    mainStars: isMobile ? 30 : 60,
    meteorCount: isMobile ? 2 : 4,
    roseInterval: isMobile ? 1200 : 600,
    heartInterval: isMobile ? 1000 : 600,
    sparkleInterval: isMobile ? 600 : 400,
    heartBurstCount: isMobile ? 5 : 8,
    fireworkParticles: isMobile ? 8 : 12,
    fireworkInterval: isMobile ? 3000 : 2000
};

// ==========================================
// Initialize when page loads
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Start welcome screen animations immediately
    createWelcomeStars();
    createWelcomeRoses();
    createHeartAnimation();
    initializeStartScreen();
});

// ==========================================
// Welcome Stars (on start screen)
// ==========================================
function createWelcomeStars() {
    const container = document.getElementById('welcomeStars');
    if (!container) return;

    const starCount = perfSettings.welcomeStars;
    const starChars = ['★', '✦', '✧', '✩', '⭐', '✨'];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Create initial stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'welcome-star';
        star.textContent = starChars[Math.floor(Math.random() * starChars.length)];
        star.style.position = 'absolute';
        star.style.left = random(0, 100) + '%';
        star.style.top = random(0, 100) + '%';
        star.style.fontSize = random(10, 20) + 'px';
        star.style.color = 'white';
        star.style.opacity = random(0.4, 1);
        star.style.textShadow = '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,215,0,0.5)';
        star.style.animation = `twinkle ${random(2, 4)}s ease infinite`;
        star.style.pointerEvents = 'none';
        container.appendChild(star);

        // Animate falling
        star.speedY = random(0.3, 0.8);
        star.speedX = random(-0.2, 0.2);
    }

    // Animate stars falling
    const stars = container.querySelectorAll('.welcome-star');
    function animateWelcomeStars() {
        stars.forEach(star => {
            let top = parseFloat(star.style.top);
            let left = parseFloat(star.style.left);

            top += star.speedY;
            left += star.speedX;

            if (top > 100) {
                top = -5;
                left = random(0, 100);
            }
            if (left < 0) left = 100;
            if (left > 100) left = 0;

            star.style.top = top + '%';
            star.style.left = left + '%';
        });
        requestAnimationFrame(animateWelcomeStars);
    }
    animateWelcomeStars();
}

// ==========================================
// Welcome Roses (on start screen)
// ==========================================
function createWelcomeRoses() {
    const container = document.getElementById('welcomeRoses');
    if (!container) return;

    const roses = ['🌹', '🌸', '🌺', '💐', '🌷', '🏵️'];

    function spawnRose() {
        const rose = document.createElement('div');
        rose.textContent = roses[Math.floor(Math.random() * roses.length)];
        rose.style.position = 'absolute';
        rose.style.left = Math.random() * 100 + '%';
        rose.style.top = '-50px';
        rose.style.fontSize = (Math.random() * 15 + 20) + 'px';
        rose.style.opacity = '0.9';
        rose.style.filter = 'drop-shadow(0 0 5px rgba(255, 105, 180, 0.8))';
        rose.style.pointerEvents = 'none';
        rose.style.animation = `fallRose ${Math.random() * 4 + 8}s linear forwards`;

        container.appendChild(rose);

        setTimeout(() => {
            rose.remove();
        }, 12000);
    }

    // Spawn roses continuously
    setInterval(spawnRose, 600);

    // Initial roses
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnRose, i * 200);
    }
}

// ==========================================
// Heart Animation (from heart folder - exact)
// ==========================================
function createHeartAnimation() {
    const container = document.getElementById('heartAnimationContainer');
    if (!container) return;

    const emojis = ['❤️', '💖', '💕', '💘', '💝', '💗', '💓', '💞', '💟', '❣️', '❤️', '💖', '💕', '💘', '💝', '💗', '💓', '💞', '💟', '❣️'];
    const numEmojis = emojis.length;
    const emojiElems = [];

    // Exact heart curve from heart folder
    function heartCurve(t) {
        const scale = 8;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        return { x: x * scale, y: -y * scale };
    }

    // Create emoji elements
    for (let i = 0; i < numEmojis; i++) {
        const el = document.createElement('div');
        el.className = 'heart-emoji';
        el.textContent = emojis[i];
        container.appendChild(el);
        emojiElems.push({
            el,
            baseAngle: (i / numEmojis) * 2 * Math.PI
        });
    }

    // Animate - exact animation from heart folder
    function animate() {
        const time = performance.now() / 1000;
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        emojiElems.forEach(({ el, baseAngle }, i) => {
            const t = (baseAngle + time) % (2 * Math.PI);
            const pos = heartCurve(t);

            const x = centerX + pos.x;
            const y = centerY + pos.y;

            const rotation = (time * 180 + i * 36) % 360;

            el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rotation}deg)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================
// Start Screen Button Handler
// ==========================================
function initializeStartScreen() {
    const startBtn = document.getElementById('startBtn');
    const startScreen = document.getElementById('startScreen');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const audio1 = document.getElementById('scrollAudio1');
    const audio2 = document.getElementById('scrollAudio2');

    if (!startBtn) return;

    startBtn.addEventListener('click', function () {
        // iOS Audio Unlock: Load both audio files first
        if (audio1) audio1.load();
        if (audio2) audio2.load();

        // Play 1.mp3 immediately
        if (audio1) {
            audio1.currentTime = 0;
            audio1.volume = 1;
            audio1.muted = false;

            const playAudio1 = audio1.play();
            if (playAudio1 !== undefined) {
                playAudio1
                    .then(() => {
                        console.log('Audio 1 playing successfully');
                    })
                    .catch(err => {
                        console.log('Audio 1 play prevented:', err);
                        // Fallback: try again
                        setTimeout(() => {
                            audio1.play().catch(e => console.log('Audio 1 retry failed:', e));
                        }, 100);
                    });
            }
        }

        // Prime 2.mp3 for iOS - CRITICAL for scroll-triggered playback
        // iOS Safari requires audio to be "unlocked" during a user gesture
        if (audio2) {
            // Method 1: Play muted briefly then pause
            audio2.muted = true;
            audio2.volume = 0;

            const primePromise = audio2.play();
            if (primePromise !== undefined) {
                primePromise
                    .then(() => {
                        // Successfully started - now pause and reset
                        setTimeout(() => {
                            audio2.pause();
                            audio2.currentTime = 0;
                            audio2.muted = false;
                            audio2.volume = 1;
                            console.log('Audio 2 primed successfully for iOS');
                        }, 50);
                    })
                    .catch(err => {
                        console.log('Audio 2 priming method 1 failed:', err);
                        // Method 2: Just load and hope for the best
                        audio2.muted = false;
                        audio2.volume = 1;
                    });
            }
        }

        // Play background music (optional)
        if (bgMusic) {
            bgMusic.play().catch(err => {
                console.log('Background music prevented:', err);
            });
        }

        // Fade out start screen
        startScreen.style.transition = 'opacity 1s ease';
        startScreen.style.opacity = '0';

        setTimeout(() => {
            startScreen.style.display = 'none';
            mainContent.classList.remove('hidden');

            // Initialize main content animations
            initializeMainContent();
        }, 1000);
    });
}

// ==========================================
// Main Content Initialization
// ==========================================
function initializeMainContent() {
    createFallingStars();
    createFallingRoses();
    createFloatingHearts();
    createHeroSparkles();
    createFireworks();
    animateCounters();
    initScrollAnimations();
    initScrollAudio();
    addInteractiveEffects();
    addTouchHeartBurst();
}

// ==========================================
// Scroll-triggered audio playback
// Plays `scrollAudio1` on button click.
// Continues playing 1.mp3 as user scrolls.
// When scrolling to "Forever Yours" card, switch to 2.mp3.
// Keep playing 2.mp3 in loop (never go back to 1.mp3).
// Uses scroll events instead of IntersectionObserver for iOS compatibility
// ==========================================
let audio2Started = false; // Track globally if 2.mp3 has started

function initScrollAudio() {
    const foreverYoursCard = document.getElementById('foreverYoursCard');
    const audio1 = document.getElementById('scrollAudio1');
    const audio2 = document.getElementById('scrollAudio2');

    if (!foreverYoursCard || !audio1 || !audio2) {
        console.log('Audio elements not found');
        return;
    }

    // Ensure 2.mp3 loops
    audio2.loop = true;

    // Function to switch from audio1 to audio2
    function switchToAudio2() {
        if (audio2Started) return;
        audio2Started = true;

        console.log('Switching to 2.mp3 now!');

        // Stop 1.mp3 immediately (no fade for reliability)
        audio1.pause();
        audio1.currentTime = 0;

        // Start 2.mp3
        audio2.currentTime = 0;
        audio2.volume = 1;
        audio2.muted = false;

        // Try to play
        const playPromise = audio2.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('2.mp3 is now playing!');
            }).catch(error => {
                console.error('2.mp3 play failed, setting up touch handler:', error);
                // iOS requires user interaction - set up touch handler
                setupTouchToPlay(audio2);
            });
        }
    }

    // Check if Forever Yours card is in viewport
    function isCardInView() {
        const rect = foreverYoursCard.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Trigger when top of card is in middle of screen or above
        return rect.top <= windowHeight * 0.7;
    }

    // Scroll handler - check on every scroll
    function onScroll() {
        if (!audio2Started && isCardInView()) {
            switchToAudio2();
            // Remove scroll listener once triggered
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('scroll', onScroll);
        }
    }

    // Add scroll listeners (both window and document for iOS)
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    // Also check on touch move for iOS
    document.addEventListener('touchmove', onScroll, { passive: true });

    // Initial check in case already scrolled
    setTimeout(() => {
        if (!audio2Started && isCardInView()) {
            switchToAudio2();
        }
    }, 500);
}

// iOS touch-to-play fallback
function setupTouchToPlay(audioElement) {
    const playOnTouch = () => {
        audioElement.play().then(() => {
            console.log('Audio playing after touch!');
            document.removeEventListener('touchstart', playOnTouch);
            document.removeEventListener('touchend', playOnTouch);
            document.removeEventListener('click', playOnTouch);
        }).catch(e => {
            console.log('Still need interaction:', e.message);
        });
    };

    document.addEventListener('touchstart', playOnTouch, { passive: true });
    document.addEventListener('touchend', playOnTouch, { passive: true });
    document.addEventListener('click', playOnTouch, { passive: true });

    // Show visual hint to user (optional)
    console.log('Tap screen to start audio');
}



// ==========================================
// Touch/Click Heart Burst Effect
// ==========================================
function addTouchHeartBurst() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💓', '💞', '💘', '💟', '❣️'];

    function createHeartBurst(x, y) {
        // Optimized: Reduced overhead by using CSS animations instead of JS loop
        const count = isMobile ? 5 : 8;

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('burst-heart');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            // Set start position
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

            // Calculate random spread
            const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
            const distance = 60 + Math.random() * 60;

            // Gravity effect approximation
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance + 40;

            heart.style.setProperty('--tx', `${tx}px`);
            heart.style.setProperty('--ty', `${ty}px`);
            heart.style.setProperty('--rot', `${Math.random() * 360}deg`);

            document.body.appendChild(heart);

            // Auto cleanup
            setTimeout(() => {
                heart.remove();
            }, 2000); // Matches CSS animation duration
        }
    }

    // Use pointerdown for instant reaction on both mobile/desktop and to avoid duplicates
    document.addEventListener('pointerdown', function (e) {
        // Prevent firing on simple scrolls if needed, but for 'touch somewhere' this is usually what is wanted.
        createHeartBurst(e.clientX, e.clientY);
    }, { passive: true });
}

// ==========================================
// Falling Stars (main content - from stars folder)
// ==========================================
function createFallingStars() {
    const container = document.getElementById('starsLayer');
    if (!container) return;

    const starCount = perfSettings.mainStars;
    const stars = [];
    const starChars = ['★', '✦', '✧', '✩', '✪', '✫', '✬', '✮', '✯', '⭐'];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = starChars[Math.floor(Math.random() * starChars.length)];
        resetStar(star, true);
        container.appendChild(star);
        stars.push(star);
    }

    function resetStar(star, initial = false) {
        star.style.fontSize = `${random(12, 22)}px`;
        star.style.left = `${random(0, window.innerWidth)}px`;
        star.style.top = initial ? `${random(0, window.innerHeight)}px` : `${random(-150, -30)}px`;
        star.speedX = random(-0.3, 0.3);
        star.speedY = random(0.5, 1.2);
        star.style.opacity = random(0.5, 1);
    }

    for (let i = 0; i < starCount; i++) {
        createStar();
    }

    // Create meteors
    const meteorCount = perfSettings.meteorCount;
    const meteors = [];

    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        resetMeteor(meteor);
        container.appendChild(meteor);
        meteors.push(meteor);
    }

    function resetMeteor(meteor) {
        meteor.style.opacity = 0;
        meteor.style.left = `${random(-150, -50)}px`;
        meteor.style.top = `${random(0, window.innerHeight / 2)}px`;
        meteor.speedX = random(10, 18);
        meteor.speedY = random(8, 14);
        meteor.style.transform = `rotate(${random(25, 45)}deg)`;
        meteor.active = false;
    }

    for (let i = 0; i < meteorCount; i++) {
        createMeteor();
    }

    let meteorTimer = 0;
    const meteorInterval = 4000;

    function animate() {
        for (const star of stars) {
            let top = parseFloat(star.style.top);
            let left = parseFloat(star.style.left);

            top += star.speedY;
            left += star.speedX;

            if (top > window.innerHeight || left < -30 || left > window.innerWidth + 30) {
                resetStar(star);
            } else {
                star.style.top = top + 'px';
                star.style.left = left + 'px';
            }
        }

        meteorTimer += 16.6;

        if (meteorTimer > meteorInterval) {
            meteorTimer = 0;
            for (const meteor of meteors) {
                if (!meteor.active) {
                    meteor.active = true;
                    meteor.style.opacity = 1;
                    meteor.style.left = `${random(-150, -50)}px`;
                    meteor.style.top = `${random(0, window.innerHeight / 3)}px`;
                    break;
                }
            }
        }

        for (const meteor of meteors) {
            if (meteor.active) {
                let top = parseFloat(meteor.style.top);
                let left = parseFloat(meteor.style.left);

                top += meteor.speedY;
                left += meteor.speedX;

                meteor.style.top = top + 'px';
                meteor.style.left = left + 'px';

                if (top > window.innerHeight || left > window.innerWidth + 200) {
                    meteor.active = false;
                    meteor.style.opacity = 0;
                    resetMeteor(meteor);
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================
// Falling Roses (main content)
// ==========================================
function createFallingRoses() {
    const container = document.getElementById('fallingRoses');
    if (!container) return;

    const roses = ['🌹', '🌺', '🌸', '🏵️', '💐', '🌷'];

    setInterval(() => {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = roses[Math.floor(Math.random() * roses.length)];
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDuration = (Math.random() * 4 + 10) + 's';
        rose.style.animationDelay = (Math.random() * 2) + 's';

        container.appendChild(rose);

        setTimeout(() => {
            rose.remove();
        }, 16000);
    }, perfSettings.roseInterval);
}

// ==========================================
// Floating Hearts
// ==========================================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💓', '💞', '💘'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 15 + 20;
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 4 + 8;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, (duration + 2) * 1000);
    }, perfSettings.heartInterval);
}

// ==========================================
// Hero Sparkles
// ==========================================
function createHeroSparkles() {
    const container = document.querySelector('.hero-sparkles');
    if (!container) return;

    const sparkles = ['✨', '⭐', '💫', '🌟'];

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = (Math.random() * 20 + 20) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }, perfSettings.sparkleInterval);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% { opacity: 1; transform: translateY(0) scale(0); }
        50% { opacity: 1; transform: translateY(-50px) scale(1); }
        100% { opacity: 0; transform: translateY(-100px) scale(0); }
    }
    @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
`;
document.head.appendChild(style);

// ==========================================
// Fireworks
// ==========================================
function createFireworks() {
    const container = document.querySelector('.fireworks-container');
    if (!container) return;

    const colors = ['#ff006e', '#ffd700', '#00f0ff', '#ff6b35', '#8b5cf6', '#b4ff00'];

    setInterval(() => {
        const x = Math.random() * 100;
        const y = Math.random() * 60;

        for (let i = 0; i < perfSettings.fireworkParticles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';

            const angle = (Math.PI * 2 * i) / perfSettings.fireworkParticles;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            container.appendChild(particle);

            let posX = 0;
            let posY = 0;
            let opacity = 1;
            const interval = setInterval(() => {
                posX += vx * 0.016;
                posY += vy * 0.016;
                opacity -= 0.015;

                particle.style.transform = `translate(${posX}px, ${posY}px)`;
                particle.style.opacity = opacity;

                if (opacity <= 0) {
                    clearInterval(interval);
                    particle.remove();
                }
            }, 16);
        }
    }, perfSettings.fireworkInterval);
}

// ==========================================
// Animate Counters
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');

    counters.forEach(counter => {
        const target = counter.getAttribute('data-count');
        if (target === '∞') return;

        const duration = 2000;
        const start = 0;
        const end = parseInt(target);
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * (end - start) + start);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = end;
            }
        }

        setTimeout(() => {
            requestAnimationFrame(update);
        }, 500);
    });
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.photo-card, .message-card, .advice-card, .wish-card, .quote-card, .counter-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });
}

// ==========================================
// Interactive Effects
// ==========================================
function addInteractiveEffects() {
    const allCards = document.querySelectorAll('.message-card, .advice-card, .photo-card, .quote-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            createRainbowSparkles(this);
        });
    });

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');

        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function createRainbowSparkles(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const colors = ['#ff006e', '#ffd700', '#00f0ff', '#ff6b35', '#8b5cf6'];
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = (Math.random() * 15 + 20) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
        sparkle.style.filter = 'drop-shadow(0 0 10px currentColor)';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c💕 Happy Birthday Chutii! 💕', 'color: #ff006e; font-size: 32px; font-weight: bold;');
console.log('%c🌹 From Sudu with endless love 🌹', 'color: #ffd700; font-size: 20px;');

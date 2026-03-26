// =============================================
// 1. Navbar Scroll Effect
// =============================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =============================================
// 2. Theme Switcher
// =============================================
const themeBtns = document.querySelectorAll('.theme-btn');
const savedTheme = localStorage.getItem('theme') || 'default';

if (savedTheme !== 'default') {
    document.documentElement.setAttribute('data-theme', savedTheme);
}
themeBtns.forEach(btn => {
    if (btn.getAttribute('data-theme') === savedTheme) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('theme', theme);
    });
});

// =============================================
// 3. Scroll Reveal Animations
// =============================================
const revealElements = document.querySelectorAll('.reveal, .reveal-right');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// 4. Typing Effect
// =============================================
const typingEl = document.getElementById('typingText');
const roles = ['Full Stack Developer', 'Frontend Enthusiast', 'Backend Architect', 'Problem Solver', 'Tech Explorer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex--);
    } else {
        typingEl.textContent = current.substring(0, charIndex++);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length + 1) {
        speed = 2000; // Pause at full text
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// =============================================
// 5. Scroll Progress Bar
// =============================================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// =============================================
// 6. Starry Background Animation
// =============================================
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');
let stars = [];

function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeStarCanvas();
window.addEventListener('resize', resizeStarCanvas);

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = (Math.random() - 0.5) * 0.05;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
        this.baseOpacity = this.opacity;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity >= this.baseOpacity + 0.3) {
            this.opacity = this.baseOpacity + 0.3;
            this.twinkleDir = -1;
        } else if (this.opacity <= this.baseOpacity - 0.2) {
            this.opacity = this.baseOpacity - 0.2;
            this.twinkleDir = 1;
        }

        // Wrap around edges
        if (this.x < 0) this.x = starCanvas.width;
        if (this.x > starCanvas.width) this.x = 0;
        if (this.y < 0) this.y = starCanvas.height;
        if (this.y > starCanvas.height) this.y = 0;
    }
    draw() {
        starCtx.save();
        starCtx.globalAlpha = this.opacity;
        starCtx.fillStyle = '#ffffff';
        starCtx.shadowBlur = 2;
        starCtx.shadowColor = '#ffffff';

        // Draw star shape
        starCtx.beginPath();
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = this.size * 0.4;
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;

        starCtx.moveTo(this.x, this.y - outerRadius);
        for (let i = 0; i < spikes; i++) {
            let x = this.x + Math.cos(rot) * outerRadius;
            let y = this.y + Math.sin(rot) * outerRadius;
            starCtx.lineTo(x, y);
            rot += step;
            x = this.x + Math.cos(rot) * innerRadius;
            y = this.y + Math.sin(rot) * innerRadius;
            starCtx.lineTo(x, y);
            rot += step;
        }
        starCtx.closePath();
        starCtx.fill();
        starCtx.restore();
    }
}

// Create stars
for (let i = 0; i < 150; i++) {
    stars.push(new Star());
}

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}
animateStars();

// =============================================
// 7. Back to Top Button
// =============================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// 8. Active Nav Link on Scroll
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active-link');
        }
    });
});

// =============================================
// 9. Tilt Effect on Skill Boxes
// =============================================
document.querySelectorAll('.skill-box').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// =============================================
// 10. Magnetic Button Effect
// =============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// =============================================
// 11. Smooth Section Scroll (Enhanced)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

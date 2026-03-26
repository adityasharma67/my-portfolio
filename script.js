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
// 6. Custom Cursor
// =============================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let isCursorVisible = false;

cursorDot.style.opacity = '0';
cursorRing.style.opacity = '0';

if (window.matchMedia('(any-pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        if (!isCursorVisible) {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
            isCursorVisible = true;
            ringX = e.clientX;
            ringY = e.clientY;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    });

    function animateCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
        requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Grow cursor on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .cert-card, .skill-box, .theme-btn');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorRing.classList.add('hover-active'));
        target.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-active'));
    });
} else {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
}

// =============================================
// 7. Floating Particles
// =============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
        // Mouse repel effect
        let dx = 0, dy = 0, distance = 1000;
        if (typeof mouseX !== 'undefined') {
            dx = mouseX - this.x;
            dy = mouseY - this.y;
            distance = Math.sqrt(dx * dx + dy * dy);
        }
        
        if (distance < 120) {
            const force = (120 - distance) / 120;
            this.x -= (dx / distance) * force * 2;
            this.y -= (dy / distance) * force * 2;
        } else {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity >= 1) {
            this.opacity = 1;
            this.twinkleDir = -1;
        } else if (this.opacity <= 0.1) {
            this.opacity = 0.1;
            this.twinkleDir = 1;
        }

        // Rotation
        this.rotation += this.rotationSpeed;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        const spikes = 5;
        const outerRadius = this.size * 2;
        const innerRadius = this.size;
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.restore();
    }
}

// Create more particles for a starry sky
for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

// =============================================
// 8. Back to Top Button
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
// 9. Active Nav Link on Scroll
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
// 10. Tilt Effect on Skill Boxes
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
// 11. Magnetic Button Effect
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
// 12. Smooth Section Scroll (Enhanced)
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

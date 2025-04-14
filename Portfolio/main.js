// Background Animation
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = Math.floor(window.innerWidth / 10);

// Particle constructor
function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(255, 77, 77, ${Math.random() * 0.5 + 0.1})`;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvas.width) {
        this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y > canvas.height) {
        this.speedY = -this.speedY;
    }
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

// Create particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 77, 77, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Header animation
gsap.from(".header-content h1", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".header-content p", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3
});

// Section animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Service cards animation
gsap.from(".service-card", {
    scrollTrigger: {
        trigger: ".services-section",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// Project cards animation
gsap.from(".project-card", {
    scrollTrigger: {
        trigger: ".projects-section",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// Skill bars animation
document.querySelectorAll('.skill-level').forEach(bar => {
    const level = bar.getAttribute('data-level');
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar.parentElement.parentElement,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        width: level,
        duration: 1.5,
        ease: "power3.out"
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navigation ul');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Page loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            loader.style.display = 'none';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
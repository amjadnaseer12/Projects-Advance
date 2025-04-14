// Three.js Background Animation
const bgCanvas = document.getElementById('bgCanvas');
const renderer = new THREE.WebGLRenderer({
    canvas: bgCanvas,
    antialias: true,
    alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1500;

const posArray = new Float32Array(particleCount * 3);
const colorArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
    colorArray[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // More dynamic rotation
    particlesMesh.rotation.x += 0.0005 * Math.sin(Date.now() * 0.001);
    particlesMesh.rotation.y += 0.0007 * Math.cos(Date.now() * 0.0007);
    
    // Pulsing effect
    particlesMesh.material.size = 0.02 + 0.005 * Math.sin(Date.now() * 0.002);
    
    renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initial animations
gsap.from('.title', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.tagline', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.navigation li', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.6
});

// Section animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Service cards animation
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// Skill bars animation
gsap.utils.toArray('.skill-level').forEach(bar => {
    gsap.from(bar, {
        scrollTrigger: {
            trigger: bar.parentElement,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scaleX: 0,
        duration: 1.5,
        ease: 'power3.out',
        transformOrigin: 'left center'
    });
});

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loader animation
window.addEventListener('load', function() {
    gsap.to('.loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            document.querySelector('.loader').style.display = 'none';
        }
    });
});

// Form submission handler
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Here you would normally send the data to a server
    fetch('your-endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.ok) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.textContent = 'Message sent successfully!';
            form.parentNode.insertBefore(successMsg, form);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
            
            // Reset form
            form.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navigation ul');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Initialize skill bars on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-level').forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            bar.style.width = level;
        }
    });
});
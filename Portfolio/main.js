// Add this at the top of your JavaScript file
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

// Add this after your particle background code but before the animate function

// 3D Model for Header
const headerModelContainer = document.getElementById('header-model');
const headerRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
headerRenderer.setPixelRatio(window.devicePixelRatio);
headerRenderer.setSize(headerModelContainer.offsetWidth, headerModelContainer.offsetHeight);
headerModelContainer.appendChild(headerRenderer.domElement);

const headerScene = new THREE.Scene();
const headerCamera = new THREE.PerspectiveCamera(75, headerModelContainer.offsetWidth / headerModelContainer.offsetHeight, 0.1, 1000);
headerCamera.position.z = 5;

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
headerScene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
headerScene.add(directionalLight);

// Create a placeholder geometry (replace this with your actual 3D model)
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({
    color: 0xff4d4d,
    metalness: 0.7,
    roughness: 0.2
});
const cube = new THREE.Mesh(geometry, material);
headerScene.add(cube);

// Animation for the header model
function animateHeaderModel() {
    requestAnimationFrame(animateHeaderModel);
    
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    
    headerRenderer.render(headerScene, headerCamera);
}
animateHeaderModel();

// Resize handler for header model
window.addEventListener('resize', () => {
    headerRenderer.setSize(headerModelContainer.offsetWidth, headerModelContainer.offsetHeight);
    headerCamera.aspect = headerModelContainer.offsetWidth / headerModelContainer.offsetHeight;
    headerCamera.updateProjectionMatrix();
});


const loader = new GLTFLoader();
let model;

loader.load(
    // URL of your 3D model
    'path/to/your/model.glb',
    
    // onLoad callback
    function (gltf) {
        model = gltf.scene;
        
        // Scale and position the model
        model.scale.set(0.5, 0.5, 0.5);
        model.position.y = -1;
        
        // Add the model to the scene
        headerScene.add(model);
        
        // Start animation
        animateHeaderModel();
    },
    
    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    
    // onError callback
    function (error) {
        console.error('Error loading model', error);
        
        // Fallback to the cube if model fails to load
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff4d4d,
            metalness: 0.7,
            roughness: 0.2
        });
        model = new THREE.Mesh(geometry, material);
        headerScene.add(model);
        animateHeaderModel();
    }
);

// Update the animateHeaderModel function
function animateHeaderModel() {
    requestAnimationFrame(animateHeaderModel);
    
    if (model) {
        model.rotation.y += 0.01;
    }
    
    headerRenderer.render(headerScene, headerCamera);
}
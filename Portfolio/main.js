// Main initialization function that runs when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js background
    initThreeJSBackground();
    
    // Initialize header 3D model
    initHeaderModel();
    
    // Initialize animations
    initAnimations();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize skill bars
    initSkillBars();
});

// Three.js Background Animation
function initThreeJSBackground() {
    const bgCanvas = document.getElementById('bgCanvas');
    if (!bgCanvas) return;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: bgCanvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create scene and camera
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
        
        particlesMesh.rotation.x += 0.0005 * Math.sin(Date.now() * 0.001);
        particlesMesh.rotation.y += 0.0007 * Math.cos(Date.now() * 0.0007);
        particlesMesh.material.size = 0.02 + 0.005 * Math.sin(Date.now() * 0.002);
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Header 3D Model Initialization
function initHeaderModel() {
    const headerModelContainer = document.getElementById('header-model');
    if (!headerModelContainer) return;

    // Create renderer
    const headerRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    headerRenderer.setPixelRatio(window.devicePixelRatio);
    headerRenderer.setSize(headerModelContainer.offsetWidth, headerModelContainer.offsetHeight);
    headerModelContainer.appendChild(headerRenderer.domElement);

    // Create scene and camera
    const headerScene = new THREE.Scene();
    const headerCamera = new THREE.PerspectiveCamera(75, headerModelContainer.offsetWidth / headerModelContainer.offsetHeight, 0.1, 1000);
    headerCamera.position.z = 5;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    headerScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    headerScene.add(directionalLight);

    // Create a placeholder geometry (fallback if model fails to load)
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff4d4d,
        metalness: 0.7,
        roughness: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    headerScene.add(cube);

    // Try to load GLTF model
    try {
        const loader = new GLTFLoader();
        loader.load(
            'models/your-model.glb',
            function(gltf) {
                // Remove placeholder cube
                headerScene.remove(cube);
                
                // Add loaded model
                const model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5);
                model.position.y = -1;
                headerScene.add(model);
                
                // Animate model
                function animate() {
                    requestAnimationFrame(animate);
                    model.rotation.y += 0.01;
                    headerRenderer.render(headerScene, headerCamera);
                }
                animate();
            },
            undefined,
            function(error) {
                console.error('Error loading 3D model:', error);
                // Fallback to cube animation
                function animate() {
                    requestAnimationFrame(animate);
                    cube.rotation.x += 0.005;
                    cube.rotation.y += 0.01;
                    headerRenderer.render(headerScene, headerCamera);
                }
                animate();
            }
        );
    } catch (error) {
        console.error('GLTFLoader not available:', error);
        // Simple cube animation as fallback
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.01;
            headerRenderer.render(headerScene, headerCamera);
        }
        animate();
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        headerRenderer.setSize(headerModelContainer.offsetWidth, headerModelContainer.offsetHeight);
        headerCamera.aspect = headerModelContainer.offsetWidth / headerModelContainer.offsetHeight;
        headerCamera.updateProjectionMatrix();
    });
}

// Initialize GSAP Animations
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animations
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
                toggleActions: 'play none none none',
                once: true
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
                toggleActions: 'play none none none',
                once: true
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
                toggleActions: 'play none none none',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
}

// Initialize Event Listeners
function initEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navigation ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.navigation a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.textContent = 'Message sent successfully!';
            this.parentNode.insertBefore(successMsg, this);
            
            // Remove message after 3 seconds and reset form
            setTimeout(() => {
                successMsg.remove();
                this.reset();
            }, 3000);
        });
    }

    // Loader animation
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: function() {
                    loader.style.display = 'none';
                    ScrollTrigger.refresh();
                }
            });
        });
    }
}

// Initialize Skill Bars
function initSkillBars() {
    document.querySelectorAll('.skill-level').forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            // Set initial width to 0
            bar.style.width = '0';
            
            // Animate to specified width when in view
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar.closest('.skill-item'),
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                width: level,
                duration: 1.5,
                ease: 'power3.out'
            });
        }
    });
}


function setupInteractiveModel(model) {
    // Make model interactive
    model.traverse(child => {
        if (child.isMesh) {
            child.userData.originalColor = child.material.color.clone();
            
            // Make it clickable
            child.cursor = 'pointer';
            
            // Add hover effect
            child.on('pointerover', () => {
                child.material.color.set(0xff4d4d);
            });
            
            child.on('pointerout', () => {
                child.material.color.copy(child.userData.originalColor);
            });
            
            // Add click event
            child.on('click', () => {
                // Example: Rotate the model on click
                gsap.to(model.rotation, {
                    y: model.rotation.y + Math.PI / 2,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            });
        }
    });
    
    // Enable raycasting for interactivity
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    
    function onPointerMove(event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    function checkIntersection() {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
    }
    
    window.addEventListener('pointermove', onPointerMove);
    
    // Run in animation loop
    function animate() {
        requestAnimationFrame(animate);
        checkIntersection();
        renderer.render(scene, camera);
    }
    animate();
}
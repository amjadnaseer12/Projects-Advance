document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when everything is loaded
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    });

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        lerp: 0.1,
        smooth: true,
        direction: 'vertical'
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add RAF to Lenis
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Navigation scroll effect
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Scroll down button
    document.querySelector('.scroll-down').addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo('#content');
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    const itemWidth = carouselItems[0].clientWidth;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });

    // Initialize Three.js scene for hero section
    const heroCanvas = document.getElementById('hero-canvas');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: heroCanvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6c5ce7,
        shininess: 100,
        flatShading: true
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Position camera
    camera.position.z = 3;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Initialize Three.js for gallery items
    const galleryCanvases = document.querySelectorAll('.gallery-canvas');
    
    galleryCanvases.forEach((canvas, index) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Create different geometries based on index
        let geometry;
        switch(index) {
            case 0:
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 1:
                geometry = new THREE.SphereGeometry(0.8, 32, 32);
                break;
            case 2:
                geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
                break;
            default:
                geometry = new THREE.IcosahedronGeometry(0.8, 0);
        }
        
        const material = new THREE.MeshPhongMaterial({
            color: [0x6c5ce7, 0xfd79a8, 0x00b894][index % 3],
            shininess: 100,
            flatShading: true,
            wireframe: index === 2
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Position camera
        camera.position.z = 2;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            mesh.rotation.x += 0.005 * (index + 1);
            mesh.rotation.y += 0.01 * (index + 1);
            
            renderer.render(scene, camera);
        }
        
        animate();
    });

    // Initialize Barba.js for page transitions
    barba.init({
        transitions: [{
            name: 'default-transition',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.5
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.5
                });
            }
        }],
        views: [{
            namespace: 'home',
            beforeEnter() {
                // Reinitialize animations when entering home page
                ScrollTrigger.refresh();
            }
        }]
    });

    // ScrollTrigger animations
    gsap.utils.toArray('[data-scroll]').forEach(element => {
        if (element.dataset.scroll === 'speed') {
            const speed = parseFloat(element.dataset.speed) || 1;
            gsap.to(element, {
                y: 100 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });

    // Text reveal animation
    gsap.utils.toArray('.text-reveal').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
});
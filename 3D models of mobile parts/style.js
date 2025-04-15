        // Global variables
        let phoneScene, phoneCamera, phoneRenderer, phoneModel;
        let screenScene, screenCamera, screenRenderer, screenModel;
        let cameraScene, cameraCamera, cameraRenderer, cameraModel;
        let batteryScene, batteryCamera, batteryRenderer, batteryModel;
        let modelsLoaded = 0;
        const totalModels = 4;

        // Initialize all 3D scenes
        function initAllScenes() {
            initPhoneScene();
            initScreenScene();
            initCameraScene();
            initBatteryScene();
            animate();
        }

        // Utility: Common Scene Setup
        function setupScene(container, zPos = 5) {
            const scene = new THREE.Scene();
            scene.background = null;

            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = zPos;

            const renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(ambientLight, directionalLight);

            // Add a subtle hemisphere light for more natural lighting
            const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
            scene.add(hemisphereLight);

            return { scene, camera, renderer };
        }

        function handleModelLoad() {
            modelsLoaded++;
            if (modelsLoaded === totalModels) {
                const loader = document.querySelector('.loader');
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        loader.style.display = 'none';
                    }
                });
            }
        }

        // === PHONE MODEL ===
        function initPhoneScene() {
            const container = document.getElementById('phone-model');
            if (!container) {
                console.error("Phone model container not found");
                return;
            }

            const { scene, camera, renderer } = setupScene(container);

            phoneScene = scene;
            phoneCamera = camera;
            phoneRenderer = renderer;

            const loader = new THREE.GLTFLoader();
            loader.load(
                'models/phone-body.glb',
                (gltf) => {
                    console.log("Phone model loaded successfully");
                    phoneModel = gltf.scene;
                    phoneModel.scale.set(1.5, 1.5, 1.5);
                    phoneModel.position.set(0, 0, 0);
                    scene.add(phoneModel);
                    handleModelLoad();
                },
                undefined,
                (error) => {
                    console.error("Error loading phone model:", error);
                    // Add a fallback cube if model fails to load
                    const geometry = new THREE.BoxGeometry(1, 2, 0.3);
                    const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
                    phoneModel = new THREE.Mesh(geometry, material);
                    scene.add(phoneModel);
                    handleModelLoad();
                }
            );

            window.addEventListener('resize', () => {
                phoneCamera.aspect = container.clientWidth / container.clientHeight;
                phoneCamera.updateProjectionMatrix();
                phoneRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        // === SCREEN MODEL ===
        function initScreenScene() {
            const container = document.getElementById('screen-model');
            if (!container) {
                console.error("Screen model container not found");
                return;
            }

            const { scene, camera, renderer } = setupScene(container, 3);

            screenScene = scene;
            screenCamera = camera;
            screenRenderer = renderer;

            const loader = new THREE.GLTFLoader();
            loader.load(
                'models/screen.glb',
                (gltf) => {
                    console.log("Screen model loaded successfully");
                    screenModel = gltf.scene;
                    screenModel.scale.set(1.2, 1.2, 1.2);
                    scene.add(screenModel);
                    handleModelLoad();

                    gsap.to(screenModel.rotation, {
                        y: Math.PI * 2,
                        duration: 20,
                        repeat: -1,
                        ease: "none"
                    });
                },
                undefined,
                (error) => {
                    console.error("Error loading screen model:", error);
                    const geometry = new THREE.PlaneGeometry(1.5, 3);
                    const material = new THREE.MeshStandardMaterial({ 
                        color: 0x000000,
                        emissive: 0x111111,
                        side: THREE.DoubleSide
                    });
                    screenModel = new THREE.Mesh(geometry, material);
                    scene.add(screenModel);
                    handleModelLoad();
                }
            );

            window.addEventListener('resize', () => {
                screenCamera.aspect = container.clientWidth / container.clientHeight;
                screenCamera.updateProjectionMatrix();
                screenRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        // === CAMERA MODULE ===
        function initCameraScene() {
            const container = document.getElementById('camera-model');
            if (!container) {
                console.error("Camera model container not found");
                return;
            }

            const { scene, camera, renderer } = setupScene(container, 4);

            cameraScene = scene;
            cameraCamera = camera;
            cameraRenderer = renderer;

            const loader = new THREE.GLTFLoader();
            loader.load(
                'models/camera.glb',
                (gltf) => {
                    console.log("Camera model loaded successfully");
                    cameraModel = gltf.scene;
                    cameraModel.scale.set(1.2, 1.2, 1.2);
                    scene.add(cameraModel);
                    handleModelLoad();

                    gsap.to(cameraModel.rotation, {
                        x: Math.PI * 2,
                        duration: 25,
                        repeat: -1,
                        ease: "none"
                    });
                },
                undefined,
                (error) => {
                    console.error("Error loading camera model:", error);
                    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
                    const material = new THREE.MeshStandardMaterial({ 
                        color: 0x333333,
                        metalness: 0.7,
                        roughness: 0.2
                    });
                    cameraModel = new THREE.Mesh(geometry, material);
                    scene.add(cameraModel);
                    handleModelLoad();
                }
            );

            window.addEventListener('resize', () => {
                cameraCamera.aspect = container.clientWidth / container.clientHeight;
                cameraCamera.updateProjectionMatrix();
                cameraRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        // === BATTERY MODEL ===
        function initBatteryScene() {
            const container = document.getElementById('battery-model');
            if (!container) {
                console.error("Battery model container not found");
                return;
            }

            const { scene, camera, renderer } = setupScene(container, 4);

            batteryScene = scene;
            batteryCamera = camera;
            batteryRenderer = renderer;

            const loader = new THREE.GLTFLoader();
            loader.load(
                'models/battery.glb',
                (gltf) => {
                    console.log("Battery model loaded successfully");
                    batteryModel = gltf.scene;
                    batteryModel.scale.set(1.3, 1.3, 1.3);
                    scene.add(batteryModel);
                    handleModelLoad();

                    gsap.to(batteryModel.rotation, {
                        y: Math.PI * 2,
                        duration: 30,
                        repeat: -1,
                        ease: "none"
                    });
                },
                undefined,
                (error) => {
                    console.error("Error loading battery model:", error);
                    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
                    const material = new THREE.MeshStandardMaterial({ color: 0x0066cc });
                    batteryModel = new THREE.Mesh(geometry, material);
                    scene.add(batteryModel);
                    handleModelLoad();
                }
            );

            window.addEventListener('resize', () => {
                batteryCamera.aspect = container.clientWidth / container.clientHeight;
                batteryCamera.updateProjectionMatrix();
                batteryRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        // === ANIMATE ALL ===
        function animate() {
            requestAnimationFrame(animate);

            if (phoneRenderer && phoneModel) phoneRenderer.render(phoneScene, phoneCamera);
            if (screenRenderer && screenModel) screenRenderer.render(screenScene, screenCamera);
            if (cameraRenderer && cameraModel) cameraRenderer.render(cameraScene, cameraCamera);
            if (batteryRenderer && batteryModel) batteryRenderer.render(batteryScene, batteryCamera);
        }

        // Initialize everything when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            // First check if WebGL is supported
            if (!WEBGL.isWebGLAvailable()) {
                const warning = WEBGL.getWebGLErrorMessage();
                document.getElementById('phone-model').appendChild(warning);
                document.querySelector('.loader').style.display = 'none';
                return;
            }

            // Initialize Lenis for smooth scrolling
            const lenis = new Lenis({
                lerp: 0.1,
                smooth: true,
                direction: 'vertical',
            });

            // Sync GSAP ScrollTrigger with Lenis
            lenis.on('scroll', ScrollTrigger.update);
            
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            
            gsap.ticker.lagSmoothing(0);

            // Initialize Locomotive Scroll
            const locoScroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
                smartphone: {
                    smooth: true
                },
                tablet: {
                    smooth: true
                }
            });

            // Update ScrollTrigger when Locomotive Scroll updates
            locoScroll.on('scroll', ScrollTrigger.update);

            // Tell ScrollTrigger to use these proxy methods
            ScrollTrigger.scrollerProxy('.smooth-scroll', {
                scrollTop(value) {
                    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
                },
                pinType: document.querySelector('.smooth-scroll').style.transform ? "transform" : "fixed"
            });

            // Refresh ScrollTrigger when window updates
            ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
            ScrollTrigger.refresh();

            // Start the 3D scenes
            initAllScenes();

            // Clean up on resize
            window.addEventListener('resize', () => {
                locoScroll.update();
                ScrollTrigger.refresh();
            });
        });
// Global variables
let phoneScene, phoneCamera, phoneRenderer, phoneModel;
let screenScene, screenCamera, screenRenderer, screenModel;
let cameraScene, cameraCamera, cameraRenderer, cameraModel;
let batteryScene, batteryCamera, batteryRenderer, batteryModel;

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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    return { scene, camera, renderer };
}

// === PHONE MODEL ===
function initPhoneScene() {
    const container = document.getElementById('phone-model');
    const { scene, camera, renderer } = setupScene(container);

    phoneScene = scene;
    phoneCamera = camera;
    phoneRenderer = renderer;

    const loader = new THREE.GLTFLoader();
    loader.load('models/phone-body.glb',
        (gltf) => {
          console.log("Model loaded!", gltf); // confirm it gets here
          phoneModel = gltf.scene;
          phoneModel.scale.set(1.5, 1.5, 1.5);
          phoneModel.position.set(0, 0, 0); // added
          phoneScene.add(phoneModel);
        },
        undefined,
        (error) => {
          console.error("Error loading model:", error);
        }
      );
      
    });

    window.addEventListener('resize', () => {
        phoneCamera.aspect = container.clientWidth / container.clientHeight;
        phoneCamera.updateProjectionMatrix();
        phoneRenderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// === SCREEN MODEL ===
function initScreenScene() {
    const container = document.getElementById('screen-model');
    const { scene, camera, renderer } = setupScene(container, 3);

    screenScene = scene;
    screenCamera = camera;
    screenRenderer = renderer;

    const loader = new THREE.GLTFLoader();
    loader.load('models/screen.glb', function (gltf) {
        screenModel = gltf.scene;
        screenModel.scale.set(1.2, 1.2, 1.2);
        scene.add(screenModel);

        gsap.to(screenModel.rotation, {
            y: Math.PI * 2,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    });

    window.addEventListener('resize', () => {
        screenCamera.aspect = container.clientWidth / container.clientHeight;
        screenCamera.updateProjectionMatrix();
        screenRenderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// === CAMERA MODULE ===
function initCameraScene() {
    const container = document.getElementById('camera-model');
    const { scene, camera, renderer } = setupScene(container, 4);

    cameraScene = scene;
    cameraCamera = camera;
    cameraRenderer = renderer;

    const loader = new THREE.GLTFLoader();
    loader.load('models/camera.glb', function (gltf) {
        cameraModel = gltf.scene;
        cameraModel.scale.set(1.2, 1.2, 1.2);
        scene.add(cameraModel);

        gsap.to(cameraModel.rotation, {
            x: Math.PI * 2,
            duration: 25,
            repeat: -1,
            ease: "none"
        });
    });

    window.addEventListener('resize', () => {
        cameraCamera.aspect = container.clientWidth / container.clientHeight;
        cameraCamera.updateProjectionMatrix();
        cameraRenderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// === BATTERY MODEL ===
function initBatteryScene() {
    const container = document.getElementById('battery-model');
    const { scene, camera, renderer } = setupScene(container, 4);

    batteryScene = scene;
    batteryCamera = camera;
    batteryRenderer = renderer;

    const loader = new THREE.GLTFLoader();
    loader.load('models/battery.glb', function (gltf) {
        batteryModel = gltf.scene;
        batteryModel.scale.set(1.3, 1.3, 1.3);
        scene.add(batteryModel);

        gsap.to(batteryModel.rotation, {
            y: Math.PI * 2,
            duration: 30,
            repeat: -1,
            ease: "none"
        });
    });

    window.addEventListener('resize', () => {
        batteryCamera.aspect = container.clientWidth / container.clientHeight;
        batteryCamera.updateProjectionMatrix();
        batteryRenderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// === ANIMATE ALL ===
function animate() {
    requestAnimationFrame(animate);

    if (phoneRenderer) phoneRenderer.render(phoneScene, phoneCamera);
    if (screenRenderer) screenRenderer.render(screenScene, screenCamera);
    if (cameraRenderer) cameraRenderer.render(cameraScene, cameraCamera);
    if (batteryRenderer) batteryRenderer.render(batteryScene, batteryCamera);
}

// Start scenes when DOM is ready
initAllScenes();

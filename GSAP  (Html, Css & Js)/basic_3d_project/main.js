import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("draw"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Load and add the Earth model
const loader = new GLTFLoader();
let earth;

loader.load("./public/assets/models/earth.glb", (gltf) => {
  earth = gltf.scene;
  earth.scale.set(11, 11, 11); // Increase size to cover the text
  earth.position.set(0, -2, 0);
  scene.add(earth);

  // Add continuous rotation
  function rotateEarth() {
    earth.rotation.y += 0.005;
    requestAnimationFrame(rotateEarth);
  }
  rotateEarth();

  // Set up scrolling animations after the model is loaded
  setupScrollAnimations();
});

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Add point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLightHelper);

// Set up camera position
camera.position.z = 5;

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scrolling animations
function setupScrollAnimations() {
  const totalSections = document.querySelectorAll(".section").length;
  const totalScroll = (totalSections - 1) * window.innerHeight;

  // Earth position animation
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: true,
        pin: true,
      },
    })
    .fromTo(
      earth.position,
      { y: -2.5, z: 0 }, // Starting position: below center
      { y: -0.8, z: 0, duration: 1, ease: "power1.inOut" } // Move to center
    )
    .to(earth.position, { z: -5, duration: 1, ease: "power2.in" }); // Move closer to camera

  // Earth scale animation
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: true,
      },
    })
    .to(earth.position, { z: -5, y: -4, duration: 1, ease: "power2.in" }) // Move closer to camera and down
    .to(earth.scale, { x: 11, y: 11, z: 11, duration: 1 }) // Maintain initial scale
    .to(earth.scale, { x: 30, y: 30, z: 30, duration: 1, ease: "power2.in" }); // Increase size for last section

  // Continuous rotation animation
  gsap.to(earth.rotation, {
    y: Math.PI * 2,
    ease: "none",
    repeat: -1, // Infinite rotation
    duration: 20,
  });

  // Animate text sections
  gsap.utils.toArray(".section").forEach((section, index) => {
    // Animate heading
    gsap.fromTo(
      section.querySelector("h1, h2"),
      { 
        opacity: 0, 
        y: 100,
        scale: 0.5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: 0.5,
          toggleActions: "play none none reverse"
        },
      }
    );

    // Animate paragraph
    gsap.fromTo(
      section.querySelector("p"),
      { 
        opacity: 0, 
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
          toggleActions: "play none none reverse"
        },
      }
    );
  });
}

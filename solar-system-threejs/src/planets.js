import * as THREE from "three";

export const planets = [];

export function createPlanets(scene) {
    // ☀️ Add Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffd700, 
        emissive: 0xffa500, 
        emissiveIntensity: 3 // Stronger brightness of the Sun
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);
    
    // 🌞 Strong Sunlight
    const sunLight = new THREE.PointLight(0xffffff, 100, 1500); // Very bright and far-reaching
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // 🌍 Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // 🌌 Planet Details
    const planetData = [
        { name: "Mercury", color: 0xbfbfbf, orbitRadius: 15, size: 1, speed: 1, roughness: 0.7, metalness: 0.2 },
        { name: "Venus", color: 0xff7f24, orbitRadius: 25, size: 2, speed: 0.8, roughness: 0.6, metalness: 0.3 },
        { name: "Earth", color: 0x1e90ff, orbitRadius: 35, size: 2, speed: 0.7, roughness: 0.5, metalness: 0.3 },
        { name: "Mars", color: 0xff4500, orbitRadius: 45, size: 1.5, speed: 0.6, roughness: 0.8, metalness: 0.2 },
        { name: "Jupiter", color: 0xffa500, orbitRadius: 60, size: 4, speed: 0.4, roughness: 0.4, metalness: 0.3 },
        { name: "Saturn", color: 0xffd700, orbitRadius: 80, size: 3.5, speed: 0.3, roughness: 0.5, metalness: 0.3 },
        { name: "Uranus", color: 0x40e0d0, orbitRadius: 100, size: 3, speed: 0.2, roughness: 0.6, metalness: 0.2 },
        { name: "Neptune", color: 0x191970, orbitRadius: 120, size: 3, speed: 0.15, roughness: 0.7, metalness: 0.2 }
    ];

    planetData.forEach(data => {
        // 🔄 Procedural Texture Effect
        const noiseTexture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/water.jpg");
        noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;
        noiseTexture.repeat.set(3, 3); // Adjust for different planets

        const geometry = new THREE.SphereGeometry(data.size, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: data.roughness,
            metalness: data.metalness,
            map: noiseTexture, // Apply procedural texture
            displacementMap: noiseTexture, // Use for bump effect
            displacementScale: 0.1 // Make surface uneven
        });

        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = data.orbitRadius;
        planet.castShadow = true;
        planet.receiveShadow = true;
        scene.add(planet);

        // 🔄 Orbit Ring
        const ringGeometry = new THREE.RingGeometry(data.orbitRadius - 0.2, data.orbitRadius + 0.2, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const orbitRing = new THREE.Mesh(ringGeometry, ringMaterial);
        orbitRing.rotation.x = Math.PI / 2;
        scene.add(orbitRing);

        planets.push({ mesh: planet, ...data, angle: Math.random() * Math.PI * 2 });
    });
}

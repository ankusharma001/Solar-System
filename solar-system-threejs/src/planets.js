import * as THREE from "three";

export const planets = [];
export function createPlanets(scene) {
    // ☀️ Add Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffd700, 
        emissive: 0xffa500, 
        emissiveIntensity: 2 // Brightness of the Sun itself
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    sun.castShadow = false;
    scene.add(sun);
    
    // 🌞 Stronger Sunlight
    const sunLight = new THREE.PointLight(0xffffff, 50, 1000); // Increased intensity and range
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // 🌍 Ambient Light (to prevent total darkness)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Moderate brightness
    scene.add(ambientLight);

    const planetData = [
        { name: "Mercury", color: 0xbfbfbf, orbitRadius: 15, size: 1, speed: 1 },
        { name: "Venus", color: 0xff7f24, orbitRadius: 25, size: 2, speed: 0.8 },
        { name: "Earth", color: 0x1e90ff, orbitRadius: 35, size: 2, speed: 0.7 },
        { name: "Mars", color: 0xff4500, orbitRadius: 45, size: 1.5, speed: 0.6 },
        { name: "Jupiter", color: 0xffa500, orbitRadius: 60, size: 4, speed: 0.4 },
        { name: "Saturn", color: 0xffd700, orbitRadius: 80, size: 3.5, speed: 0.3 },
        { name: "Uranus", color: 0x40e0d0, orbitRadius: 100, size: 3, speed: 0.2 },
        { name: "Neptune", color: 0x191970, orbitRadius: 120, size: 3, speed: 0.15 }
    ];

    planetData.forEach(data => {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            metalness: 0.1, // Reduced metalness for better light reflection
            roughness: 0.4, // Lower roughness to make planets more visible
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

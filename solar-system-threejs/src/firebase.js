import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveConfig(planets) {
    const planetData = planets.map(p => ({ size: p.mesh.scale.x, speed: p.speed, orbitRadius: p.orbitRadius }));
    await setDoc(doc(db, "solarSystem", "config"), { planets: planetData });
}

export async function loadConfig(planets) {
    const docSnap = await getDoc(doc(db, "solarSystem", "config"));
    if (docSnap.exists()) {
        const data = docSnap.data().planets;
        planets.forEach((planet, index) => {
            planet.mesh.scale.set(data[index].size, data[index].size, data[index].size);
            planet.speed = data[index].speed;
            planet.orbitRadius = data[index].orbitRadius;
        });
    }
}

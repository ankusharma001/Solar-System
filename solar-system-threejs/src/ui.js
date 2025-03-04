import { planets } from "./planets.js";
import { saveConfig, loadConfig } from "./firebase.js";

export function setupUI() {
    const planetSelect = document.getElementById("planet-select");
    const sizeSlider = document.getElementById("size-slider");
    const speedSlider = document.getElementById("speed-slider");
    const distanceSlider = document.getElementById("distance-slider");

    // ✅ Populate dropdown
    planets.forEach((planet, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = planet.name;
        planetSelect.appendChild(option);
    });

    // ✅ Ensure first planet is selected by default
    planetSelect.value = "0"; 
    updateUI(); 

    function getSelectedPlanet() {
        return planets[parseInt(planetSelect.value)]; 
    }

    function updateUI() {
        const selectedPlanet = getSelectedPlanet();
        if (!selectedPlanet) return;

        sizeSlider.value = selectedPlanet.mesh.scale.x;
        speedSlider.value = selectedPlanet.speed;
        distanceSlider.value = selectedPlanet.orbitRadius;
    }

    planetSelect.addEventListener("change", updateUI);

    sizeSlider.addEventListener("input", (e) => {
        const selectedPlanet = getSelectedPlanet();
        const scaleValue = parseFloat(e.target.value);
        selectedPlanet.mesh.scale.set(scaleValue, scaleValue, scaleValue);
    });

    speedSlider.addEventListener("input", (e) => {
        const selectedPlanet = getSelectedPlanet();
        selectedPlanet.speed = parseFloat(e.target.value);
    });

    distanceSlider.addEventListener("input", (e) => {
        const selectedPlanet = getSelectedPlanet();
        selectedPlanet.orbitRadius = parseFloat(e.target.value);
        selectedPlanet.mesh.position.x = selectedPlanet.orbitRadius;
    });

    document.getElementById("save-btn").addEventListener("click", () => {
        saveConfig(planets);
    });

    document.getElementById("load-btn").addEventListener("click", async () => {
        await loadConfig(planets);
        updateUI(); 
    });

    updateUI();
}

import { initScene, animate } from "./scene.js";
import { setupUI } from "./ui.js";
import "./firebase.js"; 

document.addEventListener("DOMContentLoaded", () => {
    initScene();
    setupUI();
    animate();
});

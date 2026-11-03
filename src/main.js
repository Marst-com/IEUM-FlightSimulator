
import * as THREE from "three";

import { Renderer } from "./core/Renderer.js";
import { SceneManager } from "./core/SceneManager.js";
import { CameraManager } from "./core/CameraManager.js";

import { Boeing747_400 } from
    "./airplane/Boeing747-400/index.js";

import { Environment } from "./environment/Environment.js";

/* =========================================================
   INITIALIZATION
========================================================= */

const container = document.getElementById("game");

const renderer = new Renderer(container);

const sceneManager = new SceneManager();

const cameraManager = new CameraManager(
    renderer.instance
);

const scene = sceneManager.scene;

/* =========================================================
   AIRCRAFT
========================================================= */

const aircraft = new Boeing747_400();

scene.add(aircraft);

/* =========================================================
   ENVIRONMENT
========================================================= */

const environment = new Environment(scene);

/* =========================================================
   RENDER LOOP
========================================================= */

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    cameraManager.update(delta);

    aircraft.update?.(delta);

    environment.update?.(delta);

    renderer.render(
        scene,
        cameraManager.camera
    );
}

animate();

/* =========================================================
   RESIZE
========================================================= */

window.addEventListener("resize", () => {
    renderer.resize();

    cameraManager.resize();
});

/* =========================================================
   LOADING
========================================================= */

window.addEventListener("load", () => {
    const loading = document.getElementById("loading");

    loading.style.opacity = "0";

    setTimeout(() => {
        loading.remove();
    }, 800);
});

/* =========================================================
   DEBUG
========================================================= */

window.IEUM = {
    scene,
    camera: cameraManager.camera,
    aircraft,
    renderer: renderer.instance
};

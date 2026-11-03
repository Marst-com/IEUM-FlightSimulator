
import * as THREE from "three";

import { Renderer } from "./core/Renderer.js";
import { SceneManager } from "./core/SceneManager.js";
import { CameraManager } from "./core/CameraManager.js";

import Boeing747_400 from "./airplane/Boeing747-400/index.js";

import "./styles/main.css";

class FlightSimulator {
    constructor() {
        this.renderer = null;
        this.sceneManager = null;
        this.cameraManager = null;
        this.aircraft = null;

        this.container = document.querySelector("#game");
        this.loading = document.querySelector("#loading");

        this.clock = new THREE.Clock();
        this.initialized = false;
        this.animationFrame = null;
    }

    async init() {
        try {
            console.log("[IEUM FLIGHT] Initializing...");

            this.validateElements();

            // Renderer
            this.renderer = new Renderer(this.container);

            // Scene
            this.sceneManager = new SceneManager();

            // Camera
            this.cameraManager = new CameraManager(
                this.renderer.instance.domElement
            );

            // Aircraft
            this.aircraft = new Boeing747_400();

            this.sceneManager.scene.add(this.aircraft);

            this.aircraft.position.set(0, 0, 0);

            // Camera position
            this.cameraManager.camera.position.set(
                95,
                45,
                -105
            );

            this.cameraManager.camera.lookAt(0, 0, 0);

            // Resize
            this.handleResize();

            window.addEventListener(
                "resize",
                () => this.handleResize()
            );

            // Ready
            this.initialized = true;

            this.hideLoading();

            console.log("[IEUM FLIGHT] Aircraft initialized.");

            this.animate();

        } catch (error) {
            console.error(
                "[IEUM FLIGHT] Initialization failed:",
                error
            );

            this.showError(error);
        }
    }

    validateElements() {
        if (!this.container) {
            throw new Error(
                'HTML element "#game" was not found.'
            );
        }

        if (!this.loading) {
            throw new Error(
                'HTML element "#loading" was not found.'
            );
        }
    }

    handleResize() {
        if (!this.renderer || !this.cameraManager) return;

        this.renderer.resize();
        this.cameraManager.resize();
    }

    hideLoading() {
        if (!this.loading) return;

        this.loading.style.opacity = "0";

        setTimeout(() => {
            this.loading.style.display = "none";
        }, 500);
    }

    showError(error) {
        if (!this.loading) return;

        this.loading.style.display = "flex";
        this.loading.style.opacity = "1";

        this.loading.innerHTML = `
            <div class="loading-logo">IEUM FLIGHT</div>

            <div class="loading-text" style="color:#ff6464">
                INITIALIZATION FAILED
            </div>

            <div style="
                margin-top:15px;
                max-width:500px;
                padding:15px;
                color:#ffaaaa;
                font-size:12px;
                text-align:center;
                word-break:break-word;
            ">
                ${this.escapeHTML(error.message)}
            </div>

            <button onclick="location.reload()" style="
                margin-top:20px;
                padding:10px 20px;
                border:1px solid #ffffff44;
                background:#ffffff12;
                color:white;
                cursor:pointer;
            ">
                RETRY
            </button>
        `;
    }

    escapeHTML(value) {
        return String(value).replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );
    }

    animate() {
        this.animationFrame = requestAnimationFrame(
            () => this.animate()
        );

        if (!this.initialized) return;

        const delta = this.clock.getDelta();

        // Camera controls
        if (this.cameraManager.update) {
            this.cameraManager.update(delta);
        }

        // Aircraft animation
        if (this.aircraft.update) {
            this.aircraft.update(delta);
        }

        // Render
        this.renderer.render(
            this.sceneManager.scene,
            this.cameraManager.camera
        );
    }

    dispose() {
        this.initialized = false;

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        this.renderer?.dispose();
    }
}

// Start
const simulator = new FlightSimulator();

simulator.init();

window.addEventListener("beforeunload", () => {
    simulator.dispose();
});

window.IEUMFlight = simulator;

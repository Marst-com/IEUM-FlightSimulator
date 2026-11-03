
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
            console.log("[IEUM FLIGHT] Starting...");

            this.validateElements();

            // Renderer
            this.renderer = new Renderer(this.container);

            // Scene
            this.sceneManager = new SceneManager();

            // Camera
            this.cameraManager = new CameraManager(
                this.renderer.instance
            );

            // Aircraft
            this.aircraft = new Boeing747_400();

            this.sceneManager.scene.add(this.aircraft);

            this.aircraft.position.set(0, 0, 0);

            // Camera initial position
            this.cameraManager.camera.position.set(
                95,
                45,
                -105
            );

            this.cameraManager.controls.target.set(
                0,
                0,
                0
            );

            this.cameraManager.controls.update();

            // Initial resize
            this.handleResize();

            // Window resize
            window.addEventListener(
                "resize",
                this.handleResize
            );

            // Ready
            this.initialized = true;

            this.hideLoading();

            console.log("[IEUM FLIGHT] Ready.");

            this.animate();

        } catch (error) {
            console.error(
                "[IEUM FLIGHT] Initialization error:",
                error
            );

            this.showError(error);
        }
    }

    validateElements() {
        if (!this.container) {
            throw new Error(
                'Cannot find "#game" element.'
            );
        }

        if (!this.loading) {
            throw new Error(
                'Cannot find "#loading" element.'
            );
        }
    }

    handleResize = () => {
        if (!this.renderer || !this.cameraManager) {
            return;
        }

        this.renderer.resize();
        this.cameraManager.resize();
    };

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
            <div class="loading-logo">
                IEUM FLIGHT
            </div>

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

    animate = () => {
        this.animationFrame = requestAnimationFrame(
            this.animate
        );

        if (!this.initialized) return;

        const delta = this.clock.getDelta();

        // Camera
        this.cameraManager.update(delta);

        // Aircraft
        if (typeof this.aircraft.update === "function") {
            this.aircraft.update(delta);
        }

        // Render
        this.renderer.render(
            this.sceneManager.scene,
            this.cameraManager.camera
        );
    };

    dispose() {
        this.initialized = false;

        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
        }

        window.removeEventListener(
            "resize",
            this.handleResize
        );

        this.cameraManager?.controls?.dispose();
        this.renderer?.dispose();
    }
}

const simulator = new FlightSimulator();

simulator.init();

window.addEventListener("beforeunload", () => {
    simulator.dispose();
});

window.IEUMFlight = simulator;

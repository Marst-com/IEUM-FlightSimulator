
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

    this.canvas = document.querySelector("#flight-canvas");
    this.loading = document.querySelector("#loading-screen");

    this.clock = new THREE.Clock();
    this.initialized = false;
  }

  async init() {
    try {
      console.log("[IEUM] Initializing renderer...");

      this.renderer = new Renderer(this.canvas);

      console.log("[IEUM] Initializing scene...");

      this.sceneManager = new SceneManager();

      console.log("[IEUM] Initializing camera...");

      this.cameraManager = new CameraManager(
        this.renderer.renderer.domElement
      );

      console.log("[IEUM] Creating aircraft...");

      this.aircraft = new Boeing747_400();

      this.sceneManager.scene.add(this.aircraft);

      console.log("[IEUM] Aircraft created:", this.aircraft);

      this.aircraft.position.set(0, 0, 0);

      this.cameraManager.camera.position.set(95, 45, -105);
      this.cameraManager.camera.lookAt(0, 0, 0);

      this.renderer.resize();
      this.cameraManager.resize();

      window.addEventListener("resize", () => {
        this.renderer.resize();
        this.cameraManager.resize();
      });

      this.initialized = true;

      this.hideLoading();

      console.log("[IEUM] Flight Simulator Ready");

      this.animate();

    } catch (error) {
      console.error("[IEUM] Initialization failed:", error);
      this.showError(error);
    }
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

    this.loading.innerHTML = `
      <div style="
        color: white;
        font-family: monospace;
        text-align: center;
        padding: 30px;
      ">
        <h2>INITIALIZATION FAILED</h2>
        <p style="color:#ff7777">
          ${String(error.message || error)}
        </p>
        <p style="color:#999">
          Check browser console for details.
        </p>
      </div>
    `;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.initialized) return;

    const delta = this.clock.getDelta();

    this.cameraManager.update(delta);

    if (this.aircraft?.update) {
      this.aircraft.update(delta);
    }

    this.renderer.render(
      this.sceneManager.scene,
      this.cameraManager.camera
    );
  }
}

const simulator = new FlightSimulator();

simulator.init();

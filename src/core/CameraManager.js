
import * as THREE from "three";
import { OrbitControls } from
    "three/addons/controls/OrbitControls.js";

export class CameraManager {
    constructor(renderer) {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1200
        );

        this.camera.position.set(75, 35, 85);

        this.controls = new OrbitControls(
            this.camera,
            renderer.domElement
        );

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;

        this.controls.minDistance = 12;
        this.controls.maxDistance = 220;

        this.controls.maxPolarAngle = Math.PI * 0.48;

        this.controls.target.set(0, 0, 0);
    }

    update() {
        this.controls.update();
    }

    resize() {
        this.camera.aspect =
            window.innerWidth / window.innerHeight;

        this.camera.updateProjectionMatrix();
    }

    reset() {
        this.camera.position.set(75, 35, 85);

        this.controls.target.set(0, 0, 0);

        this.controls.update();
    }
}

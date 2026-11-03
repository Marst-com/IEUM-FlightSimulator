
import * as THREE from "three";

export class Renderer {
    constructor(container) {
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });

        this.instance.setPixelRatio(
            Math.min(window.devicePixelRatio, 1.5)
        );

        this.instance.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = 1.15;

        this.instance.outputColorSpace = THREE.SRGBColorSpace;

        container.appendChild(this.instance.domElement);
    }

    render(scene, camera) {
        this.instance.render(scene, camera);
    }

    resize() {
        this.instance.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.instance.setPixelRatio(
            Math.min(window.devicePixelRatio, 1.5)
        );
    }

    dispose() {
        this.instance.dispose();
    }
}

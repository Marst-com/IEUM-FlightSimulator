
import * as THREE from "three";

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x91b9df);

        this.scene.fog = new THREE.Fog(
            0x91b9df,
            180,
            650
        );

        this.setupLights();
    }

    setupLights() {
        const hemisphere = new THREE.HemisphereLight(
            0xcce6ff,
            0x53616f,
            2.2
        );

        this.scene.add(hemisphere);

        const sun = new THREE.DirectionalLight(
            0xffffff,
            3.2
        );

        sun.position.set(80, 120, -60);

        sun.castShadow = true;

        sun.shadow.mapSize.set(1024, 1024);

        sun.shadow.camera.left = -100;
        sun.shadow.camera.right = 100;
        sun.shadow.camera.top = 100;
        sun.shadow.camera.bottom = -100;

        sun.shadow.bias = -0.0003;

        this.scene.add(sun);

        const fill = new THREE.DirectionalLight(
            0x8bbcff,
            1.1
        );

        fill.position.set(-80, 30, 70);

        this.scene.add(fill);
    }
}

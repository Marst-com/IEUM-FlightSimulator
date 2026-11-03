
import * as THREE from "three";
import { materials } from "./materials.js";

export function createEngine(parent, x, z) {
    const engineGroup = new THREE.Group();

    engineGroup.position.set(x, -2.2, z);

    parent.add(engineGroup);

    // Main nacelle

    const casing = new THREE.Mesh(
        new THREE.CylinderGeometry(
            1.55,
            1.7,
            6,
            32
        ),
        materials.engine
    );

    casing.rotation.x = Math.PI / 2;

    casing.castShadow = true;

    engineGroup.add(casing);

    // Intake ring

    const intake = new THREE.Mesh(
        new THREE.TorusGeometry(
            1.55,
            0.16,
            16,
            40
        ),
        materials.metal
    );

    intake.position.z = -3;

    engineGroup.add(intake);

    // Intake disk

    const disk = new THREE.Mesh(
        new THREE.CircleGeometry(1.35, 32),
        materials.black
    );

    disk.position.z = -3.05;

    engineGroup.add(disk);

    // Fan blades

    const bladeGeometry = new THREE.BoxGeometry(
        0.18,
        1.15,
        0.12
    );

    for (let i = 0; i < 24; i++) {
        const blade = new THREE.Mesh(
            bladeGeometry,
            materials.metal
        );

        const angle = (i / 24) * Math.PI * 2;

        blade.position.set(
            Math.cos(angle) * 0.7,
            Math.sin(angle) * 0.7,
            -3.1
        );

        blade.rotation.z = angle;

        engineGroup.add(blade);
    }

    // Center cone

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.55, 1.2, 24),
        materials.metal
    );

    cone.rotation.x = -Math.PI / 2;

    cone.position.z = -3.3;

    engineGroup.add(cone);

    // Exhaust

    const exhaust = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.85,
            1.1,
            1.4,
            24
        ),
        materials.darkBlue
    );

    exhaust.rotation.x = Math.PI / 2;

    exhaust.position.z = 3.5;

    engineGroup.add(exhaust);

    // Pylon

    const pylon = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 1.4, 3.2),
        materials.white
    );

    pylon.position.y = 1.7;

    engineGroup.add(pylon);

    return engineGroup;
}

export function createEngines(parent) {
    const engines = new THREE.Group();

    parent.add(engines);

    createEngine(engines, -10.5, 0);
    createEngine(engines, -23.0, 3);
    createEngine(engines, 10.5, 0);
    createEngine(engines, 23.0, 3);

    return engines;
}

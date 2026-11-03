
import * as THREE from "three";
import { materials } from "./materials.js";

function createWheel(parent, x, y, z, radius = 0.65) {
    const wheelGroup = new THREE.Group();

    wheelGroup.position.set(x, y, z);

    parent.add(wheelGroup);

    const tire = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius,
            radius,
            0.45,
            24
        ),
        materials.rubber
    );

    tire.rotation.z = Math.PI / 2;

    tire.castShadow = true;

    wheelGroup.add(tire);

    const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius * 0.42,
            radius * 0.42,
            0.48,
            20
        ),
        materials.metal
    );

    hub.rotation.z = Math.PI / 2;

    wheelGroup.add(hub);

    return wheelGroup;
}

export function createLandingGear(parent) {
    const gear = new THREE.Group();

    parent.add(gear);

    // Nose gear

    const noseStrut = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.15,
            0.2,
            4,
            12
        ),
        materials.metal
    );

    noseStrut.position.set(0, -3, -25);

    gear.add(noseStrut);

    createWheel(gear, -0.55, -4.8, -25, 0.5);
    createWheel(gear, 0.55, -4.8, -25, 0.5);

    // Main gear

    const positions = [
        [-8, -4.8, 7],
        [8, -4.8, 7],
        [-8, -4.8, 14],
        [8, -4.8, 14]
    ];

    for (const [x, y, z] of positions) {
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.22,
                0.28,
                3,
                12
            ),
            materials.metal
        );

        strut.position.set(x, y + 1.5, z);

        gear.add(strut);

        createWheel(gear, x - 0.65, y, z, 0.7);
        createWheel(gear, x + 0.65, y, z, 0.7);
    }

    return gear;
}

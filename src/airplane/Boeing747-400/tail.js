
import * as THREE from "three";
import { materials } from "./materials.js";

export function createTail(parent) {
    const tail = new THREE.Group();

    parent.add(tail);

    // Vertical stabilizer

    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(7, 0);
    shape.lineTo(6, 13);
    shape.lineTo(2, 17);
    shape.lineTo(0, 14);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 1,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.2,
        bevelThickness: 0.2
    });

    const vertical = new THREE.Mesh(
        geometry,
        materials.blue
    );

    vertical.position.set(-0.5, 0.2, 24);

    vertical.castShadow = true;

    tail.add(vertical);

    // Horizontal stabilizers

    for (const side of [-1, 1]) {
        const stabilizer = new THREE.Mesh(
            new THREE.BoxGeometry(13, 0.6, 5.5),
            materials.white
        );

        stabilizer.position.set(
            side * 6,
            2.5,
            27
        );

        stabilizer.rotation.z = side * -0.04;

        tail.add(stabilizer);
    }

    return tail;
}

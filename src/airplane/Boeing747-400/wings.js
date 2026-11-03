
import * as THREE from "three";
import { materials } from "./materials.js";

export function createWings(parent) {
    const wings = new THREE.Group();

    parent.add(wings);

    for (const side of [-1, 1]) {
        const wing = new THREE.Group();

        wing.scale.x = side;

        const shape = new THREE.Shape();

        shape.moveTo(4, -10);
        shape.lineTo(31.8, 2.5);
        shape.lineTo(32.2, 5);
        shape.lineTo(23.5, 6);
        shape.lineTo(11.5, 14.5);
        shape.lineTo(4, 17);
        shape.lineTo(0, 14);
        shape.lineTo(0, -8);
        shape.closePath();

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.8,
            bevelEnabled: true,
            bevelSegments: 2,
            bevelSize: 0.15,
            bevelThickness: 0.15
        });

        const mesh = new THREE.Mesh(
            geometry,
            materials.white
        );

        mesh.rotation.x = Math.PI / 2;
        mesh.position.y = -0.3;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        wing.add(mesh);

        // Wing trim

        const trim = new THREE.Mesh(
            new THREE.BoxGeometry(29, 0.12, 0.25),
            materials.blue
        );

        trim.position.set(15, 0.3, 2.7);
        trim.rotation.z = -0.08;

        wing.add(trim);

        // Flaps

        for (let i = 0; i < 3; i++) {
            const flap = new THREE.Mesh(
                new THREE.BoxGeometry(
                    8 + i * 2,
                    0.15,
                    1.4
                ),
                materials.metal
            );

            flap.position.set(
                9 + i * 6,
                -0.2,
                10.7
            );

            flap.rotation.z = -0.08;

            wing.add(flap);
        }

        // Winglet

        const winglet = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 2.8, 3.2),
            materials.blue
        );

        winglet.position.set(31.8, 1.2, 3.8);

        wing.add(winglet);

        wings.add(wing);
    }

    return wings;
}

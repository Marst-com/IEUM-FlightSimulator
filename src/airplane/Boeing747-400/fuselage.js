
import * as THREE from "three";
import { materials } from "./materials.js";

export function createFuselage(parent) {
    const rings = [
        [-35.3, 0.15],
        [-34.5, 0.8],
        [-32.8, 1.65],
        [-29.5, 2.55],
        [-24.0, 3.05],
        [-16.0, 3.2],
        [-5.0, 3.25],
        [10.0, 3.25],
        [20.0, 3.15],
        [27.0, 2.8],
        [31.0, 2.2],
        [34.0, 1.4],
        [35.4, 0.2]
    ];

    const segments = 48;
    const vertices = [];
    const indices = [];
    const uvs = [];

    for (let i = 0; i < rings.length; i++) {
        const [z, radius] = rings[i];

        for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2;

            vertices.push(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                z
            );

            uvs.push(
                j / segments,
                i / (rings.length - 1)
            );
        }
    }

    for (let i = 0; i < rings.length - 1; i++) {
        for (let j = 0; j < segments; j++) {
            const a = i * (segments + 1) + j;
            const b = a + segments + 1;

            indices.push(
                a, b, a + 1,
                b, b + 1, a + 1
            );
        }
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );

    geometry.setAttribute(
        "uv",
        new THREE.Float32BufferAttribute(uvs, 2)
    );

    geometry.setIndex(indices);

    geometry.computeVertexNormals();

    const fuselage = new THREE.Mesh(
        geometry,
        materials.fuselage
    );

    fuselage.castShadow = true;
    fuselage.receiveShadow = true;

    parent.add(fuselage);

    return fuselage;
}


import * as THREE from "three";

export const materials = {
    fuselage: new THREE.MeshStandardMaterial({
        color: 0xf4f6fa,
        metalness: 0.22,
        roughness: 0.28
    }),

    white: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.18,
        roughness: 0.3
    }),

    blue: new THREE.MeshStandardMaterial({
        color: 0x123b70,
        metalness: 0.45,
        roughness: 0.25
    }),

    darkBlue: new THREE.MeshStandardMaterial({
        color: 0x07182d,
        metalness: 0.5,
        roughness: 0.2
    }),

    metal: new THREE.MeshStandardMaterial({
        color: 0x9ba8b5,
        metalness: 0.85,
        roughness: 0.23
    }),

    engine: new THREE.MeshStandardMaterial({
        color: 0xdce2e8,
        metalness: 0.7,
        roughness: 0.28
    }),

    black: new THREE.MeshStandardMaterial({
        color: 0x171c22,
        metalness: 0.2,
        roughness: 0.7
    }),

    glass: new THREE.MeshPhysicalMaterial({
        color: 0x172d48,
        metalness: 0.65,
        roughness: 0.12,
        clearcoat: 1
    }),

    rubber: new THREE.MeshStandardMaterial({
        color: 0x181818,
        roughness: 0.95
    }),

    gold: new THREE.MeshStandardMaterial({
        color: 0xc9a45c,
        metalness: 0.65,
        roughness: 0.3
    })
};


import * as THREE from "three";

export function createMaterials() {
  return {
    fuselage: new THREE.MeshStandardMaterial({
      color: 0xe9edf0,
      metalness: 0.32,
      roughness: 0.29
    }),

    white: new THREE.MeshStandardMaterial({
      color: 0xf5f5f2,
      metalness: 0.12,
      roughness: 0.34
    }),

    blue: new THREE.MeshStandardMaterial({
      color: 0x123d70,
      metalness: 0.22,
      roughness: 0.3
    }),

    darkBlue: new THREE.MeshStandardMaterial({
      color: 0x071b31,
      metalness: 0.3,
      roughness: 0.24
    }),

    metal: new THREE.MeshStandardMaterial({
      color: 0x9ca7b0,
      metalness: 0.88,
      roughness: 0.23
    }),

    engine: new THREE.MeshStandardMaterial({
      color: 0xc5cbd0,
      metalness: 0.92,
      roughness: 0.2
    }),

    black: new THREE.MeshStandardMaterial({
      color: 0x101820,
      metalness: 0.12,
      roughness: 0.28
    }),

    glass: new THREE.MeshPhysicalMaterial({
      color: 0x101d2a,
      metalness: 0.45,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.08
    }),

    rubber: new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.92
    }),

    gold: new THREE.MeshStandardMaterial({
      color: 0xb99a56,
      metalness: 0.82,
      roughness: 0.25
    }),

    panelLine: new THREE.MeshStandardMaterial({
      color: 0x9ba8b2,
      metalness: 0.45,
      roughness: 0.5
    }),

    warning: new THREE.MeshStandardMaterial({
      color: 0xd8a62e,
      metalness: 0.25,
      roughness: 0.55
    })
  };
}

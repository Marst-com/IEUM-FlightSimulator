
import * as THREE from "three";

const BODY_LENGTH = 70.7;
const BODY_RADIUS = 3.15;

function createBodyGeometry() {
  const rings = [
    [-35.35, 0.08],
    [-34.9, 0.28],
    [-33.8, 0.65],
    [-32.0, 1.12],
    [-29.0, 1.85],
    [-25.0, 2.55],
    [-20.0, 2.95],
    [-14.0, 3.12],
    [-7.0, 3.15],
    [0.0, 3.15],
    [7.0, 3.15],
    [14.0, 3.12],
    [20.0, 2.95],
    [25.0, 2.65],
    [29.0, 2.25],
    [32.0, 1.75],
    [34.0, 1.1],
    [35.0, 0.45],
    [35.35, 0.08]
  ];

  const radialSegments = 64;
  const vertices = [];
  const indices = [];
  const uvs = [];

  for (let i = 0; i < rings.length; i++) {
    const [z, radius] = rings[i];

    for (let j = 0; j <= radialSegments; j++) {
      const angle = (j / radialSegments) * Math.PI * 2;

      vertices.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      );

      uvs.push(j / radialSegments, i / (rings.length - 1));
    }
  }

  for (let i = 0; i < rings.length - 1; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = a + radialSegments + 1;

      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
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

  return geometry;
}

export function createFuselage(parent, materials) {
  const group = new THREE.Group();
  group.name = "Fuselage";

  const body = new THREE.Mesh(
    createBodyGeometry(),
    materials.fuselage
  );

  body.name = "MainFuselage";
  body.castShadow = true;
  body.receiveShadow = true;

  group.add(body);

  // 동체 하단의 미세한 구조적 띠
  const belly = new THREE.Mesh(
    new THREE.CylinderGeometry(
      BODY_RADIUS * 0.985,
      BODY_RADIUS * 0.985,
      BODY_LENGTH * 0.68,
      64,
      1,
      true
    ),
    materials.white
  );

  belly.rotation.x = Math.PI / 2;
  belly.scale.set(1, 1, 0.01);
  belly.position.y = -0.12;
  belly.position.z = 0;
  belly.visible = false;

  group.add(belly);

  parent.add(group);

  return group;
}

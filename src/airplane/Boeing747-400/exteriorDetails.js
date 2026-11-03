
import * as THREE from "three";

const BODY_RADIUS = 3.15;

function surfacePoint(z, angle, offset = 0.035) {
  const radius = BODY_RADIUS + offset;

  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    z
  );
}

function addWindow(parent, z, angle, materials) {
  const geometry = new THREE.BoxGeometry(0.42, 0.19, 0.045);

  const windowMesh = new THREE.Mesh(
    geometry,
    materials.glass
  );

  const point = surfacePoint(z, angle, 0.04);

  windowMesh.position.copy(point);
  windowMesh.lookAt(
    point.x * 2,
    point.y * 2,
    point.z
  );

  windowMesh.castShadow = false;
  windowMesh.receiveShadow = false;

  parent.add(windowMesh);
}

function addDoor(parent, z, angle, materials) {
  const group = new THREE.Group();

  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 2.35, 0.09),
    materials.panelLine
  );

  const inner = new THREE.Mesh(
    new THREE.BoxGeometry(0.91, 2.19, 0.1),
    materials.white
  );

  const window = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.48, 0.11),
    materials.glass
  );

  inner.position.z = 0.06;
  window.position.set(0, 0.65, 0.13);

  group.add(frame, inner, window);

  const point = surfacePoint(z, angle, 0.07);

  group.position.copy(point);
  group.lookAt(
    point.x * 2,
    point.y * 2,
    point.z
  );

  parent.add(group);
}

function addPanel(parent, z, angle, width, height, materials) {
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.025),
    materials.panelLine
  );

  const point = surfacePoint(z, angle, 0.045);

  panel.position.copy(point);
  panel.lookAt(
    point.x * 2,
    point.y * 2,
    point.z
  );

  parent.add(panel);
}

function addAntenna(parent, x, y, z, materials) {
  const antenna = new THREE.Group();

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.2, 0.12, 12),
    materials.metal
  );

  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.06, 0.42, 8),
    materials.white
  );

  rod.position.y = 0.24;

  antenna.add(base, rod);
  antenna.position.set(x, y, z);

  parent.add(antenna);
}

export function createExteriorDetails(parent, materials) {
  const details = new THREE.Group();
  details.name = "ExteriorDetails";

  // 객실 창문: 좌우 측면
  const windowAngles = [
    Math.PI * 0.5,
    Math.PI * 1.5
  ];

  for (const angle of windowAngles) {
    for (let z = -25; z <= 20; z += 0.85) {
      addWindow(details, z, angle, materials);
    }
  }

  // 주요 출입문
  for (const angle of windowAngles) {
    addDoor(details, -23, angle, materials);
    addDoor(details, -9, angle, materials);
    addDoor(details, 9, angle, materials);
    addDoor(details, 22, angle, materials);
  }

  // 정비 패널
  for (const side of [-1, 1]) {
    const angle = side === 1 ? Math.PI * 0.5 : Math.PI * 1.5;

    addPanel(details, -18, angle, 1.1, 0.65, materials);
    addPanel(details, -15, angle, 0.7, 0.45, materials);
    addPanel(details, 17, angle, 1.2, 0.7, materials);
    addPanel(details, 20, angle, 0.8, 0.5, materials);
  }

  // 동체 상단 안테나
  addAntenna(details, 0, 3.12, -12, materials);
  addAntenna(details, 0, 3.12, 3, materials);
  addAntenna(details, 0, 3.12, 19, materials);

  parent.add(details);

  return details;
}

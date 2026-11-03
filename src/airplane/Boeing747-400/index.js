
import * as THREE from "three";

import { AIRCRAFT_CONFIG } from "./config.js";
import { createExteriorDetails } from "./exteriorDetails.js";
import { createFuselage } from "./fuselage.js";
import { createWings } from "./wings.js";
import { createEngines } from "./engines.js";
import { createTail } from "./tail.js";
import { createLandingGear } from "./landingGear.js";
import { createMaterials } from "./materials.js";

export class Boeing747_400 extends THREE.Group {
    constructor() {
        super();

        this.name = AIRCRAFT_CONFIG.name;
        this.config = AIRCRAFT_CONFIG;

        this.materials = createMaterials();

        this.model = new THREE.Group();
        this.model.name = "Boeing747-400-Model";

        this.add(this.model);

        this.build();
    }

    build() {
        // Main structure
        createFuselage(this.model, this.materials);
        createWings(this.model, this.materials);
        createEngines(this.model, this.materials);
        createTail(this.model, this.materials);
        createLandingGear(this.model, this.materials);

        // Exterior details
        createExteriorDetails(this.model, this.materials);
    }

    update(delta) {
        // Flight physics and animations will be added later.
    }

    dispose() {
        this.traverse((object) => {
            if (!object.isMesh) return;

            object.geometry?.dispose();

            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material?.dispose();
            }
        });
    }
}

export default Boeing747_400;

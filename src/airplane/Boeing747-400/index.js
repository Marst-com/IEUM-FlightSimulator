
import * as THREE from "three";

import { AIRCRAFT_CONFIG } from "./config.js";

import { createExteriorDetails } from "./exteriorDetails.js";
import { createFuselage } from "./fuselage.js";
import { createWings } from "./wings.js";
import { createEngines } from "./engines.js";
import { createTail } from "./tail.js";
import { createLandingGear } from "./landingGear.js";

export class Boeing747_400 extends THREE.Group {
    constructor() {
        super();

        this.name = AIRCRAFT_CONFIG.name;

        this.config = AIRCRAFT_CONFIG;

        this.model = new THREE.Group();

        this.add(this.model);

        this.build();
    }

    build() {
        createFuselage(this.model);

        createWings(this.model);

        createEngines(this.model);

        createTail(this.model);

        createLandingGear(this.model);

        createFuselage(this.model, this.materials);
        
        createExteriorDetails(this.model, this.materials);
    }

    update(delta) {
        // Later: flight physics and animations
    }
}

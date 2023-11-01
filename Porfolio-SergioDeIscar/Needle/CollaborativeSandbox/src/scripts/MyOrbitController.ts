import { OrbitControls, serializable } from "@needle-tools/engine";
import * as THREE from "three";

export class MyOrbitController extends OrbitControls {
    @serializable()
    limitVerticalAngle: boolean = false; // Limita el ángulo vertical
    @serializable()
    minPolarAngleDegrees: number = 0; // Ángulo mínimo en grados desde el polo norte
    @serializable()
    maxPolarAngleDegrees: number = 360; // Ángulo máximo en grados desde el polo norte

    override onEnable() {
        super.onEnable();
        if (this.controls && this.limitVerticalAngle) {
            // Configura las restricciones de ángulo vertical
            if (this.minPolarAngleDegrees !== undefined) {
                this.controls.minPolarAngle = THREE.MathUtils.degToRad(this.minPolarAngleDegrees);
            }
            if (this.maxPolarAngleDegrees !== undefined) {
                this.controls.maxPolarAngle = THREE.MathUtils.degToRad(this.maxPolarAngleDegrees);
            }
        }
    }
}
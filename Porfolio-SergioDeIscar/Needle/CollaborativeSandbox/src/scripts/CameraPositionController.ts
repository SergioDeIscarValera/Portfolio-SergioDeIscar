import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three"
import { SemiOrbitController } from "./SemiOrbitController";

interface PointDupla {
    target: Object3D;
    cameraPoint: Object3D;
}

export class CameraPositionController extends Behaviour {
    @serializable()
    targets: Object3D[] = [];

    @serializable()
    cameraPoints: Object3D[] = [];

    @serializable(SemiOrbitController)
    semiOrbitController: SemiOrbitController | undefined = undefined;

    // ID, target, cameraPoint, distance
    private points: Map<number, PointDupla> = new Map<number, PointDupla>();

    start() {
        this.points = new Map<number, PointDupla>();
        this.targets.forEach((target, index) => {
            this.points.set(index, {
                target: target,
                cameraPoint: this.cameraPoints[index],
            });
        });

        // Si presiona escape cambia la posicion a el index 0
        document.onkeydown = (event) => {
            if (event.key === "Escape") {
                this.changeCameraPosition(0);
            }
        }
    }

    changeCameraPosition(index: number) {
        const point = this.points.get(index);
        if (point === undefined) return;
        this.semiOrbitController?.inicializeSemiorbit(point.cameraPoint.position, point.target)
    }
}
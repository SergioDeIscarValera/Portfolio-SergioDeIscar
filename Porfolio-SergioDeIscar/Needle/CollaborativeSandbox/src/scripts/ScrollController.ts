import { Behaviour, EventList, serializable } from "@needle-tools/engine";
import { Vector3, Object3D, MathUtils } from "three"

export class ScrollController extends Behaviour {
    @serializable(Object3D)
    mainObject: Object3D = new Object3D();
    @serializable(Object3D)
    target: Object3D = new Object3D();

    @serializable(Object3D)
    lastMainObject: Object3D = new Object3D();
    @serializable(Object3D)
    lastTarget: Object3D = new Object3D();

    @serializable(EventList)
    onScroll: EventList = new EventList();

    private initPosition: Vector3 = new Vector3();
    private initTargetPosition: Vector3 = new Vector3();

    private factor: number = 0;

    start() {
        this.initPosition.copy(this.mainObject.position);
        this.initTargetPosition.copy(this.target.position);
        window.addEventListener("wheel", (event) => this.scrollEvent(event));
    }

    private scrollEvent(event: WheelEvent) {
        // factor 0-1
        this.factor = MathUtils.clamp(this.factor + (event.deltaY * (0.001)), 0, 1);
        // Calcula la posición de la cámara
        const lerpedPosition = this.mainObject.position.clone().lerpVectors(this.initPosition, this.lastMainObject.position, this.factor);
        const lerpedTarget = this.target.position.clone().lerpVectors(this.initTargetPosition, this.lastTarget.position, this.factor);
        // Ajustar las posiciones
        this.target.position.copy(lerpedTarget);
        // Mirar al target
        this.mainObject.lookAt(this.target.position);
        // Lanza el evento
        this.onScroll.invoke(lerpedPosition);
    }
}
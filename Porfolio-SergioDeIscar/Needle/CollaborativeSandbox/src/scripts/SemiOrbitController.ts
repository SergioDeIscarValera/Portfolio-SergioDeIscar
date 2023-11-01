import { Behaviour, serializable } from "@needle-tools/engine";
import { Vector3, Object3D, MathUtils } from "three"

export class SemiOrbitController extends Behaviour {
    @serializable()
    maxAngleDistanceH: number = 0; // 0 - 360

    @serializable()
    maxAngleDistanceV: number = 0; // 0 - 360

    @serializable()
    target: Object3D | undefined = undefined;

    private screenWidth: number = 0;
    private screenHeight: number = 0;
    private mouseXPosition: number = 0;
    private mouseYPosition: number = 0;
    private distance: number = 0;

    private initialAngleH: number = 0; // Ángulo inicial
    private initialAngleV: number = 0; // Ángulo inicial
    private mainPosition: Vector3 = new Vector3();

    override start() {
        if (this.target === undefined) return;
        this.resize();
        this.inicializeSemiorbit(this.gameObject.transform.position, this.target);

        window.onresize = () => {
            this.resize();
        };

        this.setOnMouseEvent();
    }

    private setOnMouseEvent() {
        onmousemove = (event) => {
            // Calcula la posición del mouse
            this.mouseXPosition = event.clientX - (this.screenWidth / 2);
            this.mouseYPosition = event.clientY - (this.screenHeight / 2);
            // Calcula el ángulo
            const angleH = this.initialAngleH + MathUtils.degToRad((this.mouseXPosition / this.screenWidth) * this.maxAngleDistanceH) * -1;
            const angleV = this.initialAngleV + MathUtils.degToRad((this.mouseYPosition / this.screenHeight) * this.maxAngleDistanceV) * -1;
            // Calcula la posición de la cámara
            const x = Math.sin(angleH) * this.distance;
            const z = Math.cos(angleH) * this.distance;
            const y = Math.sin(angleV) * this.distance;
            // Actualiza la posición
            this.gameObject.transform.position.x = x
            this.gameObject.transform.position.z = z;
            this.gameObject.transform.position.y = y;
            // Actualiza la rotación
            this.gameObject.transform.lookAt(this.target?.position ?? new Vector3());
        }
    }

    private resize() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }

    inicializeSemiorbit(position: Vector3, target: Object3D) {
        this.mainPosition.copy(position);
        // Distancia entre mainPosition y el target
        this.distance = this.mainPosition.distanceTo(target.position);
        this.initialAngleH = Math.atan2(this.mainPosition.x, this.mainPosition.z);
        this.initialAngleV = Math.atan2(this.mainPosition.y, this.mainPosition.z);
        this.gameObject.transform.position.copy(position);
        this.target = target;
        this.gameObject.transform.lookAt(target.position);
    }
}
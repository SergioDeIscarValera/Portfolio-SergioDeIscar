import { Behaviour, serializable } from "@needle-tools/engine";
import { Vector3, Object3D, MathUtils, Vector2 } from "three"
import { ScrollController } from "./ScrollController";

export class SemiOrbitController extends Behaviour {

    @serializable(Object3D)
    target: Object3D = new Object3D();

    @serializable(Vector2)
    maxAngle: Vector2 = new Vector2(0, 0); // x -> Horizontal, y -> Vertical

    @serializable(ScrollController)
    scrollController: ScrollController = new ScrollController();

    private screen = new Vector2();

    private mainPosition = new Vector3(0, 0, 0);
    private initAngle: Vector2 = new Vector2(0, 0);
    private distance = 0;

    private mouseX = 0;
    private mouseY = 0;

    override start() {
        this.resize();

        this.scrollController.onScroll.addEventListener((position: Vector3) => {
            this.updateMainPosition(position);
        });

        this.updateMainPosition(this.gameObject.transform.position);

        window.onresize = () => this.resize();

        onmousemove = (event) => this.mouseMoveEvent(event);
    }

    private updateMainPosition(position: Vector3) {
        this.mainPosition.copy(position);
        this.distance = this.mainPosition.distanceTo(this.target.position);
        this.initAngle.x = Math.atan2(this.mainPosition.x, this.mainPosition.z);
        this.initAngle.y = Math.atan2(this.mainPosition.y, this.mainPosition.z);

        this.updateAngle();
    }

    private mouseMoveEvent(event: MouseEvent) {
        this.mouseX = event.clientX - (this.screen.x / 2);
        this.mouseY = event.clientY - (this.screen.y / 2);
        this.updateAngle();
    }

    private updateAngle() {
        let angleX = (MathUtils.degToRad(this.mouseX / this.screen.x * this.maxAngle.x) * -1) + this.initAngle.x;
        let angleY = MathUtils.degToRad(this.mouseY / this.screen.y * this.maxAngle.y) + this.initAngle.y;

        let x = Math.sin(angleX) * this.distance;
        let z = Math.cos(angleX) * this.distance;
        let y = Math.sin(angleY) * this.distance;

        this.gameObject.position.x = x;
        this.gameObject.position.z = z;
        this.gameObject.position.y = y;

        this.gameObject.lookAt(this.target.position);
    }

    private resize() {
        this.screen.x = window.innerWidth;
        this.screen.y = window.innerHeight;
    }

}
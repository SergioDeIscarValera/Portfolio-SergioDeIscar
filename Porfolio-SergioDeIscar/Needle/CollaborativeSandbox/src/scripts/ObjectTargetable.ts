import { Behaviour, serializable, IPointerClickHandler, PointerEventData, EventList } from "@needle-tools/engine";

//Require ObjectRaycaster

export class ObjectTargetable extends Behaviour implements IPointerClickHandler {
    @serializable()
    mousePointer: boolean = true;

    @serializable(EventList)
    onPointerClickEvent: EventList = new EventList();

    @serializable(EventList)
    onPointerEnterEvent: EventList = new EventList();

    @serializable(EventList)
    onPointerExitEvent: EventList = new EventList();

    @serializable(EventList)
    onPointerLongPressEvent: EventList = new EventList();

    private enterTime: number = 0;
    private exitTime: number = 0;
    private longPressTime: number = 0.5;
    private time: number = 0;

    onPointerClick(_: PointerEventData) {
        if (this.time < this.longPressTime) {
            this.onPointerClickEvent.invoke();
        }
    }

    onPointerEnter(_: PointerEventData) {
        if (this.mousePointer)
            document.body.style.cursor = "pointer";
        this.onPointerEnterEvent.invoke();
    }

    onPointerExit(_: PointerEventData) {
        document.body.style.cursor = "default";
        this.onPointerExitEvent.invoke();
    }

    onPointerDown(_: PointerEventData) {
        this.enterTime = performance.now();
    }

    onPointerUp(_: PointerEventData) {
        this.exitTime = performance.now();
        this.time = (this.exitTime - this.enterTime) / 1000;
        if (this.time > this.longPressTime) {
            this.onPointerLongPressEvent.invoke();
        }
    }


}
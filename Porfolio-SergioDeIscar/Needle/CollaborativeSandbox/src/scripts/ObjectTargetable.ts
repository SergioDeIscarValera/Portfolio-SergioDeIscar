import { Behaviour, serializable, IPointerClickHandler, PointerEventData, EventList } from "@needle-tools/engine";

//Require ObjectRaycaster

export class ObjectTargetable extends Behaviour implements IPointerClickHandler {
    @serializable(EventList)
    onPointerClickEvent: EventList = new EventList();

    @serializable(EventList)
    onPointerEnterEvent: EventList = new EventList();

    @serializable(EventList)
    onPointerExitEvent: EventList = new EventList();

    onPointerClick(_: PointerEventData) {
        this.onPointerClickEvent.invoke();
    }

    onPointerEnter(_: PointerEventData) {
        document.body.style.cursor = "pointer";
        this.onPointerEnterEvent.invoke();
    }

    onPointerExit(_: PointerEventData) {
        document.body.style.cursor = "default";
        this.onPointerExitEvent.invoke();
    }

}
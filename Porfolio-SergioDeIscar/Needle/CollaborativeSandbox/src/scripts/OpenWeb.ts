import { Behaviour, serializable } from "@needle-tools/engine";

export class OpenWeb extends Behaviour {
    @serializable()
    url: string = "";

    openWeb() {
        window.open(this.url, "_blank");
    }
}
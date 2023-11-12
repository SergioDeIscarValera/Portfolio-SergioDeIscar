import { Behaviour, serializable, showBalloonMessage } from "@needle-tools/engine";

export class SetClipBoard extends Behaviour {
    @serializable()
    text: string = "";

    copyTextOnClipboard() {
        navigator.clipboard.writeText(this.text);
        //alert("Email copied to clipboard")
        showBalloonMessage("Email copied to clipboard")
    }
}
import { Behaviour, serializable } from "@needle-tools/engine";

export class InfoManager extends Behaviour {

    @serializable()
    imagesPaths: string[] = [];

    private htmlText: HTMLElement = document.getElementById("text")!;
    private htmlTextContainer: HTMLElement = document.getElementById("text-container")!;
    private htmlImageContainer: HTMLElement = document.getElementById("image-container")!;

    start(): void {
        this.hideText();
    }

    public setText(text: string) {
        this.htmlText.innerHTML = text;
        //this.htmlTextContainer.style.display = "block";
        this.htmlTextContainer.style.opacity = "1";
    }

    public hideText() {
        //this.htmlTextContainer.style.display = "none";
        this.htmlTextContainer.style.opacity = "0";
    }

    public setImage(id: number) {
        this.htmlImageContainer.innerHTML += `<img src="${this.imagesPaths.at(id)}" alt="image" class="info_icon">`;
    }

    public hideImage() {
        this.htmlImageContainer.innerHTML = "";
    }
}
import { Behaviour, serializable } from "@needle-tools/engine";

export class InfoManager extends Behaviour {

    /*@serializable()
    imagesNames: string[] = [];

    private imagesPaths: string[] = [];*/

    private htmlText: HTMLElement = document.getElementById("text")!;
    private htmlTextContainer: HTMLElement = document.getElementById("text-container")!;
    private htmlImageContainer: HTMLElement = document.getElementById("image-container")!;

    start() {
        this.hideText();
        this.hideImage();
    }

    public setText(text: string) {
        this.htmlText.innerHTML = text;
        this.htmlTextContainer.style.opacity = "1"; // Opacity for animation
    }

    public hideText() {
        this.htmlTextContainer.style.opacity = "0"; // Opacity for animation
    }

    public setImage(imageName: string) {
        let htmlImage = document.getElementById(imageName.toLowerCase())!;
        htmlImage.style.display = "block";
    }

    public hideImage() {
        let htmlImages = this.htmlImageContainer.getElementsByTagName("img");
        for (var i = 0; i < htmlImages.length; i++) {
            htmlImages[i].style.display = "none";
        }
    }
}
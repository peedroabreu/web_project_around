import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, overlaySelector) {
    super(popupSelector, overlaySelector);

    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }
  //sobresceve o metodo open() para exibir a imagem e legenda
  open(imageSrc, imageAlt) {
    this._image.src = imageSrc;
    this._image.alt = imageAlt;
    this._caption.textContent = imageAlt;

    super.open();
  }
}

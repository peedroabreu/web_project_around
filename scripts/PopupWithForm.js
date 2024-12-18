import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, overlaySelector, handleFormSubmit) {
    super(popupSelector, overlaySelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputValues = this._getInputValues();
        this._handleFormSubmit(inputValues);
        this.close();
      });
    }
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

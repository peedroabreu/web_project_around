export class Popup {
  constructor(popupSelector, overlaySelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      console.error(
        `Erro: O popup com o seletor ${popupSelector} não foi encontrado.`
      );
      return;
    }

    // Seleciona o botão de fechar dentro do popup
    this.closeButton = this._popup.querySelector(".popup__CloseIcon");

    // overlay
    this._overlay = document.querySelector(overlaySelector);

    this._setEventListeners();
  }

  open() {
    if (!this._popup || !this._overlay) return;

    this._popup.classList.add("popup_opened");
    this._overlay.style.display = "block";
  }

  close() {
    if (!this._popup || !this._overlay) return;

    this._popup.classList.remove("popup_opened");
    this._overlay.style.display = "none";
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.close());
    }

    if (this._overlay) {
      this._overlay.addEventListener("click", (evt) => {
        if (evt.target === this._overlay) {
          this.close();
        }
      });
    }

    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
}

export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector(".element").cloneNode(true);
  }

  _setEventListeners(cardElement, handleCardClick) {
    const heart = cardElement.querySelector(".element__heart");
    const deleteButton = cardElement.querySelector(".element__trash");
    const image = cardElement.querySelector(".element__picture");

    // Clique no coração
    heart.addEventListener("click", () => {
      heart.classList.toggle("clicked");
    });

    // Clique no botão de excluir
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    // Clique na imagem para abrir no popup
    image.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _generateCard(handleCardClick) {
    const cardElement = this._getTemplate();
    const image = cardElement.querySelector(".element__picture");
    const description = cardElement.querySelector(".element__phrase");

    image.src = this._link;
    image.alt = this._name;
    description.textContent = this._name;

    // Adiciona os event listeners ao card
    this._setEventListeners(cardElement, handleCardClick);

    return cardElement;
  }

  getCard(handleCardClick) {
    return this._generateCard(handleCardClick);
  }
}

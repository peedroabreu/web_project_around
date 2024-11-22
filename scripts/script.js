import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  closePopupByEscape,
  closePopupByClickOnOverlay,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  // --------- VARIÁVEIS ---------
  const openButton = document.querySelector(".profile__EditButton");
  const popup = document.querySelector(".popup");
  const popupAdd = document.querySelector(".popupadd");
  const overlay = document.querySelector(".overlay");

  const popupImage = document.getElementById("popupImage");
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  const closeButton = document.querySelector(".popup__CloseIcon");
  const closeAddButton = document.querySelector(".popupadd__CloseIcon");
  const closePopupButton = document.querySelector(".popup__fechar");

  const formElement = document.querySelector(".form");
  const inputField1 = document.querySelector(".form__field1");
  const inputField2 = document.querySelector(".form__field2");

  const formadd = document.querySelector(".formadd");

  const profileName = document.querySelector(".profile__info_name");
  const profileProfession = document.querySelector(".profile__info_profession");
  const openAddButton = document.querySelector(".profile__AddButton");

  const inputField1add = document.querySelector(".formadd__field1");
  const inputField2add = document.querySelector(".formadd__field2");

  // --------- VALIDAÇÃO ---------
  const formConfig = {
    inputSelector: ".form__field",
    submitButtonSelector: ".form__SubmitButton",
    inactiveButtonClass: "form__SubmitButton_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_active",
  };

  const profileForm = new FormValidator(formConfig, formElement);
  profileForm.enableValidation();

  const addCardForm = new FormValidator(formConfig, formadd);
  addCardForm.enableValidation();

  // --------- RENDERIZAÇÃO DOS CARTÕES ---------
  const initialCards = [
    {
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
      name: "Parque Nacional da Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
  ];

  function renderCards() {
    const elementsContainer = document.getElementById("elementsContainer");

    // Limpar o container de elementos existentes
    while (elementsContainer.firstChild) {
      elementsContainer.removeChild(elementsContainer.firstChild);
    }

    // Renderizar cartões
    initialCards.forEach((cardData) => {
      const card = new Card(cardData, "#cardTemplate");
      elementsContainer.appendChild(card.getCard());
    });
  }

  renderCards();

  // --------- ABRIR/FECHAR POPUPS ---------
  closeButton.addEventListener("click", () => closePopup(popup));
  closeAddButton.addEventListener("click", () => closePopup(popupAdd));
  closePopupButton.addEventListener("click", () => closePopup(popupImage));

  overlay.addEventListener("click", closePopupByClickOnOverlay);
  document.addEventListener("keydown", closePopupByEscape);

  // --------- FORMULÁRIOS ---------
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputField1.value;
    profileProfession.textContent = inputField2.value;
    closePopup(popup);
  });

  // Adicionar novo cartão
  addCardForm._formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const cardName = inputField1add.value;
    const cardLink = inputField2add.value;

    initialCards.unshift({ name: cardName, link: cardLink });
    renderCards();
    closePopup(popupAdd);
  });

  // --------- ABRIR POPUP DE ADICIONAR CARTÃO ---------
  openAddButton.addEventListener("click", function () {
    openPopup(popupAdd);
  });

  // --------- ABRIR POPUP DE EDITAR PERFIL ---------
  openButton.addEventListener("click", function () {
    inputField2.value = profileProfession.textContent.trim();

    openPopup(popup); // Abre o popup para editar perfil
  });
});

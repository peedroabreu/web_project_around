import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";

document.addEventListener("DOMContentLoaded", function () {
  const popup = new Popup("#popup", "#overlay");

  // Função de envio de formulário para o popup de adicionar cartão
  function handleAddCardSubmit(inputValues) {
    const cardName = inputValues.Name;
    const cardLink = inputValues.Link;

    // Criação do novo cartão e adição ao array
    const newCard = { name: cardName, link: cardLink };
    initialCards.unshift(newCard);

    // Cria o cartão e adiciona diretamente ao topo do container
    const newCardElement = createCard(newCard);
    section.addItem(newCardElement);

    section.renderItems();
  }

  const popupAdd = new PopupWithForm(
    ".popupadd",
    "#overlay",
    handleAddCardSubmit
  );

  const popupImage = new PopupWithImage(".popup-image", "#overlay");
  let section;

  const formElement = document.querySelector(".form");
  const inputField1 = document.querySelector(".form__field1");
  const inputField2 = document.querySelector(".form__field2");

  const formadd = document.querySelector(".formadd");

  const profileName = document.querySelector(".profile__info_name");
  const profileProfession = document.querySelector(".profile__info_profession");
  const openAddButton = document.querySelector(".profile__AddButton");
  const openButton = document.querySelector(".profile__EditButton");

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

  // Função para criar e renderizar cartões
  function renderCards() {
    const elementsContainer = document.getElementById("elementsContainer");

    // Função de renderização do card
    const createCard = (cardData) => {
      const card = new Card(cardData, "#cardTemplate");
      // Passa a função de clique diretamente
      const handleCardClick = (imageSrc, imageAlt) => {
        popupImage.open(imageSrc, imageAlt);
      };
      return card.getCard(handleCardClick); // Passa handleCardClick para o método getCard()
    };

    // Criação da instância da classe Section
    section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item);
          section.addItem(cardElement);
        },
      },
      ".elements"
    );

    // Renderiza os cartões ao carregar a página
    section.renderItems();
  }

  renderCards();

  popupImage.close(); // Corrigido para chamar o método close()

  // --------- FORMULÁRIOS ---------
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputField1.value;
    profileProfession.textContent = inputField2.value;
    popup.close();
  });

  openAddButton.addEventListener("click", () => popupAdd.open());

  openButton.addEventListener("click", () => popup.open());

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      popup.close();
      popupAdd.close();
      popupImage.close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.close();
      popupAdd.close();
      popupImage.close();
    }
  });
});

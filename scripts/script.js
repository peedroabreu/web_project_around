document.addEventListener("DOMContentLoaded", function () {
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
  const submitButton = document.querySelector(".form__SubmitButton");

  const profileName = document.querySelector(".profile__info_name");
  const profileProfession = document.querySelector(".profile__info_profession");
  const openAddButton = document.querySelector(".profile__AddButton");

  const errorName = document.querySelector("#errorName");
  const errorAbout = document.querySelector("#errorAbout");

  const inputField1add = document.querySelector(".formadd__field1");
  const inputField2add = document.querySelector(".formadd__field2");
  const errorField1add = document.querySelector("#errorField1");
  const errorField2add = document.querySelector("#errorField2");

  // Função para exibir mensagens de erro de validação
  function showErrorMessage(inputField, errorSpan) {
    inputField.addEventListener("input", function (evt) {
      evt.preventDefault();

      if (
        !inputField.validity.valid ||
        (inputField === inputField2add && !validateURL(inputField.value))
      ) {
        errorSpan.textContent =
          inputField.validationMessage || "Por favor, insira uma URL válida.";
        errorSpan.classList.add("form__error_active");
        errorSpan.classList.remove("form__error");
        inputField.classList.add("form__input_type_error");
      } else {
        errorSpan.textContent = "";
        errorSpan.classList.remove("form__error_active");
        inputField.classList.remove("form__input_type_error");
      }
    });

    inputField.addEventListener("input", function () {
      if (inputField.validity.valid) {
        errorSpan.textContent = "";
        errorSpan.classList.remove("form__error_active");
        errorSpan.classList.add("form__error");
      }
    });
  }

  function validateURL(url) {
    const urlPattern = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(\/\S*)?$/i;
    return urlPattern.test(url);
  }

  function validateForm() {
    const isNameOk = inputField1.checkValidity();
    const isAboutOk = inputField2.checkValidity();
    const isField1AddOk = inputField1add.checkValidity();
    const isField2AddOk = validateURL(inputField2add.value);
    const isAddFieldsFilled =
      inputField1add.value.trim() !== "" && inputField2add.value.trim() !== "";

    submitButton.disabled = !(isNameOk && isAboutOk);

    const addSubmitButton = document.querySelector(
      ".formadd .form__SubmitButton"
    );
    if (addSubmitButton) {
      addSubmitButton.disabled = !(
        isField1AddOk &&
        isField2AddOk &&
        isAddFieldsFilled
      );
    }
  }

  inputField1.addEventListener("input", validateForm);
  inputField2.addEventListener("input", validateForm);
  inputField1add.addEventListener("input", validateForm);
  inputField2add.addEventListener("input", validateForm);

  showErrorMessage(inputField1, errorName);
  showErrorMessage(inputField1add, errorField1add);
  showErrorMessage(inputField2, errorAbout);
  showErrorMessage(inputField2add, errorField2add);

  inputField2add.addEventListener("input", function () {
    const isValid = validateURL(this.value);
    if (!isValid) {
      errorField2add.textContent = "Por favor, insira uma URL válida.";
      errorField2add.classList.add("form__error_active");
    } else {
      errorField2add.textContent = "";
      errorField2add.classList.remove("form__error_active");
    }
    validateForm();
  });

  function updateFormFields() {
    inputField1.value = profileName.textContent.trim();
    inputField2.value = profileProfession.textContent.trim();
    validateForm();
  }

  openButton.addEventListener("click", function () {
    updateFormFields();
    popup.classList.add("popup_opened");
    overlay.style.display = "block";
  });

  // Função para fechar o popup
  function closePopup() {
    popup.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    popupImage.classList.remove("popup_opened");
    overlay.style.display = "none";
  }

  // Fechar os popups ao clicar nos botões de fechar
  closeButton.addEventListener("click", closePopup);
  closeAddButton.addEventListener("click", closePopup);
  closePopupButton.addEventListener("click", closePopup);

  // Fechar o popup da imagem ao clicar no overlay
  overlay.addEventListener("click", function (evt) {
    closePopup();
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup();
    }
  });

  // Submit do formulário de perfil
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputField1.value;
    profileProfession.textContent = inputField2.value;
    closePopup();
  });

  // Renderizar cartões iniciais
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
    const template = document.getElementById("cardTemplate").content;

    while (elementsContainer.firstChild) {
      elementsContainer.removeChild(elementsContainer.firstChild);
    }

    initialCards.forEach((card, index) => {
      const cardElement = document.importNode(template, true);
      const image = cardElement.querySelector(".element__picture");
      const description = cardElement.querySelector(".element__phrase");
      const heart = cardElement.querySelector(".element__heart");
      const deleteCard = cardElement.querySelector(".element__trash");

      image.src = card.link;
      image.alt = card.name;
      description.textContent = card.name;

      image.addEventListener("click", () => {
        popupImageElement.src = card.link;
        popupCaption.textContent = card.name;

        popupImage.classList.add("popup_opened");
        overlay.style.display = "block";
      });

      heart.addEventListener("click", () => {
        heart.classList.toggle("clicked");
      });

      deleteCard.addEventListener("click", () => {
        initialCards.splice(index, 1);
        renderCards();
      });

      elementsContainer.appendChild(cardElement);
    });
  }

  renderCards();

  openAddButton.addEventListener("click", function () {
    popupAdd.classList.add("popup_opened");
    overlay.style.display = "block";
  });

  // Adicionar novo cartão
  const addCardForm = document.querySelector(".formadd");
  addCardForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const cardName = inputField1add.value;
    const cardLink = inputField2add.value;

    initialCards.unshift({ name: cardName, link: cardLink });
    renderCards();
    closePopup();
  });
});

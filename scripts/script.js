document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.querySelector(".profile__EditButton");
  const popup = document.querySelector(".popup");
  const popupAdd = document.querySelector(".popupadd");
  const overlay = document.querySelector(".overlay");
  const closeButton = document.querySelector(".popup__CloseIcon");
  const closeAddButton = document.querySelector(".popupadd__CloseIcon");
  const closePopupButton = document.querySelector(".popup__fechar");

  const inputField1 = document.querySelector(".form__field1");
  const inputField2 = document.querySelector(".form__field2");
  const profileName = document.querySelector(".profile__info_name");
  const profileProfession = document.querySelector(".profile__info_profession");
  const openAddButton = document.querySelector(".profile__AddButton");

  function updateFormFields() {
    inputField1.value = profileName.textContent.trim();
    inputField2.value = profileProfession.textContent.trim();
  }

  // Abrir popup de edição de perfil
  openButton.addEventListener("click", function () {
    updateFormFields();
    console.log("Botão de edição clicado!");
    popup.classList.add("popup_opened");
    overlay.style.display = "block"; // Mostra o overlay
  });

  // Fechar popups
  function closePopup() {
    popup.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    overlay.style.display = "none";
    document.getElementById("popupImage").style.display = "none"; // Fechar popup de imagem
  }

  // Adicionar listeners para fechar popups
  closeButton.addEventListener("click", closePopup);
  closeAddButton.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);
  closePopupButton.addEventListener("click", closePopup);

  // Formulário de edição de perfil
  let formElement = document.querySelector(".form");
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputField1.value;
    profileProfession.textContent = inputField2.value;
    closePopup();
  });

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
      name: "Parque Nacional da Vanoise ",
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

      // Abrir o popup da imagem
      image.addEventListener("click", () => {
        const popupImage = document.getElementById("popupImage");
        const popupImageElement = popupImage.querySelector(".popup__image");
        const popupCaption = popupImage.querySelector(".popup__caption");

        popupImageElement.src = card.link;
        popupCaption.textContent = card.name;
        popupImage.style.display = "flex"; // Mostra o popup da imagem
        overlay.style.display = "block"; // Mostra o overlay
      });

      // Adiciona o evento ao coração
      heart.addEventListener("click", () => {
        heart.classList.toggle("clicked");
      });

      // Exclusão
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
    overlay.style.display = "block"; // Mostra o overlay
  });

  const addCardForm = document.querySelector(".formadd");
  addCardForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const cardName = document.querySelector(".formadd__field1").value;
    const cardLink = document.querySelector(".formadd__field2").value;

    initialCards.unshift({ name: cardName, link: cardLink });
    renderCards();
    closePopup();
  });

  // Fechar popup de imagem
  const popupClose = document.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    document.getElementById("popupImage").style.display = "none";
    overlay.style.display = "none"; // Ocultar o overlay também
  });
});

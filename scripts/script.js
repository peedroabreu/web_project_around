let openButton = document.querySelector(".profile__EditButton");
let popup = document.querySelector(".popup");
let overlay = document.querySelector(".overlay");
let closeButton = document.querySelector(".popup__CloseIcon");

let inputField1 = document.querySelector(".form__field1");
let inputField2 = document.querySelector(".form__field2");

let profileName = document.querySelector(".profile__info_name");
let profileProfession = document.querySelector(".profile__info_profession");

function updateFormFields() {
  let profileNameUpdate = profileName.textContent.trim();
  let profileProfessionUpdate = profileProfession.textContent.trim();

  inputField1.value = profileNameUpdate;
  inputField2.value = profileProfessionUpdate;
}

openButton.addEventListener("click", function () {
  updateFormFields();
  popup.classList.add("popup_opened");
  overlay.style.display = "block";
});
function closePopup() {
  popup.classList.remove("popup_opened");
  overlay.style.display = "none";
}

closeButton.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);

let formElement = document.querySelector(".form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".form__field1");
  let jobInput = document.querySelector(".form__field2");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let nameDisplay = document.querySelector(".profile__info_name");
  let jobDisplay = document.querySelector(".profile__info_profession");

  nameDisplay.textContent = nameValue;
  jobDisplay.textContent = jobValue;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

const hearts = document.querySelectorAll(".element__heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("clicked");
  });
});

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#error${inputElement.name}`
    );
    console.log(inputElement.name);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#error${inputElement.name}`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _toggleSubmitButton() {
    const submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    const isFormValid = this._formElement.checkValidity();
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(
      this._config.inactiveButtonClass,
      !isFormValid
    );
  }

  _setEventListeners() {
    this._formElement.addEventListener("input", (evt) => {
      const inputElement = evt.target;
      this._checkValidity(inputElement);
      this._toggleSubmitButton();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

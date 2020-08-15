export default class FormValidator {
  constructor(setup, formElement) {
    this._formSelector = setup.formSelector;
    this._inputSelector = setup.inputSelector;
    this._submitButtonSelector = setup.submitButtonSelector;
    this._inactiveButtonClass = setup.inactiveButtonClass;
    this._inputErrorClass = setup.inputErrorClass;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    // on 'input':
    // - validate every input field;
    // - set the right state for the submit button.
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      })
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // will return 'true' if at least one of the form inputs is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // called when a form is opened to:
  // - hide error messages from the previous form edition; 
  // - set the right state for the submit button.
  initialFormStateCheck() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleSubmitButtonState();
  }
}
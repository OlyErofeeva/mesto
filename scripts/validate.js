const validationSetup = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_invalid'
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

// will return 'true' if at least one of the inputs is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleSubmitButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (setup) => {
  const formList = Array.from(document.querySelectorAll(setup.formSelector));
  formList.forEach((formElement) => {
    // cancel default actions on 'submit' for each form on the page
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    
    const inputList = Array.from(formElement.querySelectorAll(setup.inputSelector));
    const buttonElement = formElement.querySelector(setup.submitButtonSelector);

    // on 'input':
    // - validate every input field;
    // - set the right state for the submit button.
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, setup.inputErrorClass);
        toggleSubmitButtonState(inputList, buttonElement, setup.inactiveButtonClass);
      });
    });
  });
};

// called from "index.js" when a form is opened to:
// - hide error messages from the previous form edition; 
// - set the right state for the submit button.
const initialFormStateCheck = (formElement, setup = validationSetup) => {
  const inputList = Array.from(formElement.querySelectorAll(setup.inputSelector));
  const buttonElement = formElement.querySelector(setup.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, setup.inputErrorClass);
  });
  toggleSubmitButtonState(inputList, buttonElement, setup.inactiveButtonClass);
}

enableValidation(validationSetup);
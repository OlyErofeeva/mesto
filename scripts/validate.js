const validationSetup = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_invalid'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(validationSetup.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(validationSetup.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// will return 'true' if at least one of the inputs is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleSubmitButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSetup.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationSetup.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationSetup.formSelector));
  formList.forEach((formElement) => {
    // cancel default actions on 'submit' for each form on the page
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    
    const inputList = Array.from(formElement.querySelectorAll(validationSetup.inputSelector));
    const buttonElement = formElement.querySelector(validationSetup.submitButtonSelector);

    // on 'input':
    // - validate every input field;
    // - set the right state for the submit button.
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleSubmitButtonState(inputList, buttonElement);
      });
    });
  });
};

// called from "index.js" when a form is opened to:
// - hide error messages from the previous form edition; 
// - set the right state for the submit button.
const initialFormStateCheck = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSetup.inputSelector));
  const buttonElement = formElement.querySelector(validationSetup.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleSubmitButtonState(inputList, buttonElement);
}

enableValidation();
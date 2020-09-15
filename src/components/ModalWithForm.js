import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit, setFormInputs }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setFormInputs = setFormInputs;
    this._form = this._modal.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._submitButtonInitialText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    this._formValues = {};

    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open() {
    if (this._setFormInputs) {
      this._setFormInputs(this._form);
    }
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoadingOnSubmit(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonInitialText;
    }
  }
}
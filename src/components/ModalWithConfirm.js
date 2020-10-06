import Modal from './Modal.js';
import { renderLoadingText } from '../utils/utils.js';

export default class ModalWithConfirm extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._form = this._modal.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._submitButtonInitialText = this._submitButton.textContent;
  }

  setSubmitHandler(submitHandler) {
    this._handleFormSubmit = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }

  renderLoadingOnSubmit(isLoading) {
    this._submitButton.textContent = renderLoadingText(
      isLoading, 
      'Удаление...', 
      this._submitButtonInitialText
    );
  }
}
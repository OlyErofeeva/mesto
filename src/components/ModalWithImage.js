import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }

  open(link, name) {
    this._modal.querySelector('.modal__full-photo').src = link;
    this._modal.querySelector('.modal__full-photo-caption').textContent = name;
    super.open();
  }
}
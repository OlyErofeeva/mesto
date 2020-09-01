import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._photo = this._modal.querySelector('.modal__full-photo');
    this._name = this._modal.querySelector('.modal__full-photo-caption');
  }

  open(link, name, alt) {
    this._photo.src = link;
    this._photo.alt = alt;
    this._name.textContent = name;
    super.open();
  }
}
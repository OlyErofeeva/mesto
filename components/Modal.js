export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._escEventListener = () => this._handleEscClose();
  }

  open() {
    this._modal.classList.add('modal_opened');
    document.addEventListener('keydown', this._escEventListener);
  }

  close() {
    this._modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._escEventListener);
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.close();
    }

  }

  setEventListeners() {
    this._modal
    .querySelector('.modal__close-button')
    .addEventListener('click', () => this.close());

    this._modal.addEventListener('mousedown', () => {
      if (event.target.classList.contains('modal')) {
        this.close();
      }
    });
  }
}
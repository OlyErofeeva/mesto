import { photoModal, toggleModal, closeOnEsc } from './utils.js';

export default class Card {
  constructor(name, link, alt, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__photo');
    this._cardCaption = this._card.querySelector('.card__caption');
    this._setEventListeners();

    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__photo').addEventListener('click', () => {
      this._handlePhotoClick();
    });

    this._card.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._card.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }

  _handleLikeClick() {
    this._card
    .querySelector('.card__like-button')
    .classList
    .toggle('card__like-button_active');
  }

  _handleDeleteClick() {
    this._card.remove();
  }

  _handlePhotoClick() {
    photoModal.querySelector('.modal__full-photo').src = this._link;
    photoModal.querySelector('.modal__full-photo-caption').textContent = this._name;
    toggleModal(photoModal);
  }
}
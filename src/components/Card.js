export default class Card {
  constructor(cardData, cardSelector, { handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._name = cardData.name;
    this._alt = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._createdAt = cardData.createdAt;

    this._isOwner = cardData.isOwner; //created inside 'addCard' function in 'index.js'
    this._isLiked = cardData.isLiked; //created inside 'addCard' function in 'index.js'

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._cardLikes = this._card.querySelector('.card__likes');
    this._setEventListeners();

    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardLikes.textContent = this._likes.length;

    if (!this._isOwner) {
      this._card
      .querySelector('.card__delete-button')
      .classList
      .add('card__delete-button_hidden');
    }

    if (this._isLiked) {
      this._renderLike();
    }

    return this._card;
  }

  _renderLike() {
    this._card
    .querySelector('.card__like-button')
    .classList
    .toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._card.querySelector('.card__photo').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name, this._alt);
    });

    this._card.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    this._card.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  toggleLike() {
    this._renderLike();
    
    if (this._isLiked) {
      this._cardLikes.textContent = Number(this._cardLikes.textContent) - 1;
    } else {
      this._cardLikes.textContent = Number(this._cardLikes.textContent) + 1;
    }

    this._isLiked = !this._isLiked;
  }
}
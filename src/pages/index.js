import './index.css';

import initialCards from '../scripts/initialCardsArray.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithImage from '../components/ModalWithImage.js';

/* --------------- global constants --------------- */

const openProfileModalButton = document.querySelector('.profile__edit-button');
const openNewPlaceModalButton = document.querySelector('.add-button');

const editProfileForm = document.querySelector('.modal_for_profile').querySelector('.form');
const addNewPlaceForm = document.querySelector('.modal_for_new-place').querySelector('.form');

const validationSetup = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_invalid'
};


/* ------------------ functions ------------------ */

const handleCardClick = (link, name, alt) => {
  photoModal.open(link, name, alt);
};

const addCard = (cardData) => {
  const card = new Card(cardData, '.card-template', handleCardClick);
  cardsList.addItem(card.generateCard());
};


/* ---------------- class instances ---------------- */

const userInfo = new UserInfo({
  fullNameSelector: '.profile__full-name',
  bioSelector: '.profile__bio'
  }
);

const profileFormValidator = new FormValidator(validationSetup, editProfileForm);
const newPlaceFormValidator = new FormValidator(validationSetup, addNewPlaceForm);

const photoModal = new ModalWithImage('.modal_for_photo');

const profileModal = new ModalWithForm({
  modalSelector: '.modal_for_profile',
  handleFormSubmit: data => {
    userInfo.setUserInfo(data);
    profileModal.close();
  },
  setFormInputs: formElement => {
    formElement.newProfileFullName.value = userInfo.getUserInfo().name;
    formElement.newProfileBio.value = userInfo.getUserInfo().bio;
  }
});

const newPlaceModal = new ModalWithForm({
  modalSelector: '.modal_for_new-place',
  handleFormSubmit: (data) => {
    addCard({
      name: data.newPlaceCaption,
      link: data.newPlaceLink,
      alt: data.newPlaceCaption
    });
    newPlaceModal.close();
  }
  
});

const cardsList = new Section({
  items: initialCards,
  renderer: item => addCard(item)
}, '.cards-container');


/* -------------------- logic -------------------- */

cardsList.renderItems();

openProfileModalButton.addEventListener('click', () => {
  profileModal.open();
  profileFormValidator.initialFormStateCheck();
});

openNewPlaceModalButton.addEventListener('click', () => {
  newPlaceModal.open();
  newPlaceFormValidator.initialFormStateCheck();
});

photoModal.setEventListeners();
profileModal.setEventListeners();
newPlaceModal.setEventListeners();

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { photoModal, toggleModal, closeOnEsc } from './utils.js';
import initialCards from './initialCardsArray.js';

/* --------------- global constants --------------- */

const profileName = document.querySelector('.profile__full-name');
const profileBio = document.querySelector('.profile__bio');
const openProfileModalButton = document.querySelector('.profile__edit-button');
const openNewPlaceModalButton = document.querySelector('.add-button');

const profileModal = document.querySelector('.modal_for_profile');
const closeProfileModalButton = profileModal.querySelector('.modal__close-button');
const editProfileForm = profileModal.querySelector('.form');

const newPlaceModal = document.querySelector('.modal_for_new-place');
const closeNewPlaceModalButton = newPlaceModal.querySelector('.modal__close-button');
const addNewPlaceForm = newPlaceModal.querySelector('.form');

const closePhotoModalButton = photoModal.querySelector('.modal__close-button');

const cardsList = document.querySelector('.cards-container');

const modalList = Array.from(document.querySelectorAll('.modal'));

const validationSetup = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_invalid'
};

const profileFormValidator = new FormValidator(validationSetup, editProfileForm);
const newPlaceFormValidator = new FormValidator(validationSetup, addNewPlaceForm);


/* ------------------ functions ------------------ */

function closeOnOverlayClick(event, modal) {
  if (event.target.classList.contains('modal')) {
    toggleModal(modal);
  }
} 

function openProfileModal() {
  toggleModal(profileModal);
  editProfileForm.newProfileFullName.value = profileName.textContent;
  editProfileForm.newProfileBio.value = profileBio.textContent;
  profileFormValidator.initialFormStateCheck();
}

function submitProfile() {
  event.preventDefault();
  profileName.textContent = editProfileForm.newProfileFullName.value;
  profileBio.textContent = editProfileForm.newProfileBio.value;
  toggleModal(profileModal);
}

function openNewPlaceModal() {
  addNewPlaceForm.reset();
  toggleModal(newPlaceModal);
  newPlaceFormValidator.initialFormStateCheck();
}

function submitNewPlace() {
  event.preventDefault();
  const card = new Card(
    addNewPlaceForm.newPlaceCaption.value,
    addNewPlaceForm.newPlaceLink.value,
    addNewPlaceForm.newPlaceCaption.value,
    '.card-template');

  cardsList.prepend(card.generateCard());
  toggleModal(newPlaceModal);
}


/* ------------------ logic ------------------ */

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, item.alt, '.card-template');
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
});

modalList.forEach((modalElement) => {
  modalElement.addEventListener('mousedown', () => closeOnOverlayClick(event, modalElement));
});

openProfileModalButton.addEventListener('click', openProfileModal);
closeProfileModalButton.addEventListener('click', () => toggleModal(profileModal));
editProfileForm.addEventListener('submit', submitProfile);

openNewPlaceModalButton.addEventListener('click', openNewPlaceModal);
closeNewPlaceModalButton.addEventListener('click', () => toggleModal(newPlaceModal));
addNewPlaceForm.addEventListener('submit', submitNewPlace);

closePhotoModalButton.addEventListener('click', () => toggleModal(photoModal));

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
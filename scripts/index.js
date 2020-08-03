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

const photoModal = document.querySelector('.modal_for_photo');
const closePhotoModalButton = photoModal.querySelector('.modal__close-button');

const cardTemplate = document.querySelector('.card-template').content;
const cardsList = document.querySelector('.cards-container');

const modalList = Array.from(document.querySelectorAll('.modal'));


function toggleModal(modal) {
  modal.classList.toggle('modal_opened');
  if (modal.classList.contains('modal_opened')) {
    document.addEventListener('keydown', closeOnEsc);
  } else {
    document.removeEventListener('keydown', closeOnEsc);
  }
}

function closeOnEsc() {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.modal_opened');
    if (modal) {
      toggleModal(modal);
    }
  }
}

function closeOnOverlayClick(event, modal) {
  if (event.target.classList.contains('modal')) {
    toggleModal(modal);
  }
} 

function openProfileModal() {
  toggleModal(profileModal);
  editProfileForm.newProfileFullName.value = profileName.textContent;
  editProfileForm.newProfileBio.value = profileBio.textContent;
  initialFormStateCheck(editProfileForm); //function from "validate.js"
}

function submitProfile() {
  profileName.textContent = editProfileForm.newProfileFullName.value;
  profileBio.textContent = editProfileForm.newProfileBio.value;
  toggleModal(profileModal);
}

function addCard(name, link, alt) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__photo');

  card.querySelector('.card__caption').textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;
  cardsList.prepend(card);
}

function openNewPlaceModal() {
  addNewPlaceForm.reset();
  toggleModal(newPlaceModal);
  initialFormStateCheck(addNewPlaceForm); //function from "validate.js"
}

function submitNewPlace() {
  addCard(addNewPlaceForm.newPlaceCaption.value, 
          addNewPlaceForm.newPlaceLink.value,
          addNewPlaceForm.newPlaceCaption.value);
  toggleModal(newPlaceModal);
}

function cardOpenFullPhoto(event) {
  const currentCard = event.target.closest('.card');
  const currentCardCaption = currentCard.querySelector('.card__caption');
  photoModal.querySelector('.modal__full-photo').src = event.target.src;
  photoModal.querySelector('.modal__full-photo-caption').textContent = currentCardCaption.textContent;
  toggleModal(photoModal);
}

function cardToggleLike(event) {
  event.target.classList.toggle('card__like-button_active');
}

function cardDelete(event) {
  event.target.closest('.card').remove();
}

function cardActionHandler(event) {
  if (event.target.classList.contains('card__photo')) {
    cardOpenFullPhoto(event);
  } else if (event.target.classList.contains('card__like-button')) {
    cardToggleLike(event);
  } else if (event.target.classList.contains('card__delete-button')) {
    cardDelete(event);
  }
}

initialCards.forEach(function (initialCard) {
  addCard(initialCard.name, initialCard.link, initialCard.alt);
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
cardsList.addEventListener('click', () => cardActionHandler(event));
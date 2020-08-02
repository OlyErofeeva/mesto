const profileName = document.querySelector('.profile__full-name');
const profileBio = document.querySelector('.profile__bio');
const openProfileModalButton = document.querySelector('.profile__edit-button');
const openNewPlaceModalButton = document.querySelector('.add-button');

const profileModal = document.querySelector('.modal_for_profile');
const closeProfileModalButton = profileModal.querySelector('.modal__close-button');
const editProfileForm = profileModal.querySelector('.form');
const submitProfileButton = editProfileForm.querySelector('.form__submit-button');

const newPlaceModal = document.querySelector('.modal_for_new-place');
const closeNewPlaceModalButton = newPlaceModal.querySelector('.modal__close-button');
const addNewPlaceForm = newPlaceModal.querySelector('.form');
const submitNewPlaceButton = addNewPlaceForm.querySelector('.form__submit-button');

const photoModal = document.querySelector('.modal_for_photo');
const closePhotoModalButton = photoModal.querySelector('.modal__close-button');

const cardTemplate = document.querySelector('.card-template').content;
const cardsList = document.querySelector('.cards-container');

const modalList = Array.from(document.querySelectorAll('.modal'));

const initialCards = [
  {
    name: 'Байкал',
    link: 'images/photo_lake-baikal.jpg',
    alt: 'Замерзшее озеро Байкал'
  },
  {
    name: 'Эльбрус',
    link: 'images/photo_elbrus.jpg',
    alt: 'Гора Эльбрус'
  },
  {
    name: 'Республика Коми',
    link: 'images/photo_komi.jpg',
    alt: 'Замерзшая река и лес в снегу'
  },
  {
    name: 'Карелия',
    link: 'images/photo_karelia.jpg',
    alt: 'Река с порогами в Карелии'
  },
  {
    name: 'Алтай',
    link: 'images/photo_altai.jpg',
    alt: 'Лес и горы Алтая'
  },
  {
    name: 'Камчатка',
    link: 'images/photo_kamchatka.jpg',
    alt: 'Вулканы Камчатки в тумане от горячих источников'
  }
];

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
  card.querySelector('.card__caption').textContent = name;
  card.querySelector('.card__photo').src = link;
  card.querySelector('.card__photo').alt = alt;
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

function cardActionHandler(event) {
  if (event.target.classList.contains('card__photo')) {
    const currentCard = event.target.closest('.card');
    const currentCardCaption = currentCard.querySelector('.card__caption');
    photoModal.querySelector('.modal__full-photo').src = event.target.src;
    photoModal.querySelector('.modal__full-photo-caption').textContent = currentCardCaption.textContent;
    toggleModal(photoModal);
  } else if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_active');
  } else if (event.target.classList.contains('card__delete-button')) {
    event.target.closest('.card').remove();
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
submitProfileButton.addEventListener('click', submitProfile);

openNewPlaceModalButton.addEventListener('click', openNewPlaceModal);
closeNewPlaceModalButton.addEventListener('click', () => toggleModal(newPlaceModal));
submitNewPlaceButton.addEventListener('click', submitNewPlace);

closePhotoModalButton.addEventListener('click', () => toggleModal(photoModal));
cardsList.addEventListener('click', () => cardActionHandler(event));
import './index.css';

import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithImage from '../components/ModalWithImage.js';
import ModalWithConfirm from '../components/ModalWithConfirm';

/* --------------- global constants --------------- */

const openProfileModalButton = document.querySelector('.profile__edit-button');
const openNewPlaceModalButton = document.querySelector('.add-button');
const openAvatarModalButton = document.querySelector('.profile__avatar-container');

const editProfileForm = document.querySelector('.modal_for_profile').querySelector('.form');
const addNewPlaceForm = document.querySelector('.modal_for_new-place').querySelector('.form');
const changeAvatarForm = document.querySelector('.modal_for_avatar').querySelector('.form');

const loaderElement = document.querySelector('.loader');
const mainContent = document.querySelector('.content');

const validationSetup = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_invalid'
};


/* ------------------ functions ------------------ */

/* 1. shows spinner while waiting for data (user info & cards) from the server */
const mainLoader = (isLoading) => {
  if (isLoading) {
    loaderElement.classList.add('loader_active');
  } else {
    loaderElement.classList.remove('loader_active');
    mainContent.classList.remove('content_hidden');
  }
}

/* 2. adds a card (with all the handlers for it's eventListeners) to the list */
const addCard = (cardData) => {
  const currentUserId = userInfo.getUserInfo().id;

  // extending cardData object with new properties:
  cardData.isOwner = (cardData.owner._id === currentUserId);
  cardData.isLiked = cardData.likes.some((like) => {
    return like._id === currentUserId;
  });

  const card = new Card(cardData, '.card-template', 
  { 
    handleCardClick: (link, name, alt) => {
      photoModal.open(link, name, alt);
    },

    handleDeleteClick: (cardId) => {
      deleteCardConfirmModal.setSubmitHandler(() => {
        deleteCardConfirmModal.renderLoadingOnSubmit(true);
        api
        .deleteCard(cardId)
        .then(() => {
          card.removeCard();
          deleteCardConfirmModal.close();
        })
        .catch(err => alert(err))
        .finally(() => {
          deleteCardConfirmModal.renderLoadingOnSubmit(false);
        });
      });
      deleteCardConfirmModal.open();
    },

    handleLikeClick: (cardId, isLiked) => {
      if (isLiked) {
        card.toggleLike();
        api
        .dislikeCard(cardId)
        .catch(err => alert(err));
      } else {
        card.toggleLike();
        api
        .likeCard(cardId)
        .catch(err => alert(err));
      }
    }
  });

  cardList.addItem(card.generateCard());
};


/* ---------------- class instances ---------------- */

const cardList = new Section(".cards-container");

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '7e5ed350-7573-4b9b-967c-f139542c3d10',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  fullNameSelector: '.profile__full-name',
  bioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar'
  }
);

const photoModal = new ModalWithImage('.modal_for_photo');
const deleteCardConfirmModal = new ModalWithConfirm('.modal_for_confirm');

// edit profile info
const profileModal = new ModalWithForm({
  modalSelector: '.modal_for_profile',
  handleFormSubmit: data => {
    profileModal.renderLoadingOnSubmit(true);
    api
    .editProfile(data)
    .then((response) => {
      userInfo.setUserInfo(response);
      profileModal.close();
    })
    .catch(err => alert(err))
    .finally(() => {
      profileModal.renderLoadingOnSubmit(false);
    });
  },
  setFormInputs: formElement => {
    formElement.newProfileFullName.value = userInfo.getUserInfo().name;
    formElement.newProfileBio.value = userInfo.getUserInfo().bio;
  }
});

// create a new card
const newPlaceModal = new ModalWithForm({
  modalSelector: '.modal_for_new-place',
  handleFormSubmit: data => {
    newPlaceModal.renderLoadingOnSubmit(true);
    api
    .saveCard(data)
    .then(response => {
      addCard(response);
      newPlaceModal.close();
    })
    .catch(err => alert(err))
    .finally(() => {
      newPlaceModal.renderLoadingOnSubmit(false);
    });
  }
});

// change avatar
const avatarModal = new ModalWithForm({
  modalSelector: '.modal_for_avatar',
  handleFormSubmit: data => {
    avatarModal.renderLoadingOnSubmit(true);
    api
    .changeAvatar(data.newAvatarLink)
    .then(response => {
      userInfo.setAvatar(response.avatar);
      avatarModal.close();
    })
    .catch(err => alert(err))
    .finally(() => {
      avatarModal.renderLoadingOnSubmit(false);
    });
  }
});

const profileFormValidator = new FormValidator(validationSetup, editProfileForm);
const newPlaceFormValidator = new FormValidator(validationSetup, addNewPlaceForm);
const avatarFormValidator = new FormValidator(validationSetup, changeAvatarForm);


/* -------------------- logic -------------------- */
mainLoader(true);

// getting information about the user & all the cards
Promise.all(
  [
    api.getUserInfo(),
    api.getInitialCards()
  ]
)
.then((results) => {
  const getUserInfoResult = results[0];
  const getInitialCardsResult = results[1];

  userInfo.setUserInfo(getUserInfoResult);
  userInfo.setAvatar(getUserInfoResult.avatar);

  cardList.renderItems(
    {
      items: getInitialCardsResult,
      renderer: (cardData) => {
        addCard(cardData);
      }
    }
  )
})
.catch(err => alert(err))
.finally(() => {
  mainLoader(false);
});


openProfileModalButton.addEventListener('click', () => {
  profileModal.open();
  profileFormValidator.initialFormStateCheck();
});

openNewPlaceModalButton.addEventListener('click', () => {
  newPlaceModal.open();
  newPlaceFormValidator.initialFormStateCheck();
});

openAvatarModalButton.addEventListener('click', () => {
  avatarModal.open();
  avatarFormValidator.initialFormStateCheck();
});

photoModal.setEventListeners();
profileModal.setEventListeners();
newPlaceModal.setEventListeners();
avatarModal.setEventListeners();
deleteCardConfirmModal.setEventListeners();

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
avatarFormValidator.enableValidation();
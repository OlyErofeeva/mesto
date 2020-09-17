import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithImage from '../components/ModalWithImage.js';
import ModalWithConfirm from '../components/ModalWithConfirm.js';

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

/**
 * Shows spinner while waiting for data (user info & cards) from the server
 * @param {boolean} isLoading - Loading indicator: true to show the spinner, false to hide
 */

const mainLoader = (isLoading) => {
  if (isLoading) {
    loaderElement.classList.add('loader_active');
  } else {
    loaderElement.classList.remove('loader_active');
    mainContent.classList.remove('content_hidden');
  }
}

/**
 * Adds a card (with all the handlers for it's eventListeners) to the list
 * @param {object} cardData - Object with all the data needed to create a new card. Minimal structure is { name, link }
 */

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
        api
        .dislikeCard(cardId)
        .then(() => {
          // The number of likes from the response is not used here: it can be confusing for the user to see that the number of likes has decreased after their like (as a result of other users' actions).
          card.toggleLike();
        })
        .catch(err => alert(err));
      } else {
        api
        .likeCard(cardId)
        .then(() => {
          card.toggleLike();
        })
        .catch(err => alert(err));
      }
    }
  });

  cardList.addItem(card.generateCard());
};


/* ---------------- class instances ---------------- */

/**
 * Container for cards
 */
const cardList = new Section(".cards-container");

/**
 * API instance
 */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '7e5ed350-7573-4b9b-967c-f139542c3d10',
    'Content-Type': 'application/json'
  }
});

/**
 * User info: full name, bio (about), avatar
 */
const userInfo = new UserInfo({
  fullNameSelector: '.profile__full-name',
  bioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar'
  }
);

/**
 * Modal window for full-size photo view
 */
const photoModal = new ModalWithImage('.modal_for_photo');

/**
 * Modal window for confirmation dialog
 */
const deleteCardConfirmModal = new ModalWithConfirm('.modal_for_confirm');

/**
 * Modal window for editing profile full name & bio
 */
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

/**
 * Modal window for creating a new card
 */
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

/**
 * Modal window for setting a new avatar
 */
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

/**
 * Validation instances for each form with inputs on the page
 */
const profileFormValidator = new FormValidator(validationSetup, editProfileForm);
const newPlaceFormValidator = new FormValidator(validationSetup, addNewPlaceForm);
const avatarFormValidator = new FormValidator(validationSetup, changeAvatarForm);


/* -------------------- logic -------------------- */

mainLoader(true);

/**
 * Getting information about the user & all the cards from the server (initial load)
 */
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
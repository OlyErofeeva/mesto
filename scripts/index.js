const modal = document.querySelector('.modal-window');
const openModalButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__full-name');
const profileBio = document.querySelector('.profile__bio');
const editProfileForm = document.querySelector('.form');
const closeModalButton = editProfileForm.querySelector('.form__close-button');
const submitProfileButton = editProfileForm.querySelector('.form__submit-button');

function toggleModal() {
  modal.classList.toggle('modal-window_opened');
}

function openModal() {
  toggleModal();
  editProfileForm.newProfileFullName.value = profileName.textContent;
  editProfileForm.newProfileBio.value = profileBio.textContent;
}

function closeModal(event) {
  event.preventDefault(); // убираем перезагрузку страницы при закрытии формы
  toggleModal();
}

function submitProfile(event) {
  profileName.textContent = editProfileForm.newProfileFullName.value;
  profileBio.textContent = editProfileForm.newProfileBio.value;
  event.preventDefault(); // убираем перезагрузку страницы при сохранении
  toggleModal();
}

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
submitProfileButton.addEventListener('click', submitProfile);
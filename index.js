const modal = document.querySelector('.modal-window');
const openModalButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__full-name');
const profileBio = document.querySelector('.profile__bio');
const editProfileForm = document.querySelector('.form');
const closeModalButton = editProfileForm.querySelector('.form__close-button');
const submitProfile = editProfileForm.querySelector('.form__submit-button');

function toggleModal() {
  modal.classList.toggle('modal-window_opened');
}

openModalButton.addEventListener('click', () => {
  toggleModal();
  editProfileForm.newProfileFullName.value = profileName.textContent;
  editProfileForm.newProfileBio.value = profileBio.textContent;
});

closeModalButton.addEventListener('click', (event) => {
  event.preventDefault(); // убираем перезагрузку страницы при закрытии формы
  toggleModal();
});

submitProfile.addEventListener('click', (event) => {
  profileName.textContent = editProfileForm.newProfileFullName.value;
  profileBio.textContent = editProfileForm.newProfileBio.value;

  event.preventDefault(); // убираем перезагрузку страницы при сохранении
  toggleModal();
});
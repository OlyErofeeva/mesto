const photoModal = document.querySelector('.modal_for_photo');

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

export { photoModal, toggleModal, closeOnEsc };
// toggle popup
const popupCard = document.getElementById('popupCard');
const ellipsesBtn = document.getElementById('ellipses-btn');
ellipsesBtn.addEventListener('click', () => {
  const containsPopupClass = popupCard.classList.contains('popup');
  if (containsPopupClass) {
    popupCard.classList.remove('popup');
  } else {
    popupCard.classList.add('popup');
  }
});

// Remove popup class when clicking outside ellipsesBtn
document.addEventListener('click', (event) => {
  const isEllipsesBtnClick = event.target === ellipsesBtn;

  if (!isEllipsesBtnClick && popupCard.classList.contains('popup')) {
    popupCard.classList.remove('popup');
  }
});

// activities modal toggle
const modal = document.querySelector('.activities-modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');

openModal.addEventListener('click', () => {
  modal.showModal();
});
closeModal.addEventListener('click', () => {
  modal.close();
});

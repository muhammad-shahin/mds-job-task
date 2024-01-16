// alert('Javascript is connected!');

const popupCard = document.getElementById('popupCard');
const ellipsesBtn = document.getElementById('ellipses-btn');
ellipsesBtn.addEventListener('click', function () {
  const containsPopupClass = popupCard.classList.contains('popup');
  if (containsPopupClass) {
    popupCard.classList.remove('popup');
  } else {
    popupCard.classList.add('popup');
  }
});

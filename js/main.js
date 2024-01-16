// import { getPreviousData, addNewData } from './localDB';

// toggle popup
const openPopup = (event, BtnId) => {
  console.log(BtnId);
  const popupCard = document.getElementById('popupCard-' + BtnId);
  const containsPopupClass = popupCard.classList.contains('popup');

  if (containsPopupClass) {
    popupCard.classList.remove('popup');
  } else {
    popupCard.classList.add('popup');
  }
};

// activities modal toggle
const modal = document.querySelector('.activities-modal');
const openModal = document.querySelector('.open-modal');

openModal.addEventListener('click', () => {
  modal.showModal();
});
const closeActivitiesModal = () => {
  modal.close();
};

/**
 * -------------------------------
 * localstorage function
 * -------------------------------
 */
// get the previous data from localstorage
const getPreviousData = () => {
  const oldData = JSON.parse(localStorage.getItem('activitiesData'));
  if (oldData?.length) {
    return oldData;
  } else {
    return [];
  }
};

// get the previous data from localstorage
const addNewData = (newData) => {
  const storedData = getPreviousData();
  storedData.push(newData);
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem('activitiesData', updatedData);
};

/**
 * Show data in UI
 */

const activitiesData = getPreviousData();

const showData = (activities) => {
  const activitiesContainer = document.getElementById('all-activities');
  activitiesContainer.innerText = '';
  activities?.forEach((data) => {
    const activitiesWrapper = document.createElement('div');

    activitiesWrapper.innerHTML = `
    <div class="activities-record-wrapper">
            <div class="activities-record-container flex-between p-4">
              <div class="record-left-content">
                <h2 class="fs-3">${data?.fullName}</h2>
                <p><span>Aug 27, 2020</span> | <span>${
                  data?.nickName
                }</span></p>
              </div>
              <div class="record-right-content">
                  <div class='icon-flex check-icon rounded-circle ${
                    data?.isDone === true ? 'd-block' : 'd-none'
                  }'>
                    <i class='fa-solid fa-check'></i>
                  </div>
                <button
                  id="ellipses-btn-${data?.id}"
                  class="icon-flex ellipses-icon rounded-circle border-0"
                  onclick="openPopup(event,  ${data?.id})"
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <!-- popup buttons card -->
                <div
                  class="popup-buttons-card"
                  id="popupCard-${data?.id}"
                >
                  <p>Mark as Done</p>
                  <hr class="horizontal-row" />
                  <p>Delete</p>
                </div>
              </div>
            </div>
            <hr class="horizontal-row mb-2" />
          </div>
    `;
    activitiesContainer.appendChild(activitiesWrapper);
  });
};
showData(activitiesData);

// handle form data
const handleFormSubmit = (event) => {
  event.preventDefault();

  const dateInput = document.getElementById('date');
  const fullNameInput = document.getElementById('fullName');
  const nickNameInput = document.getElementById('nickName');

  // store form data
  const formData = {
    id: getPreviousData()?.length + 1,
    date: dateInput.value,
    fullName: fullNameInput.value,
    nickName: nickNameInput.value,
    isDone: false,
  };
  addNewData(formData);

  // reset form update data in ui & close modal
  event.target.reset();
  showData(getPreviousData());
  closeActivitiesModal();
};

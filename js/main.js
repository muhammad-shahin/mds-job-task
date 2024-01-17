// mark as done & delete popup
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
// toggle grid view
const activitiesContainer = document.getElementById('all-activities');
const gridView = (button) => {
  if (activitiesContainer.classList.contains('grid')) {
    activitiesContainer.classList.remove('grid');
    button.style.backgroundColor = 'rgb(221, 221, 221)';
    button.style.color = 'black';
    button.title = 'Grid View';
  } else {
    activitiesContainer.classList.add('grid');
    button.style.backgroundColor = '#cfcc2b';
    button.style.color = '#fff';
    button.title = 'Horizontal View';
  }
};
/**
 * get previous data, add new data, delete data, and update isDone status
 * using localstorage
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
// add new activities
const addNewData = (newData) => {
  const storedData = getPreviousData();
  storedData.push(newData);
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem('activitiesData', updatedData);
};
// delete activities data
const deleteData = (index) => {
  let storedData = getPreviousData();
  if (index >= 0 && index < storedData.length) {
    storedData.splice(index, 1);
  } else {
    console.log('Invalid index');
  }
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem('activitiesData', updatedData);
  showData(storedData);
};

// update isDone status
const updateData = (index) => {
  let storedData = getPreviousData();
  if (index >= 0 && index < storedData.length) {
    let statusToUpdate = { ...storedData[index] };
    if (statusToUpdate.isDone) {
      statusToUpdate.isDone = false;
      storedData[index] = statusToUpdate;
    } else {
      statusToUpdate.isDone = true;
      storedData[index] = statusToUpdate;
    }
    const updatedData = JSON.stringify(storedData);
    localStorage.setItem('activitiesData', updatedData);
    showData(storedData);
  } else {
    console.log('Invalid index');
  }
};

// Show activities data in UI
const activitiesData = getPreviousData();

const showData = (activities) => {
  activitiesContainer.innerText = '';
  activities?.forEach((data, index) => {
    const activitiesWrapper = document.createElement('div');
    activitiesWrapper.classList.add('all-activities');

    activitiesWrapper.innerHTML = `
    <div class="activities-record-wrapper">
            <div class="activities-record-container flex-between p-4">
              <div class="record-left-content">
                <h2 class="fs-3">${data?.activityName}</h2>
                <p><span>${data?.date}</span> | <span>${
      data?.activityDetails
    }</span></p>
              </div>
              <div class="record-right-content">
                  <div class='icon-flex  rounded-circle check-icon ${
                    data?.isDone === true ? 'is-done' : ''
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
                  <p onclick="updateData(${index})">
                  ${data?.isDone === true ? 'Not Done' : 'Mark as Done'}
                  </p>
                  <hr class="horizontal-row" />
                  <p onclick="deleteData(${index})">Delete</p>
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

// date formatter
function formatDate(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    'en-US',
    options
  );
  return formattedDate;
}

// handle form submit
const handleFormSubmit = (event) => {
  event.preventDefault();
  const dateInput = document.getElementById('date');
  const activityNameInput = document.getElementById('activityName');
  const activityDetailsInput = document.getElementById('activityDetails');
  const formattedDate = formatDate(dateInput.value);

  // store form data
  const formData = {
    id: getPreviousData()?.length + 1,
    date: formattedDate,
    activityName: activityNameInput.value,
    activityDetails: activityDetailsInput.value,
    isDone: false,
  };
  addNewData(formData);

  // reset form data, update in ui, & close modal
  event.target.reset();
  showData(getPreviousData());
  closeActivitiesModal();
};

// get the previous data from localstorage
const getPreviousData = () => {
  const oldData = JSON.parse(localStorage.getItem('activitiesData'));
  if (oldData.length > 0) {
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

export { getPreviousData, addNewData };

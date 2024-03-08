"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const showHealthyBtn = document.getElementById("healthy-btn");
const calculateBMIBtn = document.getElementById("bmi-btn");
let deleteElList = document.querySelectorAll(".btn.btn-danger");

// Hiển thị danh sách thú cưng nhập trước đó
renderTableData(petArr);

// Bắt sự kiện khi ấn chọn vào typeInput để hiển thị loại giống theo đúng loại Dog - Cat
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị các loại giống đúng loại theo từng loại Dog - cat
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    // mảng chứa tất cả dữ liểu của chó
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });

    // Nếu type là Cat
  } else if (typeInput.value === "Cat") {
    // mảng chứa tất cả dữ liểu của mèo
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

//////////////////////////
// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ các input form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  const isValidate = validateData(data);
  if (isValidate) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
  }
});

// Hàm xuát dữ liêu của thú cưng ra table
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                      <th scope="row">${pet.id}</th>
                      <td>${pet.name}</td>
                      <td>${pet.age}</td>
                      <td>${pet.type}</td>
                      <td>${pet.weight}</td>
                      <td>${pet.length}</td>
                      <td>${pet.breed}</td>
                      <td>
                        <i class="bi bi-square-fill" style="color: ${
                          pet.color
                        }"></i>
                      </td>
                      <td><i class="bi ${
                        pet.vaccinated
                          ? "bi-check-circle-fill"
                          : "bi-x-circle-fill"
                      }"></i></td>
                      <td><i class="bi ${
                        pet.dewormed
                          ? "bi-check-circle-fill"
                          : "bi-x-circle-fill"
                      }"></i></td>
                      <td><i class="bi ${
                        pet.sterilized
                          ? "bi-check-circle-fill"
                          : "bi-x-circle-fill"
                      }"></i></td>
                      <td>${displayTime(pet.date).slice(8, 10)}/
                        ${displayTime(pet.date).slice(5, 7)} /
                        ${displayTime(pet.date).slice(0, 4)}</td>
                      <td>
                        <button class="btn btn-danger" onclick="deletePet('${
                          pet.id
                        }')">Delete</button>
                      </td>`;
    tableBodyEl.appendChild(row);
    saveToStorage("petArr", petArr);
  });
}

// Hàm thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// Show sức khỏe thú cưng
let healthyCheck = false;
showHealthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    showHealthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    showHealthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// Hàm xóa thú cưng
function deletePet(petId) {
  const isDeleted = confirm("Are you sure ?");
  if (isDeleted) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
        break;
      }
    }
  }
}

// Hàm xóa thông tin dữ liệu sau khi submit form xong
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Type";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hàm validate dữ liệu trong lúc nhập form
function validateData(data) {
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Please input for ID");
    isValidate = false;
  } else if (data.name.trim() === "") {
    alert("Please input for Name");
    isValidate = false;
  } else if (isNaN(data.age)) {
    alert("Please input for Age");
    isValidate = false;
  } else if (isNaN(data.weight)) {
    alert("Please input for Weight");
    isValidate = false;
  } else if (isNaN(data.length)) {
    alert("Please input for Length");
    isValidate = false;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("Id must unique !");
      isValidate = false;
      break;
    }
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }

  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}

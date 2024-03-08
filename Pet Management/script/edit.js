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
const formEl = document.getElementById("container-form");

/////////////////////////
// Hiển thị thú cưng
renderTableData(petArr);

// Hàm hiển thị dữ liệu thú cưng vào bảng
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
                        <button type="button" class="btn btn-danger" onclick="editPet('${
                          pet.id
                        }')">Edit</button>
                      </td>`;
    tableBodyEl.appendChild(row);
    saveToStorage("petArr", petArr);
  });
}

// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// Hàm xử lý khi người dùng nhấn vào các nút Edit
function editEvent() {
  const editList = document.querySelectorAll(".btn.btn-danger");
  editList.forEach((editEl) => {
    // Sự kiện vào nút edit
    editEl.addEventListener("click", function () {
      // Lấy id của thú cưng được edit
      const id = editEl.parentElement.parentElement.children[0].innerHTML;
      // Gọi hàm edit để edit
      editPet(id);
    });
  });
}

// Hàm chỉnh sửa dữ liệu thông tin thú cưng
function editPet(id) {
  // hiện lại form nhập dữ liệu
  formEl.classList.remove("hide");
  const pet = petArr.find((petItem) => petItem.id === id);
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.check = pet.sterilized;

  // để hiển thi đúng các loại giống cho từng loại dog - cat khi người dùng edit
  renderBreed();
  // hiển thị dữ liệu loại giống thú cưng ( dữ liệu ban đầu trước khi edit )
  breedInput.value = `${pet.breed}`;
}

//////////////////////////
// Bắt sự kiện khi ấn chọn vào typeInput để hiển thị loại giống theo đúng loại Dog - Cat
typeInput.addEventListener("click", renderBreed);

//////////////////////////
// Hàm hiển thị giống thú cưng theo từng loại (Dog - Cat) nhất định
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
    // date: new Date(),
  };

  const isValidate = validateData(data);
  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;

    // cập nhật lại dữ liệu của thú cưng đó
    petArr[index] = data;
    saveToStorage("petArr", petArr);

    // ẩn form đi và hiện lại bảng dữ liệu thú cưng
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

/////////////////////////////////////////////
// Validate dữ liệu hợp liệu
// Hàm trả về true nếu dữ liệu hợp lệ, trả về false nếu không hợp lệ
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

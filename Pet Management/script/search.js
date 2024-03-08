"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");
const findBtn = document.getElementById("find-btn");

// Bắt đầu vào hiển thị toàn bộ thú cưng
renderTableData(petArr);

//////////////////////////////////
// Bắt sự kiện khi click vào nút find
findBtn.addEventListener("click", function () {
  // Nhập theo id thì tìm theo id
  let petArrFind = petArr;
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  // Nhập theo name thì tìm theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  // Nhập theo type thì tìm theo type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type.includes(typeInput.value));
  }

  // Nhập theo breed thì tìm theo breed
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) =>
      pet.breed.includes(breedInput.value)
    );
  }

  // Nếu tích chọn các vaccinatedInput
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  // Nếu tích chọn các dewormedInput
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }

  // Nếu tích chọn các sterilizedInput
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  // Hiển thị các thú cưng thỏa điều kiện tìm kiếm
  renderTableData(petArrFind);
});

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
                      `;
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

// Hiển thị các loại giống Breed
renderBreed();

// Hàm hiển thị tát các các loài giống Breed
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}

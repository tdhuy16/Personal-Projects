"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Hiển thị danh sách
renderTableBreed(breedArr);

btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // Validate data
  const isValidate = validate(data);

  if (isValidate) {
    // Thêm dữ liệu vào các mảng của Breed
    breedArr.push(data);
    // Lưu dữ liệu
    saveToStorage("breedArr", breedArr);
    // Hiển thị lại bảng thông tin của Breed
    renderTableBreed(breedArr);
    // Xóa thông tin nhập từ Form
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed !");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type !");
    isValidate = false;
  }

  return isValidate;
}

function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
		<td scope="col">${breedItem.breed}</td>
		<td scope="col">${breedItem.type}</td>
		<td>
     <button type="button" onclick = "deleteBreed('${
       breedItem.breed
     }')" class= "btn btn-danger">Delete</button> 
    </td>`;

    tableBodyEl.appendChild(row);
  });
}

function deleteBreed(breed) {
  const isDeleted = confirm("Are you sure ?");
  if (isDeleted) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}

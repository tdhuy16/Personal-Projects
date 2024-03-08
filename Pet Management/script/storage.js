"use strict";

// Animation khi click vao sidebar
const navEL = document.getElementById("sidebar");
navEL.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Dữ liệu data cho sẵn mặc định để test mà không cần nhập lúc ban đầu
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(),
};
// Dữ liệu breed cho sẵn mặc định để test mà không cần nhập lúc ban đầu
const breed1 = {
  breed: "Mixed Breed",
  type: " Dog",
};

const breed2 = {
  breed: "Tabby",
  type: " Cat",
};

const breed3 = {
  breed: "Chó Phú Quốc",
  type: " Dog",
};

const breed4 = {
  breed: "Mèo Mướp",
  type: " Cat",
};

// Lấy dữ liệu  petArr
if (!getFromStorage("petArr")) {
  // Gán dữ liệu để test
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

// ------------////-----------
// Lấy dữ liệu  breedArr
if (!getFromStorage("breedArr")) {
  // Gán dữ liệu để test
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
const breedArr = getFromStorage("breedArr");

// ------------////-----------
// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

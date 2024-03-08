"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

//////////////////////////////
// Bắt sự kiện nhấn vào nút Export
btnExport.addEventListener("click", function () {
  const isExport = confirm(" Bạn xác nhận chắc chắn Export ?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

///////////////////////////////
// Hàm lưu dữ liệu xuống File
function saveStaticDataToFile() {
  // Tạo dữ liệu xuống file
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  // Lưu file
  saveAs(blob, "petData.json");
}

///////////////////////////////////
// Bắt sự kiện nhấn vào nút Import
btnImport.addEventListener("click", function () {
  if (!fileInput.value) {
    alert("Vui lòng chọn file muốn import !");
  } else {
    // xác nhận import
    const isImport = confirm("Bạn có chắc chắn muốn Import ?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      // Sự kiện load dữ liệu từ File lên
      reader.addEventListener(
        "load",
        function () {
          // kiểm tra cấu trúc file có hợp lệ với yêu cầu hay không
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            // lưu dữ liệu xuống localStorage
            saveToStorage("petArr", JSON.parse(reader.result));
            alert("Import thành công !");
          }
        },
        false
      );
      if (file) {
        reader.readAsText(file);
      }
      fileInput.value = "";
    }
  }
});

// Hàm kiểm tra cấu trúc File
function checkFile(data) {
  // nếu data không phải là array ( 1 mảng chứa các đối tượng thú cưng ) thì báo lỗi và return false
  if (!(data instanceof Array)) {
    alert("File không hợp lệ: vì dữ liệu không phải là 1 mảng chứa các Object");
    return false;
  }

  // Nếu các phần tử bên trong data không phải là 1 pet Object thì return false
  if (!isPetObject(data)) {
    return false;
  }

  // Nếu các Object trong mảng data chứa dữ liệu không hợp lệ với đinh dạng yêu cầu thì return false
  if (!isValidate(data)) {
    return false;
  }
  return true;
}

// Hàm: kiểm tra xem các phần tử trong có phải là 1 đối tượng dạng pet không
function isPetObject(data) {
  // Nếu không phải toàn bộ các phần tử trong mảng là object thì trả về false
  if (!data.every((item) => item instanceof Object)) {
    alert("File không hợp lệ: có phần tử trong mảng không phải là Object !");
    return false;
  }
  const isOk = data.every((item) => {
    return (
      Object.keys(item).length === 12 &&
      item.hasOwnProperty("id") &&
      item.hasOwnProperty("name") &&
      item.hasOwnProperty("age") &&
      item.hasOwnProperty("type") &&
      item.hasOwnProperty("weight") &&
      item.hasOwnProperty("length") &&
      item.hasOwnProperty("color") &&
      item.hasOwnProperty("breed") &&
      item.hasOwnProperty("vaccinated") &&
      item.hasOwnProperty("dewormed") &&
      item.hasOwnProperty("sterilized") &&
      item.hasOwnProperty("date")
    );
  });
  if (!isOk) {
    alert("File không hợp lệ: vì có Object có thuộc tính không hợp lệ !");
    return false;
  }
  return true;
}

// Hàm kiểm tra tính hợp lệ của dữ liệu
function isValidate(data) {
  return data.every(function (pet) {
    if (pet.id.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính id không hợp lệ !");
      return false;
    }

    if (pet.name.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính name không hợp lệ !");
      return false;
    }

    pet.age = parseInt(pet.age);
    if (isNaN(pet.age) || pet.age < 1 || pet.age > 15) {
      alert("File không hợp lệ: file có thuộc tính age không hợp lệ !");
      return false;
    }

    pet.weight = parseInt(pet.weight);
    if (isNaN(pet.weight) || pet.weight < 1 || pet.weight > 15) {
      alert("File không hợp lệ: file có thuộc tính weight không hợp lệ !");
      return false;
    }

    pet.length = parseInt(pet.length);
    if (isNaN(pet.length) || pet.length < 1 || pet.length > 15) {
      alert("File không hợp lệ: file có thuộc tính length không hợp lệ !");
      return false;
    }

    if (pet.type.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính type không hợp lệ !");
      return false;
    }

    if (pet.color.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính color không hợp lệ !");
      return false;
    }

    if (pet.breed.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính breed không hợp lệ !");
      return false;
    }

    if (pet.date.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính date không hợp lệ !");
      return false;
    }

    if (typeof pet.vaccinated !== "boolean") {
      alert("File không hợp lệ: file có thuộc tính vaccinated không hợp lệ !");
      return false;
    }

    if (typeof pet.dewormed !== "boolean") {
      alert("File không hợp lệ: file có thuộc tính dewormed không hợp lệ !");
      return false;
    }

    if (typeof pet.sterilized !== "boolean") {
      alert("File không hợp lệ: file có thuộc tính sterilized không hợp lệ !");
      return false;
    }
    // Giá trị ID không được trùng với các thú cưng còn lại
    // Biến count để kiểm tra xem có tên thứ 2 nào trùng hay không
    let count = 1;

    for (let item of data) {
      if (pet.id === item.id) {
        // trùng ID
        if (count > 1) {
          alert("File không hợp lệ: các ID phải là duy nhất !");
          return false;
        }
        count++;
      }
    }
    return true;
  });
}

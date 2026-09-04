import { cities } from "./cities.js";
import {
  validateAadhaar,
  validateAddress,
  validateAge,
  validateCity,
  validateCountry,
  validateDob,
  validateGender,
  validateName,
  validatePhone,
  validateState,
} from "./validation.js";

const formData = JSON.parse(localStorage.getItem("usersData")) || [];
console.log(formData);

const form = document.getElementById("form");
const tbody = document.querySelector("#userTable tbody");
let editId = null;

const dob = document.getElementById("dob");
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${year}-${month}-${day}`;
dob.max = todayDate;

document.getElementById("state").addEventListener("change", function () {
  const state = this.value;
  const city = document.getElementById("city");
  city.innerHTML = '<option value="">City</option>';
  if (cities[state]) {
    cities[state].forEach((curcity) => {
      const option = document.createElement("option");
      option.value = curcity;
      option.textContent = curcity;
      city.appendChild(option);
    });
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  let errorElement = document.getElementById(`${fieldId}-error`);
  if (!errorElement) {
    errorElement = document.createElement("small");
    errorElement.id = `${fieldId}-error`;
    errorElement.className = "error-message";
    field.parentElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
  if (fieldId === "country" || fieldId === "state" || fieldId === "city") {
    field.closest(".select-wrap").classList.add("input-error");
  } else if (fieldId === "age") {
    field.closest(".form-section").classList.add("input-error");
  } else if (fieldId === "gender") {
    document.querySelector(".gender-options").classList.add("input-error");
  } else {
    field.classList.add("input-error");
  }
}
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
  });
  document.querySelectorAll(".input-error").forEach((field) => {
    field.classList.remove("input-error");
  });
}
function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
  if (fieldId === "country" || fieldId === "state" || fieldId === "city") {
    field.closest(".select-wrap").classList.remove("input-error");
  } else if (fieldId === "age") {
    field.closest(".form-section").classList.remove("input-error");
  } else if (fieldId === "gender") {
    document.querySelector(".gender-options").classList.remove("input-error");
  } else {
    field.classList.remove("input-error");
  }
}
function validateField(fieldId, validationFunction, value) {
  const error = validationFunction(value);
  if (error) {
    showError(fieldId, error);
    return true;
  }
  clearFieldError(fieldId);
  return false;
}
const adhaarField = document.getElementById("adhaar");
const phoneField = document.getElementById("phone");
adhaarField.addEventListener("input", () => {
  adhaarField.value = adhaarField.value.replace(/\D/g, "");
});
phoneField.addEventListener("input", () => {
  phoneField.value = phoneField.value.replace(/\D/g, "");
});
function setupValidation(fieldId, validationFunction) {
  const field = document.getElementById(fieldId);
  field.addEventListener("blur", () => {
    validateField(fieldId, validationFunction, field.value);
  });
  field.addEventListener("input", () => {
    validateField(fieldId, validationFunction, field.value);
  });
  field.addEventListener("change", () => {
    validateField(fieldId, validationFunction, field.value);
  });
}
setupValidation("name", validateName);
setupValidation("adhaar", validateAadhaar);
setupValidation("phone", validatePhone);
setupValidation("dob", validateDob);
setupValidation("country", validateCountry);
setupValidation("state", validateState);
setupValidation("city", validateCity);
setupValidation("address", validateAddress);
const ageField = document.getElementById("age");
ageField.addEventListener("change", () => {
  const dobValue = document.getElementById("dob").value;
  const age = ageField.checked;
  if (!dobValue) {
    clearFieldError("age");
    return;
  }
  const error = validateAge(dobValue, age);
  if (error) {
    showError("age", error);
  } else {
    clearFieldError("age");
  }
});
document.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const genderCheck = document.querySelector('input[name="gender"]:checked');
    const gender = genderCheck ? genderCheck.value : "";
    const error = validateGender(gender);
    if (error) {
      showError("gender", error);
    } else {
      clearFieldError("gender");
    }
  });
});

const handleFormSubmit = (e) => {
  e.preventDefault();
  clearErrors();
  const name = document.getElementById("name").value;
  const adhaar = document.getElementById("adhaar").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").checked;
  const dobValue = document.getElementById("dob").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;
  const genderCheck = document.querySelector('input[name="gender"]:checked');
  const gender = genderCheck ? genderCheck.value : "";
  let hasError = false;
  if (validateField("name", validateName, name)) {
    hasError = true;
  }
  if (validateField("adhaar", validateAadhaar, adhaar)) {
    hasError = true;
  }
  if (validateField("phone", validatePhone, phone)) {
    hasError = true;
  }
  if (validateField("dob", validateDob, dobValue)) {
    hasError = true;
  }
  const ageError = validateAge(dobValue, age);
  if (ageError) {
    showError("age", ageError);
    hasError = true;
  }
  const genderError = validateGender(gender);
  if (genderError) {
    showError("gender", genderError);
    hasError = true;
  }
  if (validateField("country", validateCountry, country)) {
    hasError = true;
  }
  if (validateField("state", validateState, state)) {
    hasError = true;
  }
  if (validateField("city", validateCity, city)) {
    hasError = true;
  }
  if (validateField("address", validateAddress, address)) {
    hasError = true;
  }
  if (hasError) {
    return;
  }
  const getData = {
    name,
    adhaar,
    phone: "+91 " + phone,
    age,
    dob: dobValue,
    gender,
    country,
    state,
    city,
    address,
  };
  if (editId !== null) {
    const idx = formData.findIndex((cur) => cur.id === editId);
    formData[idx] = {
      id: editId,
      ...getData,
    };
    editId = null;
  } else {
    formData.push({
      id: Date.now(),
      ...getData,
    });
  }
  localStorage.setItem("usersData", JSON.stringify(formData));
  form.reset();
  document.getElementById("city").innerHTML = '<option value="">City</option>';
  render(formData);
};

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("reset", () => {
  editId = null;
  clearErrors();
  document.getElementById("city").innerHTML =
    '<option value="">Select City</option>';
});

function handleDelete(id) {
  const filterdata = formData.filter((cur) => cur.id !== id);
  formData.length = 0;
  formData.push(...filterdata);
  localStorage.setItem("usersData", JSON.stringify(formData));
  render(formData);
}
function handleEdit(id) {
  editId = id;
  const filterData = formData.find((cur) => cur.id === editId);
  if (!filterData) return;
  document.getElementById("name").value = filterData.name;
  document.getElementById("adhaar").value = filterData.adhaar;
  document.getElementById("phone").value = filterData.phone.replace("+91 ", "");
  document.getElementById("age").checked = filterData.age;
  document.getElementById("dob").value = filterData.dob;
  document.querySelector(
    `input[name="gender"][value="${filterData.gender}"]`,
  ).checked = true;
  document.getElementById("country").value = filterData.country;
  document.getElementById("state").value = filterData.state;
  document.getElementById("state").dispatchEvent(new Event("change"));
  document.getElementById("city").value = filterData.city;
  document.getElementById("address").value = filterData.address;
}

tbody.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "edit") {
    handleEdit(id);
  } else if (button.dataset.action === "delete") {
    handleDelete(id);
  }
});

function render(arr) {
  tbody.innerHTML = "";
  arr.forEach((cur) => {
    tbody.innerHTML += `
    <tr>
        <td>${cur.name}</td>
        <td>${cur.adhaar}</td>
        <td>${cur.phone}</td>
        <td>${cur.age ? "18 or above" : "below 18"}</td>
        <td>${cur.dob}</td>
        <td>${cur.gender}</td>
        <td>${cur.country}</td>
        <td>${cur.state}</td>
        <td>${cur.city}</td>
        <td>${cur.address}</td>
        <td>
        <button type="button" data-action="edit" data-id="${cur.id}">Edit</button>
        <button type="button" data-action="delete" data-id="${cur.id}">Delete</button>
        </td>
    </tr>
    `;
  });
}
render(formData);

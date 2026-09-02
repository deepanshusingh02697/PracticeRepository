import {cities} from "./cities.js";
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

document.getElementById("state").addEventListener("change", function () {
  const state = this.value;
  const city = document.getElementById("city");
  city.innerHTML = '<option value="">Select city</option>';
  if (cities[state]) {
    cities[state].forEach((curcity) => {
      const option = document.createElement("option");
      option.value = curcity;
      option.textContent = curcity;
      city.appendChild(option);
    });
  }
});

const handleFormSubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const adhaar = document.getElementById("adhaar").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").checked;
  const dob = document.getElementById("dob").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;
  const genderCheck = document.querySelector('input[name="gender"]:checked');
  const gender = genderCheck ? genderCheck.value : "";
  let error;
  error = validateName(name);
  if (error) {
    alert(error);
    return;
  }
  error = validateAadhaar(adhaar);
  if (error) {
    alert(error);
    return;
  }
  error = validatePhone(phone);
  if (error) {
    alert(error);
    return;
  }
  error = validateDob(dob);
  if (error) {
    alert(error);
    return;
  }
  error = validateAge(dob, age);
  if (error) {
    alert(error);
    return;
  }
  error = validateGender(gender);
  if (error) {
    alert(error);
    return;
  }
  error = validateCountry(country);
  if (error) {
    alert(error);
    return;
  }
  error = validateState(state);
  if (error) {
    alert(error);
    return;
  }
  error = validateCity(city);
  if (error) {
    alert(error);
    return;
  }
  error = validateAddress(address);
  if (error) {
    alert(error);
    return;
  }

  const getData = {
    name,
    adhaar,
    phone: "+91 " + phone,
    age,
    dob,
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
  render(formData);
};

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("reset", () => {
  editId = null;
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

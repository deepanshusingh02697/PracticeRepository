function validateName(name) {
  const value = name.trim();
  if (!value) {
    return "Name is required";
  }
  if (value.length < 3) {
    return "Name must contain at least 3 characters";
  }
  if (value.length > 50) {
    return "Name must not exceed 50 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return "Name can only contain letter and spaces";
  }
  return "";
}
function validateAadhaar(aadhaar) {
  const value = aadhaar.trim();
  if (!value) {
    return "Aadhaar number is required";
  }
  if (!/^\d{12}$/.test(value)) {
    return "Aadhaar number must be of 12-digit number";
  }
  return "";
}
function validatePhone(phone) {
  const value = phone.trim();
  if (!value) {
    return "Phone number is required";
  }
  if (!/^[6-9]\d{9}$/.test(value)) {
    return "Phone number must be of 10-digits and starts with 6-9";
  }
  return "";
}
function validateDob(dob) {
  if (!dob) {
    return "Please select date of birth";
  }
  const date = new Date(`${dob}T00:00:00`);
  const today = new Date();
  if (Number.isNaN(date.getTime())) {
    return "Invalid date of birth";
  }
  if (date > today) {
    return "Date of birth can't be of future";
  }
  return "";
}
function validateAge(dob, checkage) {
  if (!dob) {
    return "Please select date of birth";
  }
  const birthdate = new Date(`${dob}T00:00:00`);
  const today = new Date();
  if (Number.isNaN(birthdate.getTime())) {
    return "Invalid date of birth";
  }
  if (birthdate > today) {
    return "Date of birth cannot be in the future";
  }
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthdiff = today.getMonth() - birthdate.getMonth();
  if (
    monthdiff < 0 ||
    (monthdiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  if (checkage && age < 18) {
    return "you are below 18 according to your DOB";
  }
  if (!checkage && age >= 18) {
    return "you are 18 or above according to your DOB";
  }
  return "";
}
function validateGender(gender) {
  if (!gender) {
    return "Please select gender";
  }
  return "";
}

function validateCountry(country) {
  if (!country) {
    return "Please select country";
  }
  return "";
}
function validateState(state) {
  if (!state) {
    return "Please select state";
  }
  return "";
}
function validateCity(city) {
  if (!city) {
    return "Please select city";
  }
  return "";
}
function validateAddress(address) {
  const value = address.trim();
  if (!value) {
    return "Address is required";
  }
  if (value.length < 10) {
    return "Address must be of atleast 10 characters";
  }
  if (value.length > 250) {
    return "Address must not exceed 250 characters";
  }
  return "";
}
export {
  validateName,
  validateAddress,
  validatePhone,
  validateDob,
  validateAge,
  validateGender,
  validateCountry,
  validateState,
  validateCity,
  validateAadhaar,
};

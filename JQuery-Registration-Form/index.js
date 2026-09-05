const cities = {
  UP: ["Bareilly", "Lucknow", "Kanpur", "Agra", "Varanasi"],
  MH: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  RJ: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  GJ: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  WB: ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  KA: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi"],
  TN: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  KL: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Kollam", "Thrissur"],
  MP: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  BR: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
};

let formData = JSON.parse(localStorage.getItem("usersData")) || [];
let editId = null;
let table;

$(document).ready(function () {
  let today = new Date().toISOString().split("T")[0];
  $("#dob").attr("max", today);
  $("#name").on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^a-zA-Z ]/g, ""),
    );
  });
  $("#adhaar").on("input", function () {
    $(this).val($(this).val().replace(/\D/g, "").slice(0, 12));
  });
  $("#phone").on("input", function () {
    $(this).val($(this).val().replace(/\D/g, "").slice(0, 10));
  });
  $("#state").on("change", function () {
    let state = $(this).val();
    $("#city").html('<option value="">City</option>');
    if (!state) {
      return;
    }
    $.each(cities[state], function (index, city) {
      $("#city").append(`<option value="${city}">${city}</option>`);
    });
  });
  $.validator.addMethod(
    "lettersOnly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]+$/.test(value);
    },
    "Name can only contain letters and spaces",
  );
  $.validator.addMethod(
    "aadhaar",
    function (value, element) {
      return this.optional(element) || /^\d{12}$/.test(value);
    },
    "Aadhaar must be 12 digits",
  );
  $.validator.addMethod(
    "indianPhone",
    function (value, element) {
      return this.optional(element) || /^[6-9]\d{9}$/.test(value);
    },
    "Phone number must be 10 digits and start with 6-9",
  );
  $.validator.addMethod(
    "validAge",
    function (value, element) {
      if (!element.checked) {
        return true;
      }
      let dob = $("#dob").val();
      if (!dob) {
        return true;
      }
      let birthDate = new Date(dob);
      let today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      let month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    },
    "Age confirmation does not match your DOB",
  );
  $("#form").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
        maxlength: 50,
        lettersOnly: true,
      },
      adhaar: {
        required: true,
        aadhaar: true,
      },
      phone: {
        required: true,
        indianPhone: true,
      },
      dob: {
        required: true,
      },
      age: {
        validAge: true,
      },
      gender: {
        required: true,
      },
      country: {
        required: true,
      },
      state: {
        required: true,
      },
      city: {
        required: true,
      },
      address: {
        required: true,
        minlength: 10,
        maxlength: 250,
      },
    },
    messages: {
      name: {
        required: "Name is required",
        minlength: "Name must contain at least 3 characters",
        maxlength: "Name must not exceed 50 characters",
      },
      adhaar: {
        required: "Aadhaar number is required",
        aadhaar: "Aadhaar must be 12 digits",
      },
      phone: {
        required: "Phone number is required",
        indianPhone: "Phone number must be 10 digits and start with 6-9",
      },
      dob: {
        required: "Please select date of birth",
      },
      age: {
        validAge: "Age confirmation does not match your DOB",
      },
      gender: {
        required: "Please select gender",
      },
      country: {
        required: "Please select country",
      },
      state: {
        required: "Please select state",
      },
      city: {
        required: "Please select city",
      },
      address: {
        required: "Address is required",
        minlength: "Address must be at least 10 characters",
        maxlength: "Address must not exceed 250 characters",
      },
    },
    errorElement: "small",
    errorClass: "error-message",
    errorPlacement: function (error, ele) {
      if (ele.attr("name") === "gender") {
        error.insertAfter($(".gender-options"));
      } else if (ele.attr("name") === "age") {
        error.insertAfter($(".age-input"));
      } else if (
        ele.attr("name") === "country" ||
        ele.attr("name") === "state" ||
        ele.attr("name") === "city"
      ) {
        error.insertAfter(ele.closest(".select-wrap"));
      } else {
        error.insertAfter(ele);
      }
    },
    submitHandler: function (form) {
      let user = {
        id: editId || Date.now(),
        name: $.trim($("#name").val()),
        adhaar: $("#adhaar").val(),
        phone: "+91 " + $("#phone").val(),
        age: $("#age").prop("checked"),
        dob: $("#dob").val(),
        gender: $("input[name='gender']:checked").val(),
        country: $("#country").val(),
        state: $("#state").val(),
        city: $("#city").val(),
        address: $.trim($("#address").val()),
      };

      if (editId === null) {
        formData.push(user);
      } else {
        formData = formData.map(function (oldUser) {
          if (oldUser.id === editId) {
            return user;
          }
          return oldUser;
        });
      }
      localStorage.setItem("usersData", JSON.stringify(formData));
      showUsers();
      form.reset();
      $("#city").html('<option value="">City</option>');
      editId = null;
      $("#form").validate().resetForm();
    },
  });

  $("#dob").on("change", function () {
    $("#age").valid();
  });

  $("#age").on("change", function () {
    $("#age").valid();
  });

  $("#form").on("reset", function () {
    editId = null;
    setTimeout(function () {
      $("#city").html('<option value="">City</option>');
      $("#form").validate().resetForm();
      $(".input-error").removeClass("input-error");
    }, 0);
  });
  table = $("#userTable").DataTable({
    paging: false,
    searching: false,
    info: false,
    ordering: false,
    columns: [
      { data: "name" },
      { data: "adhaar" },
      { data: "phone" },
      {
        data: "age",
        render: function (data) {
          return data ? "18 or above" : "below 18";
        },
      },
      { data: "dob" },
      { data: "gender" },
      { data: "country" },
      { data: "state" },
      { data: "city" },
      { data: "address" },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          return `<button type="button" class="editBtn" data-id="${row.id}">Edit</button><button type="button" class="deleteBtn" data-id="${row.id}">Delete</button>`;
        },
      },
    ],
  });
  showUsers();
});
$("#userTable").on("click", ".editBtn", function () {
  let id = Number($(this).data("id"));
  let user = formData.find(function (user) {
    return user.id === id;
  });
  if (!user) {
    return;
  }
  editId = id;
  $("#name").val(user.name);
  $("#adhaar").val(user.adhaar);
  $("#phone").val(user.phone.replace("+91 ", ""));
  $("#dob").val(user.dob);
  $("#age").prop("checked", user.age);
  $(`input[name="gender"][value="${user.gender}"]`).prop("checked", true);
  $("#country").val(user.country);
  $("#state").val(user.state);
  $("#city").html('<option value="">City</option>');

  if (cities[user.state]) {
    $.each(cities[user.state], function (index, city) {
      $("#city").append(`<option value="${city}">${city}</option>`);
    });
  }
  $("#city").val(user.city);
  $("#address").val(user.address);
  $("#form").validate().resetForm();
  $(".input-error").removeClass("input-error");
  $("html,body").animate(
    {
      scrollTop: $("#form").offset().top,
    },
    500,
  );
});
$("#userTable").on("click", ".deleteBtn", function () {
  let id = Number($(this).data("id"));
  if (!confirm("Are you sure you want to delete this user?")) {
    return;
  }
  formData = formData.filter(function (user) {
    return user.id !== id;
  });
  localStorage.setItem("usersData", JSON.stringify(formData));
  showUsers();
});
function showUsers() {
  table.clear();
  table.rows.add(formData);
  table.draw();
}

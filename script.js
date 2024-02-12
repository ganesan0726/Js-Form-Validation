const form = document.getElementById("form");
const userName = document.getElementById("username");
const emailId = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

String.prototype.isEmail = function () {
  return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
};

String.prototype.isAlpha = function () {
  return !!this.match(/^[a-zA-Z]*$/);
};

function checkRequiredField(inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      errorInputs(input, `${getName(input)} is Required`);
    } else {
      successInputs(input);
    }
  });
}

function getName(input) {
  // return input.id;
  return input.getAttribute("data-name");
}

function errorInputs(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const p = formGroup.querySelector("p");
  p.innerHTML = message;
}

function successInputs(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const p = formGroup.querySelector("p");
  p.innerHTML = "";
}

function checkLength(input, min, max) {
  const data = input.value.trim().length;
  if (data < min) {
    errorInputs(
      input,
      `${getName(input)} must be atleast greater than ${min} characters`,
    );
  } else if (data > max) {
    errorInputs(
      input,
      `${getName(input)} must be atleast lesser than ${max} characters`,
    );
  } else {
    successInputs(input);
  }
}

function checkConfirmPassword(password, password2) {
  if (password.value != password2.value) {
    errorInputs(password2, `${getName(password2)} doesn't match`);
  }
}

function checkEmail(email) {
  if (!email.value.trim().isEmail()) {
    errorInputs(email, `This is not a valid Email ID`);
  }
}

function checkAlpha(userName) {
    if(!userName.value.trim().isAlpha()) {
        errorInputs(userName, `${getName(userName)} is must be Alpahabet`);
    }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkRequiredField([userName, emailId, password, password2]);
  checkLength(userName, 5, 10);
  checkLength(password, 5, 5);
  checkConfirmPassword(password, password2);
  checkEmail(emailId);
  checkAlpha(userName);
});

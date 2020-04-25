const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.rname = !isEmpty(data.rname) ? data.rname : "";
  data.rcontact = !isEmpty(data.rcontact) ? data.rcontact : "";
  data.rcountry = !isEmpty(data.rcountry) ? data.rcountry : "";
  data.remail = !isEmpty(data.remail) ? data.remail : "";
  data.rpassword = !isEmpty(data.rpassword) ? data.rpassword : "";
  data.rpassword2 = !isEmpty(data.rpassword2) ? data.rpassword2 : "";
// Name checks
  if (Validator.isEmpty(data.rname)) {
    errors.rname = "Name field is required";
  }
// Contacts checks
if (Validator.isEmpty(data.rcontact)) {
  errors.rcontact = "Contact Number is required";
  }
// Country checks
if (Validator.isEmpty(data.rcountry)) {
  errors.rcountry = "Country is required";
  }
// Email checks
  if (Validator.isEmpty(data.remail)) {
    errors.remail = "Email field is required";
  } else if (!Validator.isEmail(data.remail)) {
    errors.remail = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.rpassword)) {
    errors.rpassword = "Password field is required";
  }
if (Validator.isEmpty(data.rpassword2)) {
    errors.rpassword2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.rpassword, { min: 6, max: 30 })) {
    errors.rpassword = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.rpassword, data.rpassword2)) {
    errors.rpassword2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
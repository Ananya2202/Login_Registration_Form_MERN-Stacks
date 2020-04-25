const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.remail = !isEmpty(data.remail) ? data.remail : "";
  data.rpassword = !isEmpty(data.rpassword) ? data.rpassword : "";
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
return {
    errors,
    isValid: isEmpty(errors)
  };
};
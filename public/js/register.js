function check(input) {
  if (input.value !== $('#password').val()) {
    input.setCustomValidity('Password Must be Matching.');
  } else {
    // input is valid -- reset the error message
    input.setCustomValidity('');
  }
}

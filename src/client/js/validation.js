// --- Sign Up Form Validation --- \\

$('#sign-up-form').validate({
  // Validation rules
  rules: {
    username: {
      required: true,
      minlength: 6
    },
    first_name: {
      required: true,
      minlength: 3,
      firstletter: true
    },
    last_name: {
      required: true,
      minlength: 3,
      firstletter: true
    },
    email: {
      email: true,
      required: true
    },
    password: {
      required: true
    }
  },

  // Validation error messages
  messages: {
    username: {
      required: 'Username field cannot be blank!',
      minlength: 'Your username must be at least 6 characters long'
    },
    first_name: {
      required: 'First Name field cannot be blank',
      minlength: 'First Name must be at least three characters',
      firstletter: 'First letter must be capitalized'
    },
    last_name: {
      required: 'Last Name field cannot be blank!',
      minlength: 'Last Name must be at least three characters',
      firstletter: 'First letter must be capitalized'
    },
    email: {
      required: 'Please enter a valid email address'
    },
    password: {
      required: 'Please enter a valid password'
    }
  },

  submitHandler: function(form) {
    form.submit();
  }
});

// Adds the method to check the first letter is capitalized
$.validator.addMethod('firstletter', function(value, element) {
  return this.optional(element) || /^[A-Z]/.test(value);
});

const inputEmail = document.querySelector('.input-email');
const emailError = document.querySelector('.email-err');
const inputPassword = document.querySelector('.input-password');
const passwordError = document.querySelector('.password-err');
const eyeIcon = document.getElementById('eye-icon');
const submitButton = document.getElementById('submit-btn');
const form = document.getElementById('form');

// function for active and inactive state of the submit button
const btnActive = () => {
  passwordError.style.display = 'none'
  submitButton.classList.add('focused')
};

const btnInActive = () => {
  passwordError.style.display = 'none'
  submitButton.classList.remove('focused')
};

// function to show/hide password
const togglePassword = () => {
  if(inputPassword.type === 'password') {
    inputPassword.type = 'text'
    eyeIcon.src = 'assets/icon/ph_eye.svg'
  } else {
    inputPassword.type = 'password'
    eyeIcon.src = 'assets/icon/mdi_eye-off-outline.svg'
  }
};

// function to check password strength
function validatePassword() {
  // check password strength
  const minPasswordLength = 8;
  const password = inputPassword.value;
  passwordError.textContent = ''
  passwordError.style.color = 'red'
  passwordError.style.fontSize = '12px'
  if(!password){
    passwordError.style.display = 'none'
  } else {
    passwordError.style.display = 'block'
  }
  if(password.length < minPasswordLength || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+=[\]{};':"\\|,.<>?]/.test(password)) {
    passwordError.textContent = `password must contain lowercase and uppercase letter, number, special character and minimum of ${minPasswordLength} characters`
    return false;
  }
  passwordError.textContent = 'Password is strong'
  passwordError.style.color = 'green'
  return true;
}

// function to validate email
function validateEmail() {
  const email = inputEmail.value;
  emailError.textContent = ''
  emailError.style.color = 'red'
  emailError.style.fontSize = '12px'
  if(!email){
    emailError.style.display = 'none'
  } else {
    emailError.style.display = 'block'
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(email)) {
    emailError.textContent = 'Invalid email address'
    return false;
  }
  emailError.textContent = 'Email is valid'
  emailError.style.color = 'green'
  return true;
}

// adding event listener to components
eyeIcon.addEventListener('click', togglePassword);
submitButton.addEventListener('click', btnActive);
inputEmail.addEventListener('focus', btnActive);
inputEmail.addEventListener('blur', btnInActive);
inputPassword.addEventListener('focus', btnActive);
inputPassword.addEventListener('blur', btnInActive);
inputPassword.addEventListener('input', validatePassword)
inputEmail.addEventListener('input', validateEmail)

// handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;
  // check email and password
  if(!inputEmail.value || !inputPassword.value) {
    passwordError.textContent = 'email or password should not be empty'
    passwordError.style.color = 'red'
    passwordError.style.display = 'block'
    isValid = false
    return
  }
  passwordError.style.display = 'none'
  if(!validateEmail() || !validatePassword()) {
    passwordError.textContent = 'invalid email or password'
    passwordError.style.color = 'red'
    passwordError.style.display = 'block'
    isValid = false
    return
  }
  
  if(isValid) {
    // submit the form
    // fetch login data
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({password})
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   if(data.success) {
    //     passwordError.textContent = 'password reset successful'
    //     you can redirect to password-reset-successful-page
    //   } else {
    //     passwordError.textContent = 'login error' + data.error
    //   }
    // })
    // .catch((error) => {
    //   console.error('Error', error)
    // })
  window.location.href = 'pages/dashboards/superadmin_dashboard_overview.html?email=' + inputEmail.value;
  return
  } else {
    console.log('error occured');
    return
  }
});

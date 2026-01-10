// Get elements
const inputPassword = document.querySelector('.input-password');
const inputPassword2 = document.querySelector('.input-password2');
const passwordError = document.querySelector('.password-err');
const eyeIcon = document.getElementById('eye-icon');
const eyeIcon2 = document.getElementById('eye-icon2');
const submitButton = document.getElementById('submit-btn');
const form = document.getElementById('form');

// Function to toggle password visibility
const togglePassword = (input, icon) => {
  if (input.type === 'password') {
    input.type = 'text';
     icon.src = '../assets/icon/ph_eye.svg'
  } else {
    input.type = 'password';
    icon.src = '../assets/icon/mdi_eye-off-outline.svg'
  }
};

// Function to update submit button state
const updateSubmitButtonState = (isActive) => {
  passwordError.style.display = 'none';
  if (isActive) {
    submitButton.classList.add('focused');
  } else {
    submitButton.classList.remove('focused');
  }
};

// Function to validate password
const validatePassword = () => {
  const minPasswordLength = 8;
  const password = inputPassword2.value;
  const checks = [
    {
      id: 'icon1',
      condition: password.length >= minPasswordLength && password.length <= 20,
      message: 'Password length should be between 8 and 20 characters'
    },
    {
      id: 'icon2',
      condition: /[a-z]/.test(password) && /[A-Z]/.test(password),
      message: 'Password should contain at least one uppercase and lowercase letter'
    },
    {
      id: 'icon3',
      condition: /[0-9]/.test(password),
      message: 'Password should contain at least one number'
    },
    {
      id: 'icon4',
      condition: /[!@#$%^&*()_+=[\]{};':"\\|,.<>?]/.test(password),
      message: 'Password should contain at least one special character'
    }
  ];

  let isValid = true;
  checks.forEach(check => {
    const icon = document.getElementById(check.id);
    icon.style.display = password ? 'block' : 'none';
    icon.src = check.condition ? '../assets/icon/checker.svg' : '../assets/icon/cancel.svg';
    icon.style.marginLeft = '-5px'
    if (!check.condition) {
      isValid = false;
    }
  });

  if (!password) {
    passwordError.style.display = 'none';
  } else {
    passwordError.style.display = 'block';
    if (isValid) {
      passwordError.textContent = 'Password is strong';
      passwordError.style.color = 'green';
    } else {
      passwordError.textContent = 'Password must contain lowercase and uppercase letter, number, special character and minimum of 8 characters';
      passwordError.style.color = 'red';
      passwordError.style.fontSize = '12px';
      passwordError.style.marginTop = '-20px';
      passwordError.style.marginBottom = '5px';
    }
  }

  return isValid;
};

// Add event listeners
eyeIcon.addEventListener('click', () => togglePassword(inputPassword, eyeIcon));
eyeIcon2.addEventListener('click', () => togglePassword(inputPassword2, eyeIcon2));

inputPassword.addEventListener('focus', () => updateSubmitButtonState(true));
inputPassword.addEventListener('blur', () => updateSubmitButtonState(false));

inputPassword2.addEventListener('focus', () => updateSubmitButtonState(true));
inputPassword2.addEventListener('blur', () => updateSubmitButtonState(false));
inputPassword2.addEventListener('input', validatePassword);

submitButton.addEventListener('click', () => updateSubmitButtonState(true));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!inputPassword.value && !inputPassword2.value) {
    passwordError.textContent = 'password should not be empty';
    passwordError.style.color = 'red';
    passwordError.style.display = 'block';
    return;
  }
  if (!validatePassword()) {
    passwordError.textContent = 'invalid password';
    passwordError.style.color = 'red';
    passwordError.style.display = 'block';
    return;
  }
  // redirect to password page
  window.location.href = 'passwordsuccess.html?password=' + inputPassword.value;
});
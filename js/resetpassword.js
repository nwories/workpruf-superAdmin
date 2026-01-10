
const inputEmail = document.querySelector('.input-email');
const emailError = document.querySelector('.email-err');
const submitButton = document.getElementById('submit-btn');
const form = document.getElementById('form');

// function for active and inactive state of the submit button
const btnActive = () => {
  emailError.style.display = 'none'
  submitButton.classList.add('focused')
};

const btnInActive = () => {
  emailError.style.display = 'none'
  submitButton.classList.remove('focused')
};

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
submitButton.addEventListener('click', btnActive);
inputEmail.addEventListener('focus', btnActive);
inputEmail.addEventListener('blur', btnInActive);
inputEmail.addEventListener('input', validateEmail)

// handle form submission
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   // check email
//   if(!inputEmail.value) {
//     emailError.textContent = 'email should not be empty'
//     emailError.style.color = 'red'
//     emailError.style.display = 'block'
//     return
//   }
//   emailError.style.display = 'none'
//   if(!validateEmail()) {
//     emailError.textContent = 'invalid email'
//     emailError.style.color = 'red'
//     emailError.style.display = 'block'
//     return
//   }
//   // send email to server for validation
//   fetch('/api/check-email', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: inputEmail.value
//     })
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     if(data.success) {
//       // redirect to password page
//       window.location.href = '/password.html?email=' + inputEmail.value;
//     } else {
//       emailError.textContent = 'email not found'
//       emailError.style.color = 'red'
//       emailError.style.display = 'block'
//     }
//   })
//   .catch((error) => {
//     console.error('Error', error)
//   })
// });

// handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // check email
  if(!inputEmail.value) {
    emailError.textContent = 'email should not be empty'
    emailError.style.color = 'red'
    emailError.style.display = 'block'
    return
  }
  emailError.style.display = 'none'
  if(!validateEmail()) {
    emailError.textContent = 'invalid email'
    emailError.style.color = 'red'
    emailError.style.display = 'block'
    return
  }
  // redirect to password page
  window.location.href = 'confirmpassword.html?email=' + inputEmail.value;
});

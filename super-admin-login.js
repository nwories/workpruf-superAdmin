document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const toggle = document.getElementById('togglePassword');
  const resetLink = document.getElementById('resetPassword');
  const errorMsg = document.getElementById('errorMsg');
  const successMsg = document.getElementById('successMsg');

  toggle.addEventListener('click', () => {
    const t = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', t);
    toggle.innerHTML = t === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    toggle.setAttribute('aria-label', t === 'password' ? 'Show password' : 'Hide password');
  });

  resetLink.addEventListener('click', function(e) {
    e.preventDefault();
    const em = email.value.trim();
    if (!em) return showError('Enter your email first to reset password');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return showError('Enter a valid email to reset password');
    showSuccess('Password reset email sent (to your inbox)');
  });

  function showError(msg) {
    errorMsg.hidden = false;
    successMsg.hidden = true;
    errorMsg.textContent = msg;
  }

  function showSuccess(msg) {
    successMsg.hidden = false;
    errorMsg.hidden = true;
    successMsg.textContent = msg;
  }

//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const em = email.value.trim();
//     const pw = password.value;
//     if (!em) return showError('Email is required');
//     if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return showError('Enter a valid email');
//     if (!pw || pw.length < 8) return showError('Password must be at least 8 characters');
//     window.location.href = 'https://workpruf-bk.onrender.com/api-docs?email=' + encodeURIComponent(em);
//   });

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const em = email.value.trim();
  const pw = password.value;
  // const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/;
  if (!em) return showError('Email is required');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return showError('Enter a valid email');
  if (!pwRegex.test(pw)) {
    return showError('Password must be 8-20 chars, with upper, lower, number & special char');
  }

  fetch('https://workpruf-bk.onrender.com/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: em, password: pw })
  })
  .then(res => res.json())
  // .then(data => {
  //   if (data.token) {
  //     // Store token (e.g., in localStorage) and redirect
  //     localStorage.setItem('token', data.token);
  //     window.location.href = 'pages/dashboards/superadmin_dashboard_overview.html';
  //   } else {
  //     showError(data.message || 'Invalid credentials');
  //   }
  // })
  // .catch(err => {
  //   showError('Error logging in. Try again.');
  //   console.error(err);
  // });
//   .then(data => {
//   console.log('Response data:', data);
//   if (data.token) {
//     console.log('Token:', data.token);
//     localStorage.setItem('token', data.token);
//     console.log('Stored token:', localStorage.getItem('token')); // check if stored
//     window.location.href = 'pages/dashboards/superadmin_dashboard_overview.html';
//   } else {
//     showError(data.message || 'Invalid credentials');
//   }
// })
.then(data => {
  if (data.user) {
    showSuccess('Super Admin Login successful!');
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'pages/dashboards/superadmin_dashboard_overview.html';
    }, 1500); // waits 1.5s before redirecting
  } else {
    showError(data.message || 'Login failed');
  }
})
});
});
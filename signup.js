document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const em = document.getElementById('signupEmail').value.trim();
      const pw = document.getElementById('signupPassword').value;
      const pwConfirm = document.getElementById('signupPasswordConfirm').value;
      const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

      if (!em) return showError('Email is required', 'signupError');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return showError('Enter a valid email', 'signupError');
      if (!pwRegex.test(pw)) {
        return showError('Password must be 8-20 chars, with upper, lower, number & special char', 'signupError');
      }
      if (pw !== pwConfirm) return showError('Passwords do not match', 'signupError');

      fetch('https://workpruf-bk.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, password: pw })
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          showSuccess(data.message, 'signupSuccess');
          setTimeout(() => window.location.href = 'login.html', 2000);
        } else {
          showError(data.error || 'Error signing up', 'signupError');
        }
      })
      .catch(err => {
        showError('Error signing up. Try again.', 'signupError');
        console.error(err);
      });
    });
  }

  function showError(msg, id = 'errorMsg') {
    const el = document.getElementById(id);
    if (el) {
      el.hidden = false;
      el.style.color = 'red';
      el.textContent = msg;
    }
  }

  function showSuccess(msg, id = 'successMsg') {
    const el = document.getElementById(id);
    if (el) {
      el.hidden = false;
      el.style.color = 'green';
      el.textContent = msg;
    }
  }
});
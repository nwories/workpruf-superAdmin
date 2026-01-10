// making the dashboard elements clickable
const buttons = document.querySelectorAll('.menu-item .btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from other buttons
    buttons.forEach(otherBtn => {
      if (otherBtn !== this) {
        otherBtn.classList.remove('active');
        otherBtn.nextElementSibling.classList.add('closed');
      }
    });
    
    // Toggle current button
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('closed');
  });
});

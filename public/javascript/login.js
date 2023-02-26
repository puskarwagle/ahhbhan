const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = form.elements.username.value;
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/index';
    } else {
      alert('Username already taken');
    }
  })
  .catch(error => {
    console.error('Error logging in:', error);
    alert('Error logging in');
  });
});

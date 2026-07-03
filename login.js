// Login + password-eye toggle

(function () {
  const LOGIN_USERS_KEY = 'fb_users';
  const SESSION_KEY = 'fb_session_user';

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(LOGIN_USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function setSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function togglePasswordVisibility(input, eyeBtn) {
    if (!input || !eyeBtn) return;

    eyeBtn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      eyeBtn.setAttribute('aria-pressed', String(isPassword));

      // visual label (optional)
      eyeBtn.querySelector('i')?.classList.toggle('fa-eye-slash', isPassword);
      eyeBtn.querySelector('i')?.classList.toggle('fa-eye', !isPassword);
    });
  }

  // wire up password toggle (elements are added in index.html)
  const passwordInput = document.querySelector('.rightbox .password');
  const eyeBtn = document.querySelector('#loginPasswordEye');
  togglePasswordVisibility(passwordInput, eyeBtn);

  const loginBtn = document.querySelector('.loginbtn');
  loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.querySelector('.rightbox .email').value.trim();
    const password = document.querySelector('.rightbox .password').value.trim();

    if (!email || !password) {
      alert('All fields are required');
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      alert('Invalid email or password');
      return;
    }

    setSession(user);
    window.location.href = './dashboard.html';
  });
})();


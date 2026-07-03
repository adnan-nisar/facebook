
// Registration + password-eye toggle

(function () {
  const LOGIN_USERS_KEY = 'fb_users';

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(LOGIN_USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function setUsers(users) {
    localStorage.setItem(LOGIN_USERS_KEY, JSON.stringify(users));
  }

  window.toggleText = function toggleText(e) {
    e.preventDefault();

    let moreText = document.getElementById('moreText');
    if (!moreText) return;

    if (moreText.style.display === 'none' || moreText.style.display === '') {
      moreText.style.display = 'block';
      e.target.innerText = 'Show less';
    } else {
      moreText.style.display = 'none';
      e.target.innerText = 'Learn more.';
    }
  };

  function togglePasswordVisibility(input, eyeBtn) {
    if (!input || !eyeBtn) return;

    eyeBtn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      eyeBtn.setAttribute('aria-pressed', String(isPassword));

      eyeBtn.querySelector('i')?.classList.toggle('fa-eye-slash', isPassword);
      eyeBtn.querySelector('i')?.classList.toggle('fa-eye', !isPassword);
    });
  }

  const passwordInput = document.querySelector('.passwords .password');
  const eyeBtn = document.querySelector('#registerPasswordEye');
  togglePasswordVisibility(passwordInput, eyeBtn);

  function validateSignup() {
    const firstName = document.querySelector('input[placeholder="First name"]');
    const surname = document.querySelector('input[placeholder="Surname"]');

    const email = document.querySelector('.passwords .email')?.value.trim();
    const password = document.querySelector('.passwords .password')?.value.trim();

    if (!firstName?.value.trim() || !surname?.value.trim() || !email || !password) {
      alert('All fields are required');
      return false;
    }

    const gender = document.querySelector('input[name="sex"]:checked');
    if (!gender) {
      alert('All fields are required');
      return false;
    }

    return true;
  }

  document.querySelector('.signupbtn')?.addEventListener('click', (e) => {
    e.preventDefault();

    if (!validateSignup()) return;

    const firstName = document.querySelector('input[placeholder="First name"]').value.trim();
    const surname = document.querySelector('input[placeholder="Surname"]').value.trim();
    const email = document.querySelector('.passwords .email').value.trim();
    const password = document.querySelector('.passwords .password').value.trim();

    const users = getUsers();

    const exists = users.some((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert('User already exists with this email');
      return;
    }

    const user = {
      id: crypto?.randomUUID?.() || String(Date.now()),
      fullName: `${firstName} ${surname}`.trim(),
      email,
      password,
    };

    users.push(user);
    setUsers(users);

    // redirect to login
    window.location.href = './index.html';
  });
})();


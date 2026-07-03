// Dashboard: render posts, create posts, and logout
(function () {
  const SESSION_KEY = 'fb_session_user';
  const USERS_KEY = 'fb_users';
  const POSTS_KEY = 'fb_posts';

  const $ = (sel) => document.querySelector(sel);

  function getSessionUser() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  function requireLogin() {
    const user = getSessionUser();
    if (!user) {
      window.location.href = './index.html';
      return null;
    }
    return user;
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function getPosts() {
    try {
      return JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function setPosts(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '<')
      .replaceAll('>', '>')
      .replaceAll('"', '"')
      .replaceAll("'", '&#039;');
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleString();
  }

  function renderPosts() {
    const postsContainer = $('.posts');
    if (!postsContainer) return;

    const posts = getPosts().slice().sort((a, b) => b.createdAt - a.createdAt);

    if (!posts.length) {
      postsContainer.innerHTML = '<p class="text-muted">No posts yet. Be the first to post!</p>';
      return;
    }

    postsContainer.innerHTML = posts
      .map((p) => {
        const name = escapeHtml(p.fullName || 'User');
        const content = escapeHtml(p.content || '');
        const time = escapeHtml(formatTime(p.createdAt));
        return `
          <div class="post-card mb-3 p-3 bg-white rounded shadow-sm">
            <div class="d-flex align-items-center gap-2">
              <img src="./518349696_122110234658933174_4096433951976627231_n.jpg" alt="" height="40" style="border-radius:50%" />
              <div>
                <div class="fw-bold">${name}</div>
                <div class="text-muted" style="font-size:12px">${time}</div>
              </div>
            </div>
            <div class="mt-2">${content}</div>
          </div>
        `;
      })
      .join('');
  }

  function initPostComposer() {
    const composerText = $('#postContent');
    const postBtn = $('#createPostBtn');

    if (!composerText || !postBtn) return;

    postBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const user = getSessionUser();
      if (!user) return;

      const content = composerText.value.trim();
      if (!content) {
        alert('Write something to post');
        return;
      }

      const posts = getPosts();
      posts.push({
        id: crypto?.randomUUID?.() || String(Date.now()),
        fullName: user.fullName || 'User',
        email: user.email,
        content,
        createdAt: Date.now(),
      });

      setPosts(posts);
      composerText.value = '';
      renderPosts();
    });
  }

  function initLogout() {
    const logoutBtn = $('#logoutBtn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem(SESSION_KEY);
      window.location.href = './index.html';
    });
  }

  // boot
  const user = requireLogin();
  if (!user) return;

  initLogout();
  initPostComposer();
  renderPosts();
})();


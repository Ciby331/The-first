// script.js
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-btn');
  const adminButton = document.getElementById('admin-btn');
  const authModal = document.getElementById('auth-modal');
  const adminModal = document.getElementById('admin-modal');
  const authForm = document.getElementById('auth-form');
  const adminForm = document.getElementById('admin-form');
  const challengesGrid = document.getElementById('challenges-grid');

  // Toggle Modals
  loginButton.addEventListener('click', () => {
    authModal.classList.toggle('hidden');
  });

  adminButton.addEventListener('click', () => {
    adminModal.classList.toggle('hidden');
  });

  // Handle Auth Form
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send data to server
    const response = await fetch('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    alert(result.message);
    authModal.classList.add('hidden');
  });

  // Handle Admin Form
  adminForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const challengeName = document.getElementById('challenge-name').value;
    const challengeDescription = document.getElementById('challenge-description').value;

    // Send data to server
    const response = await fetch('/admin/add-challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: challengeName, description: challengeDescription }),
    });

    const result = await response.json();
    alert(result.message);
    adminModal.classList.add('hidden');
    loadChallenges();
  });

  // Load Challenges
  const loadChallenges = async () => {
    const response = await fetch('/challenges');
    const challenges = await response.json();

    challengesGrid.innerHTML = '';
    challenges.forEach(challenge => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${challenge.image}" alt="${challenge.name}" />
        <div class="date">${challenge.date}</div>
        <div class="score">${challenge.description}</div>
      `;
      challengesGrid.appendChild(card);
    });
  };

  loadChallenges();
});

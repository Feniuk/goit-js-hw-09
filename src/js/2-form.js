const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', () => {
  const userEmail = form.elements.email.value.trim();
  const userMessage = form.elements.message.value.trim();

  const obj = {
    email: userEmail,
    message: userMessage,
  };

  saveToLS(STORAGE_KEY, obj);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const userEmail = form.elements.email.value;
  const userMessage = form.elements.message.value;

  if (!userEmail || !userMessage) {
    alert('Будь ласка, заповніть обидва елементи форми.');
    return;
  }

  const data = loadFromLS(STORAGE_KEY) || {};
  console.log(data);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

function loadFromLS(key = 'empty') {
  const data = localStorage.getItem(key);
  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function restoreData() {
  const data = loadFromLS(STORAGE_KEY) || {};

  const trimmedEmail = data.email || '';
  const trimmedMessage = data.message || '';

  form.elements.email.value = trimmedEmail;
  form.elements.message.value = trimmedMessage;
}

restoreData();

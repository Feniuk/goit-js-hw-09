const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

let formData = {
    email: '',
    message: '',
};

form.addEventListener('input', () => {
    const userEmail = form.elements.email.value.trim();
    const userMessage = form.elements.message.value.trim();

    formData = {
        email: userEmail,
        message: userMessage,
    };

    saveToLS(STORAGE_KEY, formData);
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const userEmail = formData.email.trim(); 
    const userMessage = formData.message.trim(); 

    if (!userEmail || !userMessage) {
        alert('Будь ласка, заповніть обидва елементи форми.');
        return;
    }

    console.log(formData);

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

    formData = {
        email: data.email || '',
        message: data.message || '',
    };

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
}

restoreData();

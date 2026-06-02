function changeScreen(screenId) {
    document.querySelectorAll('.screen').forEach(scr => scr.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.add('active');
}

setTimeout(() => {
    changeScreen('screen-welcome');
}, 1500);

function selectAccessibility(mode) {
    const phone = document.getElementById('phoneContainer');
    if (mode === 'high') {
        phone.classList.add('high-contrast-mode');
    } else {
        phone.classList.remove('high-contrast-mode');
    }
    changeScreen('screen-gate');
}

function selectRadio(element, radioId) {
    document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById(radioId).checked = true;
}

function doLogin() {
    document.getElementById('dynamic-user-name').innerText = "Надя Йотова";
    changeScreen('screen-dashboard');
}

function validatePasswordStrength() {
    const pass = document.getElementById('reg-password').value;
    const bar = document.getElementById('strength-meter-bar');
    const txt = document.getElementById('strength-txt');
    
    if (pass.length === 0) {
        bar.style.width = '0%';
        txt.innerText = 'Сила: Още няма';
        return;
    }

    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    
    if (score <= 1) {
        bar.style.width = '33%';
        bar.style.backgroundColor = '#E53E3E';
        txt.innerText = 'Сила: Слаба';
        txt.style.color = '#E53E3E';
    } else if (score === 2) {
        bar.style.width = '66%';
        bar.style.backgroundColor = '#DD6B20';
        txt.innerText = 'Сила: Средна';
        txt.style.color = '#DD6B20';
    } else {
        bar.style.width = '100%';
        bar.style.backgroundColor = '#38A169';
        txt.innerText = 'Сила: Силна';
        txt.style.color = '#38A169';
    }
}

function submitRegistration() {
    let hasError = false;
    const name = document.getElementById('reg-name');
    const email = document.getElementById('reg-email');
    const pass = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm');

    if (name.value.trim().length < 4) {
        document.getElementById('err-name').style.display = 'block';
        name.style.borderColor = '#E53E3E';
        hasError = true;
    } else {
        document.getElementById('err-name').style.display = 'none';
        name.style.borderColor = '#D5E1F2';
    }

    if (!email.value.includes('@') || email.value.length < 5) {
        document.getElementById('err-email').style.display = 'block';
        email.style.borderColor = '#E53E3E';
        hasError = true;
    } else {
        document.getElementById('err-email').style.display = 'none';
        email.style.borderColor = '#D5E1F2';
    }

    if (pass.value.length < 6) {
        document.getElementById('err-pass').style.display = 'block';
        pass.style.borderColor = '#E53E3E';
        hasError = true;
    } else {
        document.getElementById('err-pass').style.display = 'none';
        pass.style.borderColor = '#D5E1F2';
    }

    if (pass.value !== confirm.value || confirm.value === '') {
        document.getElementById('err-confirm').style.display = 'block';
        confirm.style.borderColor = '#E53E3E';
        hasError = true;
    } else {
        document.getElementById('err-confirm').style.display = 'none';
        confirm.style.borderColor = '#D5E1F2';
    }

    if (!hasError) {
        alert("🎉 Успешна регистрация на акаунт!");
        document.getElementById('dynamic-user-name').innerText = name.value.split(' ')[0];
        changeScreen('screen-dashboard');
    }
}

function triggerOCR() {
    alert("📸 Стартиране на Камерата и OCR сканиране на опаковката...");
    document.getElementById('new-med-name').value = "Конкор (Concor)";
    document.getElementById('new-med-dose').value = "5 mg";
}

function saveNewMedicine() {
    const name = document.getElementById('new-med-name').value;
    const dose = document.getElementById('new-med-dose').value;
    const time = document.getElementById('new-med-time').value;

    if (!name || !dose) {
        alert("Моля, попълнете или сканирайте данните за лекарството.");
        return;
    }

    const tbody = document.getElementById('med-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td><strong>${name}</strong></td><td>${dose}</td><td>${time} ч.</td>`;
    tbody.appendChild(newRow);

    alert("Лекарството е проверено за фармацевтични взаимодействия и е добавено успешно!");
    changeScreen('screen-medicines');
    
    document.getElementById('new-med-name').value = '';
    document.getElementById('new-med-dose').value = '';
}

let countdownInterval;
function openSOSModal() {
    document.getElementById('sosModal').style.display = 'flex';
    let secondsLeft = 10;
    document.getElementById('sos-countdown').innerText = secondsLeft;
    
    countdownInterval = setInterval(() => {
        secondsLeft--;
        document.getElementById('sos-countdown').innerText = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            alert("🚨 Автоматично Спешно повикване към 112 е изпратено! Изпратени са координати на Вашите близки.");
            closeSOSModal();
        }
    }, 1000);
}

function closeSOSModal() {
    clearInterval(countdownInterval);
    document.getElementById('sosModal').style.display = 'none';
}

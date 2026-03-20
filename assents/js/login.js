// assents/js/login.js
function initLogin() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value.trim();
        
        if (user === 'casamenteiro' && pass === '12345678') {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'convidados.html';
        } else {
            alert('Usuário ou senha incorretos. Use: casamenteiro / 12345678');
        }
    });
}
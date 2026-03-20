// assents/js/main.js
// APENAS ORQUESTRADOR - puxa as funções dos outros arquivos
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.toLowerCase();

    // HOME
    if (path.includes('index') || path === '/' || path.endsWith('html') && !path.includes('login') && !path.includes('convidados')) {
        if (typeof initPix === 'function') initPix();
        if (typeof renderGifts === 'function') renderGifts();
    }

    // LOGIN
    if (path.includes('login')) {
        if (typeof initLogin === 'function') initLogin();
    }

    // CONVIDADOS
    if (path.includes('convidados')) {
        if (typeof initConvidados === 'function') initConvidados();
    }
});
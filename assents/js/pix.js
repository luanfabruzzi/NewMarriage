// assents/js/pix.js
let gifts = []; // VAZIO - casal pode adicionar depois se quiser expandir

const PIX_KEY = "000.000.000-00"; // CHAVE PIX - altere depois

function initPix() {
    // Renderiza cards vazios iniciais (estrutura do protótipo)
    renderGifts();
}

function renderGifts() {
    const grid = document.getElementById('gifts-grid');
    grid.innerHTML = `
        <div class="gift-card card bg-white p-8 text-center cursor-pointer" onclick="openPixModal(0)">
            <div class="h-52 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center text-slate-400">
            <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQU7bm6k51s8Cr5_rlvW71GtT3dQGcGUfVM0A5CJIVtFsMQmy5Nwhl_6AxYSjREQE3GzwOlHOLa29kJaRHyaWB2f2Fy7IyM8eh2kquc07drKF8ohDWn6BSmIec" class="w-full h-full object-cover" style="height: 120px;"></div>
            <h4 class="font-medium text-xl mb-2">Fogão</h4>
            <p class="text-slate-500 text-sm mb-6">R$ 2.500,00</p>
            <p class="text-slate-500 text-sm mb-6">Um fogão para preparar refeições deliciosas juntos!</p>
        </div>
        
        <div class="gift-card card bg-white p-8 text-center cursor-pointer" onclick="openPixModal(1)">
            <div class="h-52 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center text-slate-400">
            <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSGmUEjp9mIg-09t8SCMEJfXL7kN0EMWkzMDTO3eCeUnGLcNggQXnDww-Liieb2R-y_LoPeWDacrHYbTPMgXgrXKUnhtH7VICG8uiykihmjCjfgwY3I8eOYeg" class="w-70 h-140 object-cover" style="height: 120px;"></div>
            <h4 class="font-medium text-xl mb-2">Geladeira</h4>
            <p class="text-slate-500 text-sm mb-6">R$ 2.500,00</p>
            <p class="text-slate-500 text-sm mb-6">Ajude a gente a guardar a nossa comida!</p>
        </div>
    `;
}

function openPixModal(index) {
    const modal = document.getElementById('pix-modal');
    modal.classList.remove('hidden');
    document.getElementById('modal-pix-key').textContent = PIX_KEY;
    document.getElementById('modal-gift-name').textContent = `Presente ${index + 1}`;
}

function closePixModal() {
    document.getElementById('pix-modal').classList.add('hidden');
}

function confirmGiftPaid() {
    alert('✅ Pagamento confirmado! Este presente foi marcado como pago e não pode mais ser acessado.');
    closePixModal();
    // Aqui poderia desabilitar o card específico (localStorage para persistência)
}

function copyPixKey() {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
        alert('Chave PIX copiada!');
    });
}
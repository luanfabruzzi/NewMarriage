// assets/js/funcaoDeInteracao.js
let grupos = [];

function initConvidados() {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
        return;
    }
    
    // Carrega do localStorage (persistência no protótipo)
    const saved = localStorage.getItem('gruposConvidados');
    if (saved) grupos = JSON.parse(saved);
    
    renderGroups();
    updateDashboard();
}

function addNewGroup() {
    const input = document.getElementById('new-group-name');
    const nome = input.value.trim();
    if (!nome) return;
    
    grupos.push({
        nome: nome,
        membros: []
    });
    
    input.value = '';
    saveAndRender();
}

function addMemberToGroup(groupIndex) {
    const nome = prompt('Nome do convidado:');
    if (!nome) return;
    
    grupos[groupIndex].membros.push({
        nome: nome,
        status: null // null = não confirmado
    });
    
    saveAndRender();
}

function toggleStatus(groupIndex, memberIndex) {
    const membro = grupos[groupIndex].membros[memberIndex];
    if (membro.status === 'veio') {
        membro.status = 'faltou';
    } else if (membro.status === 'faltou') {
        membro.status = null;
    } else {
        membro.status = 'veio';
    }
    saveAndRender();
}
/**

 * @param {number} groupIndex - O índice do grupo no array 'grupos'.
 * @param {number} memberIndex - O índice do membro a ser excluído no array 'membros' do grupo.
 */
function deleteGuest(groupIndex, memberIndex) {
    // Remove 1 elemento a partir da posição 'memberIndex' no array de membros do grupo especificado
    grupos[groupIndex].membros.splice(memberIndex, 1);
    
    // Salva as alterações no localStorage e atualiza a interface
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('gruposConvidados', JSON.stringify(grupos));
    renderGroups();
    updateDashboard();
}

function renderGroups() {
    const container = document.getElementById('groups-container');
    container.innerHTML = '';
    
    grupos.forEach((grupo, gIndex) => {
        let membrosHTML = '';
        grupo.membros.forEach((membro, mIndex) => {
            const statusClass = membro.status === 'veio' ? 'veio' : membro.status === 'faltou' ? 'faltou' : '';
            const statusText = membro.status === 'veio' ? '✓ Veio' : membro.status === 'faltou' ? '✕ Faltou' : 'Confirmar';
            
            membrosHTML += `
                <div class="member flex justify-between items-center px-6 py-4 border border-slate-200 rounded-2xl mb-3 ${statusClass}">
                    <!-- Área clicável para alterar o status -->
                    <div onclick="toggleStatus(${gIndex}, ${mIndex})" class="flex justify-between items-center flex-grow cursor-pointer">
                        <span class="font-medium">${membro.nome}</span>
                        <span class="text-xs px-4 py-1 rounded-full ${membro.status === 'veio' ? 'bg-emerald-100 text-emerald-600' : membro.status === 'faltou' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}">
                            ${statusText}
                        </span>
                    </div>
                    <!-- Botão de Excluir -->
                    <button onclick="event.stopPropagation(); deleteGuest(${gIndex}, ${mIndex})" 
                            class="ml-4 p-1 text-red-500 hover:text-red-700 font-bold text-xl leading-none" 
                            title="Excluir convidado">
                        &times;
                    </button>
                </div>`;
        });
        
        const groupHTML = `
            <div class="group-card bg-white p-8">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-medium">${grupo.nome}</h3>
                    <button onclick="addMemberToGroup(${gIndex})" 
                            class="px-5 py-2 text-xs border border-[var(--cor-principal)] text-[var(--cor-principal)] rounded-2xl hover:bg-[var(--cor-principal)] hover:text-white transition">
                        + ADICIONAR CONVIDADO
                    </button>
                </div>
                <div class="space-y-2">
                    ${membrosHTML || '<p class="text-slate-400 italic py-4">Nenhum convidado ainda</p>'}
                </div>
            </div>`;
        
        container.innerHTML += groupHTML;
    });
}

function updateDashboard() {
    let total = 0;
    let veio = 0;
    let faltou = 0;
    
    grupos.forEach(grupo => {
        total += grupo.membros.length;
        grupo.membros.forEach(m => {
            if (m.status === 'veio') veio++;
            if (m.status === 'faltou') faltou++;
        });
    });
    
    document.getElementById('total-convidados').textContent = total;
    document.getElementById('veio-count').textContent = veio;
    document.getElementById('faltou-count').textContent = faltou;
}
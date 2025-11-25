/* ====================================
   JAVASCRIPT ESPECÍFICO - PÁGINA PROJETOS
   Sistema de filtragem, busca e interação
   ===================================== */

// ====================================
// VARIÁVEIS DA PÁGINA PROJETOS
// ====================================
let projetosCarregados = [];
let filtroAtual = 'todos';
let buscaAtual = '';
let paginaAtual = 1;
const projetosPorPagina = 6;

// ====================================
// DADOS DOS PROJETOS (SIMULADOS)
// ====================================
const dadosProjetos = [
    {
        id: 1,
        titulo: "Alimentação Solidária",
        categoria: "alimentacao",
        descricao: "Programa de distribuição de refeições para famílias em situação de vulnerabilidade social.",
        imagem: "projeto-alimentacao.jpg",
        progresso: 75,
        meta: 50000,
        arrecadado: 37500,
        voluntarios: 45,
        beneficiarios: 200,
        localizacao: "São Paulo, SP",
        urgente: true,
        dataInicio: "2024-01-15",
        tags: ["alimentação", "vulnerabilidade", "urgente"],
        necessidades: ["Voluntários para distribuição", "Doações de alimentos", "Apoio logístico"],
        impacto: "200 famílias atendidas mensalmente",
        responsavel: "Maria Silva",
        contato: "maria@esperancasolidaria.org.br"
    },
    {
        id: 2,
        titulo: "Educação Digital Inclusiva",
        categoria: "educacao",
        descricao: "Capacitação em tecnologia para jovens de comunidades periféricas.",
        imagem: "projeto-educacao.jpg",
        progresso: 60,
        meta: 30000,
        arrecadado: 18000,
        voluntarios: 25,
        beneficiarios: 80,
        localizacao: "Rio de Janeiro, RJ",
        urgente: false,
        dataInicio: "2024-02-01",
        tags: ["educação", "tecnologia", "jovens"],
        necessidades: ["Professores voluntários", "Equipamentos", "Espaço físico"],
        impacto: "80 jovens capacitados em 6 meses",
        responsavel: "João Santos",
        contato: "joao@esperancasolidaria.org.br"
    },
    {
        id: 3,
        titulo: "Saúde na Comunidade",
        categoria: "saude",
        descricao: "Atendimento médico gratuito e campanhas de prevenção em comunidades carentes.",
        imagem: "projeto-saude.jpeg",
        progresso: 90,
        meta: 80000,
        arrecadado: 72000,
        voluntarios: 60,
        beneficiarios: 500,
        localizacao: "Belo Horizonte, MG",
        urgente: false,
        dataInicio: "2023-10-01",
        tags: ["saúde", "prevenção", "atendimento"],
        necessidades: ["Profissionais de saúde", "Medicamentos", "Equipamentos médicos"],
        impacto: "500 pessoas atendidas mensalmente",
        responsavel: "Dra. Ana Costa",
        contato: "ana@esperancasolidaria.org.br"
    },
    {
        id: 4,
        titulo: "Moradia Digna",
        categoria: "moradia",
        descricao: "Reforma e construção de moradias para famílias em situação precária.",
        imagem: "projeto-moradia.webp",
        progresso: 40,
        meta: 120000,
        arrecadado: 48000,
        voluntarios: 35,
        beneficiarios: 25,
        localizacao: "Salvador, BA",
        urgente: true,
        dataInicio: "2024-03-01",
        tags: ["moradia", "construção", "reforma"],
        necessidades: ["Pedreiros voluntários", "Material de construção", "Arquitetos"],
        impacto: "25 famílias com moradia reformada",
        responsavel: "Carlos Oliveira",
        contato: "carlos@esperancasolidaria.org.br"
    },
    {
        id: 5,
        titulo: "Meio Ambiente Sustentável",
        categoria: "meio-ambiente",
        descricao: "Projetos de reflorestamento e educação ambiental em escolas.",
        imagem: "projeto-ambiente.jpeg",
        progresso: 65,
        meta: 25000,
        arrecadado: 16250,
        voluntarios: 40,
        beneficiarios: 150,
        localizacao: "Curitiba, PR",
        urgente: false,
        dataInicio: "2024-01-20",
        tags: ["meio ambiente", "sustentabilidade", "educação"],
        necessidades: ["Educadores ambientais", "Mudas de árvores", "Material educativo"],
        impacto: "1000 mudas plantadas, 150 crianças educadas",
        responsavel: "Lucia Verde",
        contato: "lucia@esperancasolidaria.org.br"
    },
    {
        id: 6,
        titulo: "Apoio ao Idoso",
        categoria: "terceira-idade",
        descricao: "Programa de acompanhamento e cuidados para idosos em vulnerabilidade.",
        imagem: "projeto-idosos.jpeg",
        progresso: 80,
        meta: 40000,
        arrecadado: 32000,
        voluntarios: 30,
        beneficiarios: 100,
        localizacao: "Porto Alegre, RS",
        urgente: false,
        dataInicio: "2023-11-01",
        tags: ["terceira idade", "cuidados", "acompanhamento"],
        necessidades: ["Cuidadores voluntários", "Medicamentos", "Atividades recreativas"],
        impacto: "100 idosos acompanhados semanalmente",
        responsavel: "Roberto Alves",
        contato: "roberto@esperancasolidaria.org.br"
    }
];

// ====================================
// INICIALIZAÇÃO DA PÁGINA PROJETOS
// ====================================
function inicializarPaginaProjetos() {
    if (!document.querySelector('.projetos-grid')) return;
    
    projetosCarregados = [...dadosProjetos];
    
    configurarFiltrosProjetos();
    configurarBuscaProjetos();
    configurarOrdenacaoProjetos();
    renderizarProjetos();
    configurarPaginacao();
    inicializarMapaInterativo();
    
    console.log('📋 Página de projetos inicializada');
}

// ====================================
// SISTEMA DE FILTROS
// ====================================
function configurarFiltrosProjetos() {
    const botoesFiltro = document.querySelectorAll('.filtro-categoria');
    
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            
            const categoria = botao.dataset.categoria;
            aplicarFiltroProjeto(categoria);
            
            // Atualizar botões ativos
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
        });
    });
    
    // Filtros especiais
    const filtroUrgente = document.getElementById('filtro-urgente');
    if (filtroUrgente) {
        filtroUrgente.addEventListener('change', aplicarFiltros);
    }
    
    const filtroLocal = document.getElementById('filtro-local');
    if (filtroLocal) {
        filtroLocal.addEventListener('change', aplicarFiltros);
    }
}

function aplicarFiltroProjeto(categoria) {
    filtroAtual = categoria;
    paginaAtual = 1;
    aplicarFiltros();
    
    trackEvent('Interação', 'filtro_projeto', categoria);
}

function aplicarFiltros() {
    let projetosFiltrados = [...dadosProjetos];
    
    // Filtro por categoria
    if (filtroAtual !== 'todos') {
        projetosFiltrados = projetosFiltrados.filter(projeto => 
            projeto.categoria === filtroAtual
        );
    }
    
    // Filtro por busca
    if (buscaAtual) {
        projetosFiltrados = projetosFiltrados.filter(projeto =>
            projeto.titulo.toLowerCase().includes(buscaAtual.toLowerCase()) ||
            projeto.descricao.toLowerCase().includes(buscaAtual.toLowerCase()) ||
            projeto.tags.some(tag => tag.toLowerCase().includes(buscaAtual.toLowerCase()))
        );
    }
    
    // Filtro por urgência
    const filtroUrgente = document.getElementById('filtro-urgente');
    if (filtroUrgente && filtroUrgente.checked) {
        projetosFiltrados = projetosFiltrados.filter(projeto => projeto.urgente);
    }
    
    // Filtro por localização
    const filtroLocal = document.getElementById('filtro-local');
    if (filtroLocal && filtroLocal.value) {
        projetosFiltrados = projetosFiltrados.filter(projeto =>
            projeto.localizacao.toLowerCase().includes(filtroLocal.value.toLowerCase())
        );
    }
    
    projetosCarregados = projetosFiltrados;
    renderizarProjetos();
    atualizarPaginacao();
    atualizarContadorResultados();
}

// ====================================
// SISTEMA DE BUSCA
// ====================================
function configurarBuscaProjetos() {
    const campoBusca = document.getElementById('busca-projetos');
    
    if (campoBusca) {
        campoBusca.addEventListener('input', debounce((e) => {
            buscaAtual = e.target.value.trim();
            paginaAtual = 1;
            aplicarFiltros();
            
            if (buscaAtual) {
                trackEvent('Busca', 'buscar_projeto', buscaAtual);
            }
        }, 300));
    }
}

// ====================================
// SISTEMA DE ORDENAÇÃO
// ====================================
function configurarOrdenacaoProjetos() {
    const selectOrdenacao = document.getElementById('ordenacao-projetos');
    
    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', (e) => {
            const criterio = e.target.value;
            ordenarProjetos(criterio);
            renderizarProjetos();
            
            trackEvent('Interação', 'ordenar_projetos', criterio);
        });
    }
}

function ordenarProjetos(criterio) {
    switch (criterio) {
        case 'titulo':
            projetosCarregados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
            
        case 'progresso':
            projetosCarregados.sort((a, b) => b.progresso - a.progresso);
            break;
            
        case 'urgencia':
            projetosCarregados.sort((a, b) => {
                if (a.urgente && !b.urgente) return -1;
                if (!a.urgente && b.urgente) return 1;
                return b.progresso - a.progresso;
            });
            break;
            
        case 'beneficiarios':
            projetosCarregados.sort((a, b) => b.beneficiarios - a.beneficiarios);
            break;
            
        case 'data':
            projetosCarregados.sort((a, b) => new Date(b.dataInicio) - new Date(a.dataInicio));
            break;
            
        default:
            // Manter ordem original
            break;
    }
}

// ====================================
// RENDERIZAÇÃO DOS PROJETOS
// ====================================
function renderizarProjetos() {
    const container = document.querySelector('.projetos-grid');
    if (!container) return;
    
    // Calcular projetos da página atual
    const inicio = (paginaAtual - 1) * projetosPorPagina;
    const fim = inicio + projetosPorPagina;
    const projetosPagina = projetosCarregados.slice(inicio, fim);
    
    // Limpar container
    container.innerHTML = '';
    
    if (projetosPagina.length === 0) {
        mostrarMensagemVazia(container);
        return;
    }
    
    // Renderizar cada projeto
    projetosPagina.forEach((projeto, index) => {
        const cardProjeto = criarCardProjeto(projeto, index);
        container.appendChild(cardProjeto);
    });
    
    // Configurar animações de entrada
    animarEntradasCards();
}

function criarCardProjeto(projeto, index) {
    const card = document.createElement('div');
    card.className = 'card-projeto';
    card.dataset.projetoId = projeto.id;
    
    const porcentagemProgresso = Math.round(projeto.progresso);
    const valorArrecadado = formatarMoeda(projeto.arrecadado);
    const valorMeta = formatarMoeda(projeto.meta);
    
    card.innerHTML = `
        <div class="imagem-projeto">
            <img src="assets/images/${projeto.imagem}" alt="${projeto.titulo}" 
                 loading="lazy" onerror="this.src='assets/images/placeholder-projeto.jpg'">
            ${projeto.urgente ? '<span class="badge-urgente">Urgente</span>' : ''}
            <div class="overlay-projeto">
                <button class="botao-detalhes" onclick="mostrarDetalhesProjeto(${projeto.id})">
                    Ver Detalhes
                </button>
            </div>
        </div>
        
        <div class="conteudo-projeto">
            <div class="categoria-projeto">${obterNomeCategoria(projeto.categoria)}</div>
            <h3 class="titulo-projeto">${projeto.titulo}</h3>
            <p class="descricao-projeto">${projeto.descricao}</p>
            
            <div class="progresso-projeto">
                <div class="info-progresso">
                    <span class="porcentagem-progresso">${porcentagemProgresso}%</span>
                    <span class="meta-progresso">${valorArrecadado} de ${valorMeta}</span>
                </div>
                <div class="barra-progresso-projeto">
                    <div class="preenchimento-progresso" style="width: ${porcentagemProgresso}%"></div>
                </div>
            </div>
            
            <div class="estatisticas-projeto">
                <div class="estatistica">
                    <span class="numero-estatistica">${projeto.voluntarios}</span>
                    <span class="label-estatistica">Voluntários</span>
                </div>
                <div class="estatistica">
                    <span class="numero-estatistica">${projeto.beneficiarios}</span>
                    <span class="label-estatistica">Beneficiários</span>
                </div>
                <div class="estatistica-local">
                    <i class="icone-local">📍</i>
                    <span class="local-projeto">${projeto.localizacao}</span>
                </div>
            </div>
            
            <div class="acoes-projeto">
                <button class="botao-doar" onclick="abrirModalDoacao(${projeto.id})">
                    Doar Agora
                </button>
                <button class="botao-voluntario" onclick="abrirModalVoluntario(${projeto.id})">
                    Ser Voluntário
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function obterNomeCategoria(categoria) {
    const nomes = {
        'alimentacao': 'Alimentação',
        'educacao': 'Educação',
        'saude': 'Saúde',
        'moradia': 'Moradia',
        'meio-ambiente': 'Meio Ambiente',
        'terceira-idade': 'Terceira Idade'
    };
    
    return nomes[categoria] || categoria;
}

function mostrarMensagemVazia(container) {
    container.innerHTML = `
        <div class="mensagem-vazia">
            <div class="icone-vazio">🔍</div>
            <h3>Nenhum projeto encontrado</h3>
            <p>Tente ajustar os filtros ou termos de busca.</p>
            <button class="botao-limpar-filtros" onclick="limparFiltros()">
                Limpar Filtros
            </button>
        </div>
    `;
}

function limparFiltros() {
    // Resetar variáveis
    filtroAtual = 'todos';
    buscaAtual = '';
    paginaAtual = 1;
    
    // Resetar UI
    document.querySelectorAll('.filtro-categoria').forEach(b => b.classList.remove('ativo'));
    document.querySelector('.filtro-categoria[data-categoria="todos"]')?.classList.add('ativo');
    
    const campoBusca = document.getElementById('busca-projetos');
    if (campoBusca) campoBusca.value = '';
    
    const filtroUrgente = document.getElementById('filtro-urgente');
    if (filtroUrgente) filtroUrgente.checked = false;
    
    const filtroLocal = document.getElementById('filtro-local');
    if (filtroLocal) filtroLocal.value = '';
    
    // Reaplicar filtros
    aplicarFiltros();
    
    trackEvent('Interação', 'limpar_filtros', 'projetos');
}

// ====================================
// SISTEMA DE PAGINAÇÃO
// ====================================
function configurarPaginacao() {
    atualizarPaginacao();
}

function atualizarPaginacao() {
    const totalPaginas = Math.ceil(projetosCarregados.length / projetosPorPagina);
    const containerPaginacao = document.querySelector('.paginacao-projetos');
    
    if (!containerPaginacao || totalPaginas <= 1) {
        if (containerPaginacao) containerPaginacao.style.display = 'none';
        return;
    }
    
    containerPaginacao.style.display = 'flex';
    containerPaginacao.innerHTML = '';
    
    // Botão anterior
    const botaoAnterior = document.createElement('button');
    botaoAnterior.className = `botao-paginacao ${paginaAtual === 1 ? 'desabilitado' : ''}`;
    botaoAnterior.innerHTML = '← Anterior';
    botaoAnterior.disabled = paginaAtual === 1;
    botaoAnterior.addEventListener('click', () => irParaPagina(paginaAtual - 1));
    containerPaginacao.appendChild(botaoAnterior);
    
    // Números das páginas
    const inicioRange = Math.max(1, paginaAtual - 2);
    const fimRange = Math.min(totalPaginas, paginaAtual + 2);
    
    for (let i = inicioRange; i <= fimRange; i++) {
        const botaoPagina = document.createElement('button');
        botaoPagina.className = `botao-paginacao ${i === paginaAtual ? 'ativo' : ''}`;
        botaoPagina.textContent = i;
        botaoPagina.addEventListener('click', () => irParaPagina(i));
        containerPaginacao.appendChild(botaoPagina);
    }
    
    // Botão próximo
    const botaoProximo = document.createElement('button');
    botaoProximo.className = `botao-paginacao ${paginaAtual === totalPaginas ? 'desabilitado' : ''}`;
    botaoProximo.innerHTML = 'Próxima →';
    botaoProximo.disabled = paginaAtual === totalPaginas;
    botaoProximo.addEventListener('click', () => irParaPagina(paginaAtual + 1));
    containerPaginacao.appendChild(botaoProximo);
}

function irParaPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    renderizarProjetos();
    atualizarPaginacao();
    
    // Rolar para o topo da grid
    document.querySelector('.projetos-grid')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    trackEvent('Navegação', 'pagina_projetos', numeroPagina.toString());
}

// ====================================
// CONTADOR DE RESULTADOS
// ====================================
function atualizarContadorResultados() {
    const contador = document.querySelector('.contador-resultados');
    if (!contador) return;
    
    const total = projetosCarregados.length;
    const inicio = (paginaAtual - 1) * projetosPorPagina + 1;
    const fim = Math.min(inicio + projetosPorPagina - 1, total);
    
    if (total === 0) {
        contador.textContent = 'Nenhum projeto encontrado';
    } else if (total <= projetosPorPagina) {
        contador.textContent = `${total} projeto${total > 1 ? 's' : ''} encontrado${total > 1 ? 's' : ''}`;
    } else {
        contador.textContent = `Mostrando ${inicio}-${fim} de ${total} projetos`;
    }
}

// ====================================
// MODAIS DE INTERAÇÃO
// ====================================
function mostrarDetalhesProjeto(projetoId) {
    const projeto = dadosProjetos.find(p => p.id === projetoId);
    if (!projeto) return;
    
    const modal = criarModalDetalhes(projeto);
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => modal.classList.add('visivel'), 10);
    
    trackEvent('Interação', 'ver_detalhes_projeto', projeto.titulo);
}

function criarModalDetalhes(projeto) {
    const modal = document.createElement('div');
    modal.className = 'modal-detalhes-projeto';
    modal.innerHTML = `
        <div class="conteudo-modal-detalhes">
            <button class="botao-fechar-modal" onclick="fecharModalDetalhes(this)">&times;</button>
            
            <div class="cabecalho-modal-detalhes">
                <img src="assets/images/${projeto.imagem}" alt="${projeto.titulo}">
                <div class="info-cabecalho">
                    <h2>${projeto.titulo}</h2>
                    <p class="categoria-modal">${obterNomeCategoria(projeto.categoria)}</p>
                    <p class="localizacao-modal">📍 ${projeto.localizacao}</p>
                </div>
            </div>
            
            <div class="corpo-modal-detalhes">
                <div class="abas-detalhes">
                    <button class="aba-detalhes ativa" data-aba="sobre">Sobre</button>
                    <button class="aba-detalhes" data-aba="progresso">Progresso</button>
                    <button class="aba-detalhes" data-aba="como-ajudar">Como Ajudar</button>
                </div>
                
                <div class="conteudo-abas">
                    <div class="aba-conteudo ativa" data-aba="sobre">
                        <p>${projeto.descricao}</p>
                        <h4>Impacto Esperado</h4>
                        <p>${projeto.impacto}</p>
                        <h4>Responsável</h4>
                        <p>${projeto.responsavel} - ${projeto.contato}</p>
                    </div>
                    
                    <div class="aba-conteudo" data-aba="progresso">
                        <div class="estatisticas-detalhadas">
                            <div class="estatistica-detalhada">
                                <span class="numero">${projeto.progresso}%</span>
                                <span class="label">Progresso</span>
                            </div>
                            <div class="estatistica-detalhada">
                                <span class="numero">${formatarMoeda(projeto.arrecadado)}</span>
                                <span class="label">Arrecadado</span>
                            </div>
                            <div class="estatistica-detalhada">
                                <span class="numero">${projeto.voluntarios}</span>
                                <span class="label">Voluntários</span>
                            </div>
                            <div class="estatistica-detalhada">
                                <span class="numero">${projeto.beneficiarios}</span>
                                <span class="label">Beneficiários</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="aba-conteudo" data-aba="como-ajudar">
                        <h4>Necessidades Atuais</h4>
                        <ul>
                            ${projeto.necessidades.map(n => `<li>${n}</li>`).join('')}
                        </ul>
                        
                        <div class="acoes-ajuda">
                            <button class="botao-primario" onclick="abrirModalDoacao(${projeto.id})">
                                Fazer Doação
                            </button>
                            <button class="botao-secundario" onclick="abrirModalVoluntario(${projeto.id})">
                                Ser Voluntário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Configurar abas
    const abas = modal.querySelectorAll('.aba-detalhes');
    abas.forEach(aba => {
        aba.addEventListener('click', () => alternarAbaDetalhes(modal, aba.dataset.aba));
    });
    
    return modal;
}

function alternarAbaDetalhes(modal, abaId) {
    // Desativar todas as abas
    modal.querySelectorAll('.aba-detalhes').forEach(a => a.classList.remove('ativa'));
    modal.querySelectorAll('.aba-conteudo').forEach(c => c.classList.remove('ativa'));
    
    // Ativar aba selecionada
    modal.querySelector(`.aba-detalhes[data-aba="${abaId}"]`).classList.add('ativa');
    modal.querySelector(`.aba-conteudo[data-aba="${abaId}"]`).classList.add('ativa');
}

function fecharModalDetalhes(botao) {
    const modal = botao.closest('.modal-detalhes-projeto');
    modal.classList.remove('visivel');
    
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function abrirModalDoacao(projetoId) {
    const projeto = dadosProjetos.find(p => p.id === projetoId);
    alert(`Modal de doação para: ${projeto.titulo}\n\nEsta funcionalidade será implementada com integração de pagamento.`);
    
    trackEvent('Conversão', 'iniciar_doacao', projeto.titulo);
}

function abrirModalVoluntario(projetoId) {
    const projeto = dadosProjetos.find(p => p.id === projetoId);
    
    // Redirecionar para cadastro com projeto pré-selecionado
    const url = `cadastro.html?projeto=${projetoId}`;
    window.location.href = url;
    
    trackEvent('Conversão', 'iniciar_voluntariado', projeto.titulo);
}

// ====================================
// ANIMAÇÕES
// ====================================
function animarEntradasCards() {
    const cards = document.querySelectorAll('.card-projeto');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ====================================
// MAPA INTERATIVO (SIMULADO)
// ====================================
function inicializarMapaInterativo() {
    const mapa = document.getElementById('mapa-projetos');
    if (!mapa) return;
    
    // Simular mapa com marcadores
    mapa.innerHTML = `
        <div class="placeholder-mapa">
            <h4>Mapa de Projetos</h4>
            <p>Localização dos projetos ativos</p>
            <div class="marcadores-mapa">
                ${dadosProjetos.map(p => `
                    <div class="marcador" title="${p.titulo} - ${p.localizacao}">
                        📍 ${p.localizacao}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    console.log('🗺️ Mapa de projetos inicializado (simulado)');
}

// ====================================
// UTILITÁRIOS
// ====================================
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// ====================================
// INICIALIZAÇÃO
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.projetos-grid')) {
        inicializarPaginaProjetos();
        console.log('✅ Página de projetos configurada completamente');
    }
});

// ====================================
// EXPORT PARA REUTILIZAÇÃO
// ====================================
window.projetosFunctions = {
    mostrarDetalhesProjeto,
    abrirModalDoacao,
    abrirModalVoluntario,
    fecharModalDetalhes
};
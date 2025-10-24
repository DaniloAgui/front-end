/* ====================================
   ONG ESPERANÇA SOLIDÁRIA - JAVASCRIPT PRINCIPAL
   Funcionalidades interativas e validações
   ===================================== */

// ====================================
// VARIÁVEIS GLOBAIS
// ====================================
let temaAtual = localStorage.getItem('tema') || 'claro';
let etapaAtual = 1;
let totalEtapas = 3;
let depoimentoAtivo = 0;
let totalDepoimentos = 3;

// ====================================
// INICIALIZAÇÃO
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarTema();
    inicializarMenuMobile();
    inicializarBotaoTopo();
    inicializarAnimacaoNumeros();
    inicializarDepoimentos();
    inicializarNewsletterFormulario();
    inicializarValidacaoCEP();
    inicializarMascarasInput();
    
    // Funcionalidades específicas da página
    if (document.getElementById('formulario-cadastro')) {
        inicializarFormularioCadastro();
    }
    
    if (document.querySelector('.filtro-botao')) {
        inicializarFiltrosProjetos();
    }
    
    console.log('🎉 ONG Esperança Solidária - Sistema inicializado com sucesso!');
});

// ====================================
// GERENCIAMENTO DE TEMA
// ====================================
function inicializarTema() {
    const botaoTema = document.querySelector('.botao-tema');
    const iconeTema = botaoTema?.querySelector('img');
    
    // Aplicar tema inicial
    aplicarTema(temaAtual);
    
    if (botaoTema) {
        botaoTema.addEventListener('click', alternarTema);
    }
}

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-tema', tema);
    const iconeTema = document.querySelector('.botao-tema img');
    
    if (iconeTema) {
        if (tema === 'escuro') {
            iconeTema.src = 'assets/images/icone-sol.svg';
            iconeTema.alt = 'Modo claro';
        } else {
            iconeTema.src = 'assets/images/icone-lua.svg';
            iconeTema.alt = 'Modo escuro';
        }
    }
    
    localStorage.setItem('tema', tema);
}

function alternarTema() {
    temaAtual = temaAtual === 'claro' ? 'escuro' : 'claro';
    aplicarTema(temaAtual);
    
    // Animação de transição suave
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// ====================================
// MENU MOBILE
// ====================================
function inicializarMenuMobile() {
    const botaoMenu = document.querySelector('.botao-menu-mobile');
    const menuNavegacao = document.querySelector('.menu-navegacao');
    
    if (botaoMenu && menuNavegacao) {
        botaoMenu.addEventListener('click', alternarMenuMobile);
        
        // Fechar menu ao clicar em links
        const linksMenu = menuNavegacao.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                fecharMenuMobile();
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!botaoMenu.contains(e.target) && !menuNavegacao.contains(e.target)) {
                fecharMenuMobile();
            }
        });
    }
}

function alternarMenuMobile() {
    const botaoMenu = document.querySelector('.botao-menu-mobile');
    const menuNavegacao = document.querySelector('.menu-navegacao');
    const isAberto = menuNavegacao.classList.contains('ativo');
    
    if (isAberto) {
        fecharMenuMobile();
    } else {
        abrirMenuMobile();
    }
    
    botaoMenu.setAttribute('aria-expanded', !isAberto);
}

function abrirMenuMobile() {
    const menuNavegacao = document.querySelector('.menu-navegacao');
    const linhasMenu = document.querySelectorAll('.linha-menu');
    
    menuNavegacao.classList.add('ativo');
    
    // Animação do hambúrguer para X
    linhasMenu[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    linhasMenu[1].style.opacity = '0';
    linhasMenu[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
}

function fecharMenuMobile() {
    const menuNavegacao = document.querySelector('.menu-navegacao');
    const linhasMenu = document.querySelectorAll('.linha-menu');
    const botaoMenu = document.querySelector('.botao-menu-mobile');
    
    menuNavegacao.classList.remove('ativo');
    botaoMenu.setAttribute('aria-expanded', 'false');
    
    // Resetar animação do hambúrguer
    linhasMenu.forEach(linha => {
        linha.style.transform = '';
        linha.style.opacity = '';
    });
}

// ====================================
// BOTÃO VOLTAR AO TOPO
// ====================================
function inicializarBotaoTopo() {
    const botaoTopo = document.getElementById('botao-topo');
    
    if (botaoTopo) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                botaoTopo.classList.add('visivel');
            } else {
                botaoTopo.classList.remove('visivel');
            }
        });
        
        botaoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ====================================
// ANIMAÇÃO DE NÚMEROS
// ====================================
function inicializarAnimacaoNumeros() {
    const numerosAnimados = document.querySelectorAll('[data-numero]');
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                animarNumero(entrada.target);
            }
        });
    }, { threshold: 0.5 });
    
    numerosAnimados.forEach(numero => {
        observer.observe(numero);
    });
}

function animarNumero(elemento) {
    const valorFinal = parseInt(elemento.dataset.numero);
    const duracao = 2000; // 2 segundos
    const incremento = valorFinal / (duracao / 16); // 60fps
    let valorAtual = 0;
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(valorAtual).toLocaleString('pt-BR');
    }, 16);
}

// ====================================
// CAROUSEL DE DEPOIMENTOS
// ====================================
function inicializarDepoimentos() {
    const depoimentos = document.querySelectorAll('.cartao-depoimento');
    const indicadores = document.querySelectorAll('.indicador');
    const botaoAnterior = document.querySelector('.botao-anterior');
    const botaoProximo = document.querySelector('.botao-proximo');
    
    if (depoimentos.length === 0) return;
    
    // Inicializar primeiro depoimento
    mostrarDepoimento(0);
    
    // Navegação por botões
    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', () => {
            depoimentoAnterior();
        });
    }
    
    if (botaoProximo) {
        botaoProximo.addEventListener('click', () => {
            proximoDepoimento();
        });
    }
    
    // Navegação por indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            mostrarDepoimento(index);
        });
    });
    
    // Auto-play
    setInterval(() => {
        proximoDepoimento();
    }, 5000);
}

function mostrarDepoimento(indice) {
    const depoimentos = document.querySelectorAll('.cartao-depoimento');
    const indicadores = document.querySelectorAll('.indicador');
    
    // Remover classe ativo de todos
    depoimentos.forEach(depoimento => depoimento.classList.remove('ativo'));
    indicadores.forEach(indicador => indicador.classList.remove('ativo'));
    
    // Adicionar classe ativo ao atual
    if (depoimentos[indice]) {
        depoimentos[indice].classList.add('ativo');
    }
    if (indicadores[indice]) {
        indicadores[indice].classList.add('ativo');
    }
    
    depoimentoAtivo = indice;
}

function proximoDepoimento() {
    const proximo = (depoimentoAtivo + 1) % totalDepoimentos;
    mostrarDepoimento(proximo);
}

function depoimentoAnterior() {
    const anterior = (depoimentoAtivo - 1 + totalDepoimentos) % totalDepoimentos;
    mostrarDepoimento(anterior);
}

// ====================================
// FORMULÁRIO NEWSLETTER
// ====================================
function inicializarNewsletterFormulario() {
    const formularios = document.querySelectorAll('.formulario-newsletter');
    
    formularios.forEach(formulario => {
        formulario.addEventListener('submit', processarNewsletterSubmit);
    });
}

function processarNewsletterSubmit(evento) {
    evento.preventDefault();
    
    const formulario = evento.target;
    const emailInput = formulario.querySelector('input[type="email"]');
    const botaoSubmit = formulario.querySelector('button[type="submit"]');
    const mensagemErro = formulario.querySelector('.mensagem-erro');
    const mensagemSucesso = formulario.querySelector('.sucesso-newsletter');
    
    // Limpar mensagens anteriores
    limparMensagensFormulario(mensagemErro, mensagemSucesso);
    
    // Validar email
    if (!validarEmail(emailInput.value)) {
        mostrarMensagemErro(mensagemErro, 'Por favor, insira um e-mail válido.');
        return;
    }
    
    // Simular envio
    botaoSubmit.disabled = true;
    botaoSubmit.innerHTML = '<img src="assets/images/icone-loading.svg" alt="" width="16" height="16"> Enviando...';
    
    setTimeout(() => {
        // Resetar botão
        botaoSubmit.disabled = false;
        botaoSubmit.innerHTML = '<img src="assets/images/icone-enviar.svg" alt="" width="18" height="18">';
        
        // Mostrar sucesso
        mostrarMensagemSucesso(mensagemSucesso, 'E-mail cadastrado com sucesso! Obrigado por se inscrever.');
        emailInput.value = '';
        
        // Enviar dados (simulação)
        console.log('Newsletter cadastrada:', emailInput.value);
    }, 1500);
}

// ====================================
// MÁSCARAS DE INPUT
// ====================================
function inicializarMascarasInput() {
    // Máscara CPF
    const inputsCPF = document.querySelectorAll('input[name="cpf"]');
    inputsCPF.forEach(input => {
        input.addEventListener('input', aplicarMascaraCPF);
        input.addEventListener('keypress', apenasNumeros);
    });
    
    // Máscara Telefone
    const inputsTelefone = document.querySelectorAll('input[type="tel"]');
    inputsTelefone.forEach(input => {
        input.addEventListener('input', aplicarMascaraTelefone);
        input.addEventListener('keypress', apenasNumeros);
    });
    
    // Máscara CEP
    const inputsCEP = document.querySelectorAll('input[name="cep"]');
    inputsCEP.forEach(input => {
        input.addEventListener('input', aplicarMascaraCEP);
        input.addEventListener('keypress', apenasNumeros);
    });
}

function aplicarMascaraCPF(evento) {
    let valor = evento.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    evento.target.value = valor;
}

function aplicarMascaraTelefone(evento) {
    let valor = evento.target.value.replace(/\D/g, '');
    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    evento.target.value = valor;
}

function aplicarMascaraCEP(evento) {
    let valor = evento.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    evento.target.value = valor;
}

function apenasNumeros(evento) {
    const tecla = evento.key;
    const permitidas = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
    
    if (permitidas.includes(tecla) || (tecla >= '0' && tecla <= '9')) {
        return true;
    }
    
    evento.preventDefault();
    return false;
}

// ====================================
// VALIDAÇÃO DE CEP
// ====================================
function inicializarValidacaoCEP() {
    const inputsCEP = document.querySelectorAll('input[name="cep"]');
    
    inputsCEP.forEach(input => {
        input.addEventListener('blur', validarEPreencherCEP);
    });
}

async function validarEPreencherCEP(evento) {
    const cep = evento.target.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        return;
    }
    
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();
        
        if (dados.erro) {
            mostrarErroCampo(evento.target, 'CEP não encontrado.');
            return;
        }
        
        // Preencher campos automaticamente
        preencherCamposEndereco(dados);
        limparErroCampo(evento.target);
        
    } catch (erro) {
        console.error('Erro ao buscar CEP:', erro);
        mostrarErroCampo(evento.target, 'Erro ao validar CEP. Tente novamente.');
    }
}

function preencherCamposEndereco(dados) {
    const campos = {
        'endereco': dados.logradouro,
        'bairro': dados.bairro,
        'cidade': dados.localidade,
        'estado': dados.uf
    };
    
    Object.entries(campos).forEach(([nome, valor]) => {
        const campo = document.querySelector(`input[name="${nome}"], select[name="${nome}"]`);
        if (campo && valor) {
            campo.value = valor;
            campo.classList.add('preenchido-automaticamente');
            
            // Remover classe após animação
            setTimeout(() => {
                campo.classList.remove('preenchido-automaticamente');
            }, 2000);
        }
    });
}

// ====================================
// FILTROS DE PROJETOS
// ====================================
function inicializarFiltrosProjetos() {
    const botoesFiltro = document.querySelectorAll('.filtro-botao');
    const inputBusca = document.querySelector('#busca-projeto');
    const selectOrdenacao = document.querySelector('#ordenar-por');
    
    // Filtros por categoria
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            const categoria = botao.dataset.filtro;
            aplicarFiltroProjetos(categoria);
            atualizarBotoesFiltro(botao);
        });
    });
    
    // Busca por texto
    if (inputBusca) {
        inputBusca.addEventListener('input', debounce(filtrarProjetosPorTexto, 300));
    }
    
    // Ordenação
    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', ordenarProjetos);
    }
}

function aplicarFiltroProjetos(categoria) {
    const projetos = document.querySelectorAll('.cartao-projeto');
    let visiveisContador = 0;
    
    projetos.forEach(projeto => {
        if (categoria === 'todos' || projeto.dataset.categoria === categoria) {
            projeto.style.display = 'block';
            // Animação de entrada
            projeto.style.opacity = '0';
            projeto.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                projeto.style.transition = 'all 0.3s ease';
                projeto.style.opacity = '1';
                projeto.style.transform = 'translateY(0)';
            }, visiveisContador * 100);
            
            visiveisContador++;
        } else {
            projeto.style.display = 'none';
        }
    });
    
    atualizarContadorResultados(visiveisContador);
}

function atualizarBotoesFiltro(botaoAtivo) {
    const botoesFiltro = document.querySelectorAll('.filtro-botao');
    botoesFiltro.forEach(botao => botao.classList.remove('ativo'));
    botaoAtivo.classList.add('ativo');
}

function filtrarProjetosPorTexto() {
    const termoBusca = document.querySelector('#busca-projeto').value.toLowerCase();
    const projetos = document.querySelectorAll('.cartao-projeto');
    let visiveisContador = 0;
    
    projetos.forEach(projeto => {
        const titulo = projeto.querySelector('.titulo-projeto').textContent.toLowerCase();
        const descricao = projeto.querySelector('.descricao-projeto').textContent.toLowerCase();
        
        if (titulo.includes(termoBusca) || descricao.includes(termoBusca)) {
            projeto.style.display = 'block';
            visiveisContador++;
        } else {
            projeto.style.display = 'none';
        }
    });
    
    atualizarContadorResultados(visiveisContador);
}

function ordenarProjetos() {
    const criterio = document.querySelector('#ordenar-por').value;
    const container = document.querySelector('#lista-projetos');
    const projetos = Array.from(container.querySelectorAll('.cartao-projeto'));
    
    projetos.sort((a, b) => {
        switch (criterio) {
            case 'alfabetica':
                const tituloA = a.querySelector('.titulo-projeto').textContent;
                const tituloB = b.querySelector('.titulo-projeto').textContent;
                return tituloA.localeCompare(tituloB);
                
            case 'beneficiarios':
                const benefA = parseInt(a.querySelector('.beneficiados span').textContent);
                const benefB = parseInt(b.querySelector('.beneficiados span').textContent);
                return benefB - benefA;
                
            case 'progresso':
                const progA = parseInt(a.querySelector('.valor-progresso').textContent);
                const progB = parseInt(b.querySelector('.valor-progresso').textContent);
                return progB - progA;
                
            default: // recentes
                return 0;
        }
    });
    
    // Reorganizar DOM
    projetos.forEach(projeto => container.appendChild(projeto));
}

function atualizarContadorResultados(quantidade) {
    const contador = document.querySelector('.contador-resultados');
    if (contador) {
        contador.textContent = quantidade;
    }
}

// ====================================
// UTILITÁRIOS
// ====================================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpf.charAt(10));
}

function mostrarMensagemErro(elemento, mensagem) {
    if (elemento) {
        elemento.textContent = mensagem;
        elemento.classList.add('visivel');
        
        // Auto-ocultar após 5 segundos
        setTimeout(() => {
            elemento.classList.remove('visivel');
        }, 5000);
    }
}

function mostrarMensagemSucesso(elemento, mensagem) {
    if (elemento) {
        elemento.textContent = mensagem;
        elemento.classList.add('visivel');
        
        // Auto-ocultar após 5 segundos
        setTimeout(() => {
            elemento.classList.remove('visivel');
        }, 5000);
    }
}

function limparMensagensFormulario(...elementos) {
    elementos.forEach(elemento => {
        if (elemento) {
            elemento.classList.remove('visivel');
        }
    });
}

function mostrarErroCampo(campo, mensagem) {
    const grupoCampo = campo.closest('.grupo-campo');
    const mensagemErro = grupocampo?.querySelector('.mensagem-erro');
    
    campo.classList.add('invalido');
    grupoClasse?.classList.add('tem-erro');
    
    if (mensagemErro) {
        mensagemErro.textContent = mensagem;
        mensagemErro.classList.add('visivel');
    }
}

function limparErroCampo(campo) {
    const grupoClasse = campo.closest('.grupo-campo');
    const mensagemErro = grupoClasse?.querySelector('.mensagem-erro');
    
    campo.classList.remove('invalido');
    campo.classList.add('valido');
    grupoClasse?.classList.remove('tem-erro');
    grupoClasse?.classList.add('tem-sucesso');
    
    if (mensagemErro) {
        mensagemErro.classList.remove('visivel');
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================================
// ACESSIBILIDADE
// ====================================
document.addEventListener('keydown', function(evento) {
    // Navegação por teclado no menu
    if (evento.key === 'Escape') {
        fecharMenuMobile();
        fecharModais();
    }
    
    // Atalhos de teclado
    if (evento.ctrlKey || evento.metaKey) {
        switch (evento.key) {
            case 'k':
                evento.preventDefault();
                const inputBusca = document.querySelector('#busca-projeto');
                if (inputBusca) {
                    inputBusca.focus();
                }
                break;
                
            case '/':
                evento.preventDefault();
                const inputNewsletter = document.querySelector('#email-newsletter');
                if (inputNewsletter) {
                    inputNewsletter.focus();
                }
                break;
        }
    }
});

// ====================================
// MODAIS (FUNCIONALIDADE PLACEHOLDER)
// ====================================
function abrirModal(modalId) {
    console.log(`Abrindo modal: ${modalId}`);
    // Implementar conforme necessário
}

function fecharModais() {
    console.log('Fechando todos os modais');
    // Implementar conforme necessário
}

// ====================================
// ANALYTICS E TRACKING (SIMULADO)
// ====================================
function trackEvent(categoria, acao, rotulo) {
    console.log('📊 Evento rastreado:', { categoria, acao, rotulo });
    
    // Integração com Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', acao, {
            event_category: categoria,
            event_label: rotulo
        });
    }
}

// Rastrear cliques importantes
document.addEventListener('click', function(evento) {
    const elemento = evento.target;
    
    // Botões de doação
    if (elemento.classList.contains('botao-doacao') || 
        elemento.textContent.includes('Doar') || 
        elemento.textContent.includes('Doação')) {
        trackEvent('Conversão', 'click_botao_doacao', elemento.textContent);
    }
    
    // Botões de voluntariado
    if (elemento.classList.contains('botao-voluntario') || 
        elemento.textContent.includes('Voluntário')) {
        trackEvent('Engajamento', 'click_botao_voluntario', elemento.textContent);
    }
    
    // Links de redes sociais
    if (elemento.closest('.redes-sociais')) {
        const rede = elemento.alt || elemento.title || 'rede_social';
        trackEvent('Social', 'click_rede_social', rede);
    }
});

// ====================================
// PERFORMANCE E OTIMIZAÇÃO
// ====================================
// Lazy loading de imagens
function inicializarLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    const img = entrada.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imgObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
}

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registrado: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW falhou: ', registrationError);
            });
    });
}
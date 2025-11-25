/* ====================================
   JAVASCRIPT ESPECÍFICO - FORMULÁRIO CADASTRO
   Sistema de etapas e validações avançadas
   ===================================== */

// ====================================
// VARIÁVEIS DO FORMULÁRIO
// ====================================
let formularioCadastro = null;
let etapaAtual = 1;
const totalEtapas = 3;
let dadosFormulario = {};

// ====================================
// INICIALIZAÇÃO DO FORMULÁRIO
// ====================================
function inicializarFormularioCadastro() {
    formularioCadastro = document.getElementById('formulario-cadastro');
    
    if (!formularioCadastro) return;
    
    configurarEtapasFormulario();
    configurarValidacaoRealTime();
    configurarContadoresCaracteres();
    configurarSubmitFormulario();
    inicializarProgressoFormulario();
    
    console.log('📝 Formulário de cadastro inicializado');
}

// ====================================
// GERENCIAMENTO DE ETAPAS
// ====================================
function configurarEtapasFormulario() {
    // Mostrar primeira etapa
    mostrarEtapa(1);
    atualizarIndicadoresProgresso();
}

function proximaEtapa() {
    if (validarEtapaAtual()) {
        if (etapaAtual < totalEtapas) {
            salvarDadosEtapa();
            etapaAtual++;
            mostrarEtapa(etapaAtual);
            atualizarPassosLaterais();
            atualizarIndicadoresProgresso();
            rolarParaTopo();
        }
    }
}

function etapaAnterior() {
    if (etapaAtual > 1) {
        salvarDadosEtapa();
        etapaAtual--;
        mostrarEtapa(etapaAtual);
        atualizarPassosLaterais();
        atualizarIndicadoresProgresso();
        rolarParaTopo();
    }
}

function mostrarEtapa(numeroEtapa) {
    // Ocultar todas as etapas
    const etapas = document.querySelectorAll('.etapa-formulario');
    etapas.forEach(etapa => etapa.classList.remove('ativa'));
    
    // Mostrar etapa atual
    const etapaAtiva = document.getElementById(`etapa-${obterNomeEtapa(numeroEtapa)}`);
    if (etapaAtiva) {
        etapaAtiva.classList.add('ativa');
        
        // Focar no primeiro campo da etapa
        const primeiroCampo = etapaAtiva.querySelector('input, select, textarea');
        if (primeiroCampo) {
            setTimeout(() => primeiroCampo.focus(), 300);
        }
    }
}

function obterNomeEtapa(numero) {
    const nomes = {
        1: 'dados-pessoais',
        2: 'endereco', 
        3: 'preferencias'
    };
    return nomes[numero];
}

function atualizarPassosLaterais() {
    const passos = document.querySelectorAll('.passo');
    passos.forEach((passo, index) => {
        passo.classList.remove('ativo');
        if (index + 1 === etapaAtual) {
            passo.classList.add('ativo');
        }
    });
}

function rolarParaTopo() {
    const containerFormulario = document.querySelector('.container-formulario');
    if (containerFormulario) {
        containerFormulario.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ====================================
// VALIDAÇÃO EM TEMPO REAL
// ====================================
function configurarValidacaoRealTime() {
    const campos = formularioCadastro.querySelectorAll('input, select, textarea');
    
    campos.forEach(campo => {
        // Validação ao sair do campo
        campo.addEventListener('blur', () => validarCampo(campo));
        
        // Validação ao digitar (com debounce)
        campo.addEventListener('input', debounce(() => {
            if (campo.value.length > 0) {
                validarCampo(campo);
            }
        }, 500));
    });
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    const tipo = campo.type;
    const nome = campo.name;
    let erro = '';
    
    // Validações específicas por campo
    switch (nome) {
        case 'nomeCompleto':
            erro = validarNomeCompleto(valor);
            break;
            
        case 'email':
            erro = validarEmailCampo(valor);
            break;
            
        case 'cpf':
            erro = validarCPFCampo(valor);
            break;
            
        case 'telefone':
            erro = validarTelefoneCampo(valor);
            break;
            
        case 'dataNascimento':
            erro = validarDataNascimento(valor);
            break;
            
        case 'cep':
            erro = validarCEPCampo(valor);
            break;
            
        case 'endereco':
        case 'numero':
        case 'bairro':
        case 'cidade':
            erro = validarCampoObrigatorio(valor, campo);
            break;
            
        case 'estado':
            erro = validarEstado(valor);
            break;
            
        case 'motivacao':
            erro = validarMotivacao(valor);
            break;
    }
    
    // Validações gerais
    if (campo.required && !valor) {
        erro = 'Este campo é obrigatório.';
    }
    
    // Aplicar resultado da validação
    if (erro) {
        mostrarErroCampoFormulario(campo, erro);
        return false;
    } else {
        limparErroCampoFormulario(campo);
        return true;
    }
}

// ====================================
// VALIDAÇÕES ESPECÍFICAS
// ====================================
function validarNomeCompleto(nome) {
    if (nome.length < 3) {
        return 'O nome deve ter pelo menos 3 caracteres.';
    }
    
    if (nome.split(' ').length < 2) {
        return 'Por favor, informe seu nome completo.';
    }
    
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
        return 'O nome deve conter apenas letras e espaços.';
    }
    
    return '';
}

function validarEmailCampo(email) {
    if (!validarEmail(email)) {
        return 'Por favor, insira um e-mail válido.';
    }
    
    // Lista de domínios comuns para sugestões
    const dominiosComuns = ['gmail.com', 'hotmail.com', 'yahoo.com.br', 'outlook.com'];
    const dominio = email.split('@')[1];
    
    if (dominio && !dominiosComuns.includes(dominio)) {
        // Poderá sugerir correções no futuro
    }
    
    return '';
}

function validarCPFCampo(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (cpfLimpo.length !== 11) {
        return 'O CPF deve ter 11 dígitos.';
    }
    
    if (!validarCPF(cpf)) {
        return 'CPF inválido. Verifique os números digitados.';
    }
    
    return '';
}

function validarTelefoneCampo(telefone) {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    if (telefoneLimpo.length < 10) {
        return 'Telefone deve ter pelo menos 10 dígitos.';
    }
    
    if (telefoneLimpo.length > 11) {
        return 'Telefone deve ter no máximo 11 dígitos.';
    }
    
    return '';
}

function validarDataNascimento(data) {
    if (!data) {
        return 'Data de nascimento é obrigatória.';
    }
    
    const nascimento = new Date(data);
    const hoje = new Date();
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    
    if (idade < 16) {
        return 'Você deve ter pelo menos 16 anos para ser voluntário.';
    }
    
    if (idade > 100) {
        return 'Por favor, verifique a data de nascimento.';
    }
    
    return '';
}

function validarCEPCampo(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
        return 'CEP deve ter 8 dígitos.';
    }
    
    return '';
}

function validarCampoObrigatorio(valor, campo) {
    if (!valor) {
        const label = campo.closest('.grupo-campo')?.querySelector('.label-campo')?.textContent;
        return `${label || 'Este campo'} é obrigatório.`;
    }
    
    return '';
}

function validarEstado(estado) {
    if (!estado) {
        return 'Por favor, selecione um estado.';
    }
    
    return '';
}

function validarMotivacao(motivacao) {
    if (!motivacao) {
        return 'Por favor, conte-nos sua motivação.';
    }
    
    if (motivacao.length < 20) {
        return 'Por favor, escreva pelo menos 20 caracteres sobre sua motivação.';
    }
    
    return '';
}

// ====================================
// VALIDAÇÃO DE ETAPA COMPLETA
// ====================================
function validarEtapaAtual() {
    const etapaDiv = document.querySelector('.etapa-formulario.ativa');
    const campos = etapaDiv.querySelectorAll('input[required], select[required], textarea[required]');
    const gruposRadio = etapaDiv.querySelectorAll('fieldset[data-obrigatorio="true"]');
    const gruposCheckbox = etapaDiv.querySelectorAll('fieldset[data-minimo]');
    
    let valido = true;
    
    // Validar campos individuais
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });
    
    // Validar grupos de radio
    gruposRadio.forEach(grupo => {
        const selecionado = grupo.querySelector('input[type="radio"]:checked');
        if (!selecionado) {
            mostrarErroGrupo(grupo, 'Por favor, selecione uma opção.');
            valido = false;
        } else {
            limparErroGrupo(grupo);
        }
    });
    
    // Validar grupos de checkbox (áreas de interesse, disponibilidade)
    gruposCheckbox.forEach(grupo => {
        const minimo = parseInt(grupo.dataset.minimo) || 1;
        const selecionados = grupo.querySelectorAll('input[type="checkbox"]:checked');
        
        if (selecionados.length < minimo) {
            const mensagem = minimo === 1 ? 
                'Por favor, selecione pelo menos uma opção.' :
                `Por favor, selecione pelo menos ${minimo} opções.`;
            mostrarErroGrupo(grupo, mensagem);
            valido = false;
        } else {
            limparErroGrupo(grupo);
        }
    });
    
    // Validar termos e condições
    if (etapaAtual === 3) {
        const aceitarTermos = document.getElementById('aceitar-termos');
        if (!aceitarTermos.checked) {
            mostrarErroGrupo(aceitarTermos.closest('.grupo-termos'), 'Você deve aceitar os termos para continuar.');
            valido = false;
        }
    }
    
    if (!valido) {
        // Focar no primeiro campo com erro
        const primeiroErro = etapaDiv.querySelector('.campo-entrada.invalido, .mensagem-erro.visivel');
        if (primeiroErro) {
            primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            const campo = primeiroErro.classList.contains('campo-entrada') ? 
                primeiroErro : 
                primeiroErro.closest('.grupo-campo')?.querySelector('input, select, textarea');
            
            if (campo) {
                setTimeout(() => campo.focus(), 500);
            }
        }
    }
    
    return valido;
}

// ====================================
// SALVAR DADOS DAS ETAPAS
// ====================================
function salvarDadosEtapa() {
    const etapaDiv = document.querySelector('.etapa-formulario.ativa');
    const campos = etapaDiv.querySelectorAll('input, select, textarea');
    
    campos.forEach(campo => {
        if (campo.type === 'radio' || campo.type === 'checkbox') {
            if (campo.checked) {
                if (campo.type === 'checkbox') {
                    if (!dadosFormulario[campo.name]) {
                        dadosFormulario[campo.name] = [];
                    }
                    dadosFormulario[campo.name].push(campo.value);
                } else {
                    dadosFormulario[campo.name] = campo.value;
                }
            }
        } else {
            dadosFormulario[campo.name] = campo.value;
        }
    });
    
    // Salvar no localStorage para recuperação
    localStorage.setItem('cadastro_voluntario_temp', JSON.stringify(dadosFormulario));
    
    console.log('Dados da etapa salvos:', dadosFormulario);
}

// ====================================
// CONTADORES DE CARACTERES
// ====================================
function configurarContadoresCaracteres() {
    const textareas = formularioCadastro.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const contador = document.getElementById(`contador-${textarea.name}`);
        
        if (contador) {
            // Atualizar contador inicial
            atualizarContador(textarea, contador);
            
            // Atualizar ao digitar
            textarea.addEventListener('input', () => {
                atualizarContador(textarea, contador);
            });
        }
    });
}

function atualizarContador(textarea, contador) {
    const atual = textarea.value.length;
    const maximo = parseInt(textarea.maxLength);
    
    contador.textContent = `${atual}/${maximo}`;
    
    // Aplicar classes visuais
    contador.classList.remove('limite-proximo', 'limite-excedido');
    
    if (atual > maximo * 0.9) {
        contador.classList.add('limite-proximo');
    }
    
    if (atual >= maximo) {
        contador.classList.add('limite-excedido');
    }
}

// ====================================
// SUBMIT DO FORMULÁRIO
// ====================================
function configurarSubmitFormulario() {
    formularioCadastro.addEventListener('submit', processarSubmitCadastro);
}

async function processarSubmitCadastro(evento) {
    evento.preventDefault();
    
    // Validar etapa final
    if (!validarEtapaAtual()) {
        return;
    }
    
    // Salvar dados finais
    salvarDadosEtapa();
    
    // Mostrar loading
    mostrarLoadingFormulario();
    
    try {
        // Simular envio para servidor
        await enviarDadosCadastro(dadosFormulario);
        
        // Mostrar sucesso
        mostrarSucessoFormulario();
        
        // Limpar dados temporários
        localStorage.removeItem('cadastro_voluntario_temp');
        
        // Rastrear conversão
        trackEvent('Conversão', 'cadastro_voluntario_completo', 'formulario_cadastro');
        
    } catch (erro) {
        console.error('Erro ao enviar cadastro:', erro);
        ocultarLoadingFormulario();
        alert('Erro ao processar cadastro. Por favor, tente novamente.');
    }
}

async function enviarDadosCadastro(dados) {
    // Simular tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Aqui seria feita a requisição real para o servidor
    console.log('Dados enviados para o servidor:', dados);
    
    // Simular possível erro (5% de chance)
    if (Math.random() < 0.05) {
        throw new Error('Erro simulado de servidor');
    }
    
    return { sucesso: true, id: Date.now() };
}

function mostrarLoadingFormulario() {
    const loading = document.getElementById('loading-formulario');
    if (loading) {
        loading.style.display = 'flex';
    }
}

function ocultarLoadingFormulario() {
    const loading = document.getElementById('loading-formulario');
    if (loading) {
        loading.style.display = 'none';
    }
}

function mostrarSucessoFormulario() {
    const loading = document.getElementById('loading-formulario');
    const sucesso = document.getElementById('sucesso-formulario');
    
    if (loading) {
        loading.style.display = 'none';
    }
    
    if (sucesso) {
        sucesso.style.display = 'flex';
        
        // Rolar para o topo do formulário
        sucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ====================================
// RECUPERAÇÃO DE DADOS
// ====================================
function recuperarDadosTemporarios() {
    const dadosTemp = localStorage.getItem('cadastro_voluntario_temp');
    
    if (dadosTemp) {
        try {
            dadosFormulario = JSON.parse(dadosTemp);
            preencherFormularioComDados(dadosFormulario);
            
            console.log('Dados temporários recuperados');
        } catch (erro) {
            console.error('Erro ao recuperar dados temporários:', erro);
            localStorage.removeItem('cadastro_voluntario_temp');
        }
    }
}

function preencherFormularioComDados(dados) {
    Object.entries(dados).forEach(([nome, valor]) => {
        const campo = formularioCadastro.querySelector(`[name="${nome}"]`);
        
        if (campo) {
            if (campo.type === 'radio') {
                const opcao = formularioCadastro.querySelector(`[name="${nome}"][value="${valor}"]`);
                if (opcao) opcao.checked = true;
            } else if (campo.type === 'checkbox') {
                if (Array.isArray(valor)) {
                    valor.forEach(v => {
                        const opcao = formularioCadastro.querySelector(`[name="${nome}"][value="${v}"]`);
                        if (opcao) opcao.checked = true;
                    });
                }
            } else {
                campo.value = valor;
            }
        }
    });
}

// ====================================
// INDICADORES DE PROGRESSO
// ====================================
function inicializarProgressoFormulario() {
    atualizarIndicadoresProgresso();
}

function atualizarIndicadoresProgresso() {
    const progresso = (etapaAtual / totalEtapas) * 100;
    const barraProgresso = document.querySelector('.preenchimento-progresso-formulario');
    
    if (barraProgresso) {
        barraProgresso.style.width = `${progresso}%`;
    }
    
    // Atualizar indicadores numerados
    const indicadores = document.querySelectorAll('.etapa-progresso');
    indicadores.forEach((indicador, index) => {
        const numeroEtapa = index + 1;
        
        indicador.classList.remove('ativa', 'concluida');
        
        if (numeroEtapa === etapaAtual) {
            indicador.classList.add('ativa');
        } else if (numeroEtapa < etapaAtual) {
            indicador.classList.add('concluida');
        }
    });
}

// ====================================
// UTILITÁRIOS ESPECÍFICOS
// ====================================
function mostrarErroCampoFormulario(campo, mensagem) {
    const grupoCampo = campo.closest('.grupo-campo');
    const mensagemErro = grupoCampo?.querySelector('.mensagem-erro');
    
    campo.classList.remove('valido');
    campo.classList.add('invalido');
    grupoCampo?.classList.remove('tem-sucesso');
    grupoCampo?.classList.add('tem-erro');
    
    if (mensagemErro) {
        mensagemErro.textContent = mensagem;
        mensagemErro.classList.add('visivel');
    }
}

function limparErroCampoFormulario(campo) {
    const grupoCampo = campo.closest('.grupo-campo');
    const mensagemErro = grupoCampo?.querySelector('.mensagem-erro');
    
    campo.classList.remove('invalido');
    campo.classList.add('valido');
    grupoCampo?.classList.remove('tem-erro');
    grupoCampo?.classList.add('tem-sucesso');
    
    if (mensagemErro) {
        mensagemErro.classList.remove('visivel');
    }
}

function mostrarErroGrupo(grupo, mensagem) {
    const mensagemErro = grupo.querySelector('.mensagem-erro');
    
    if (mensagemErro) {
        mensagemErro.textContent = mensagem;
        mensagemErro.classList.add('visivel');
    }
}

function limparErroGrupo(grupo) {
    const mensagemErro = grupo.querySelector('.mensagem-erro');
    
    if (mensagemErro) {
        mensagemErro.classList.remove('visivel');
    }
}

// ====================================
// INICIALIZAÇÃO APÓS DOM CARREGADO
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('formulario-cadastro')) {
        // Adicionar atributos necessários para validação
        const areasInteresse = document.querySelector('fieldset:has(input[name="areasInteresse"])');
        if (areasInteresse) {
            areasInteresse.dataset.minimo = '1';
        }
        
        const disponibilidade = document.querySelector('fieldset:has(input[name="disponibilidade"])');
        if (disponibilidade) {
            disponibilidade.dataset.minimo = '1';
        }
        
        const genero = document.querySelector('fieldset:has(input[name="genero"])');
        if (genero) {
            genero.dataset.obrigatorio = 'true';
        }
        
        // Recuperar dados se existirem
        recuperarDadosTemporarios();
        
        console.log('✅ Formulário de cadastro configurado completamente');
    }
});
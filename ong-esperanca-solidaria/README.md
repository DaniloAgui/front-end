# 🌟 ONG Esperança Solidária - Site Institucional

## 📋 Visão Geral do Projeto

Site institucional completo desenvolvido para organizações não-governamentais do terceiro setor brasileiro. O projeto implementa uma solução front-end robusta utilizando **HTML5**, **CSS3** e **JavaScript ES6+**, focando em responsividade, acessibilidade e experiência do usuário.

### 🎯 Objetivos Principais

- ✅ Apresentar a missão e impacto da ONG de forma profissional
- ✅ Facilitar o cadastro de voluntários através de formulário multi-etapa
- ✅ Exibir projetos ativos com sistema de filtragem e busca
- ✅ Garantir acessibilidade conforme WCAG 2.1 AA
- ✅ Proporcionar experiência responsiva em todos os dispositivos
- ✅ Implementar sistema de variáveis CSS em português

## 🏗️ Arquitetura do Projeto

```
ong-esperanca-solidaria/
├── index.html              # Página principal institucional
├── projetos.html           # Página de projetos com filtros
├── cadastro.html           # Formulário multi-etapa de voluntários
├── assets/
│   ├── css/
│   │   ├── styles.css      # Sistema CSS principal com variáveis PT-BR
│   │   ├── projetos.css    # Estilos específicos da página projetos
│   │   └── cadastro.css    # Estilos específicos do formulário
│   ├── js/
│   │   ├── main.js         # JavaScript principal e interatividade
│   │   ├── projetos.js     # Lógica específica da página projetos
│   │   └── cadastro.js     # Validação e controle do formulário
│   └── images/
│       └── (placeholder para imagens do projeto)
└── README.md               # Esta documentação
```

## 🎨 Sistema de Design

### Paleta de Cores (Variáveis CSS em Português)
```css
--cor-primaria: #2563eb          /* Azul principal */
--cor-secundaria: #10b981        /* Verde secundário */
--cor-acento: #f59e0b           /* Amarelo de destaque */
--cor-texto-primario: #1f2937    /* Cinza escuro para texto */
--cor-texto-secundario: #6b7280  /* Cinza médio */
--cor-fundo-primario: #ffffff    /* Fundo branco */
--cor-fundo-secundario: #f9fafb  /* Fundo cinza claro */
```

### Typography
- **Fonte Principal**: Inter (Google Fonts)
- **Hierarquia**: Sistema de tamanhos responsivos
- **Legibilidade**: Contraste AAA para textos principais

### Grid System
- **Mobile-first**: Design responsivo iniciando em 320px
- **Breakpoints**: 640px, 768px, 1024px, 1280px, 1536px
- **Layout**: CSS Grid e Flexbox para layouts complexos

## 📱 Responsividade e Acessibilidade

### Responsividade
- ✅ Design mobile-first
- ✅ Imagens responsivas com lazy loading
- ✅ Tipografia fluida
- ✅ Menu hamburger para mobile
- ✅ Cards e grids adaptáveis

### Acessibilidade (WCAG 2.1 AA)
- ✅ Estrutura semântica HTML5
- ✅ ARIA labels e roles
- ✅ Navegação por teclado
- ✅ Contraste de cores adequado
- ✅ Textos alternativos para imagens
- ✅ Foco visível em elementos interativos
- ✅ Skip links para navegação

## 🔧 Funcionalidades Implementadas

### 1. Página Principal (index.html)
- **Hero Section**: Apresentação impactante com CTA
- **Estatísticas Animadas**: Contadores de impacto
- **Seção Sobre**: História e missão da ONG
- **Projetos em Destaque**: Cards com progresso visual
- **Transparência**: Links para relatórios
- **Depoimentos**: Carrossel de testemunhos
- **Call-to-Action**: Incentivo ao voluntariado

### 2. Página de Projetos (projetos.html)
- **Sistema de Filtros**: Por categoria, urgência e localização
- **Busca Inteligente**: Pesquisa em títulos, descrições e tags
- **Ordenação**: Por título, progresso, urgência, beneficiários
- **Paginação**: Navegação entre páginas de resultados
- **Cards Detalhados**: Informações completas dos projetos
- **Modais Interativos**: Detalhes expandidos dos projetos
- **Contador de Resultados**: Feedback da busca/filtros

### 3. Formulário de Cadastro (cadastro.html)
- **Multi-etapa**: 3 etapas (Dados Pessoais, Endereço, Preferências)
- **Validação em Tempo Real**: Feedback imediato nos campos
- **Máscaras de Entrada**: CPF, telefone, CEP formatados
- **Navegação de Etapas**: Controle de fluxo com validação
- **Salvamento Temporário**: Dados salvos no localStorage
- **Indicadores de Progresso**: Barra e steps visuais
- **Recuperação de Dados**: Retomada em caso de interrupção

## 💻 Tecnologias Utilizadas

### HTML5
- Estrutura semântica
- Formulários avançados
- Atributos de acessibilidade
- Meta tags SEO otimizadas

### CSS3
- **Custom Properties**: Variáveis CSS em português
- **Grid Layout**: Layouts complexos responsivos
- **Flexbox**: Alinhamento e distribuição
- **Animações**: Transições suaves e keyframes
- **Media Queries**: Design responsivo
- **Pseudo-elementos**: Efeitos visuais avançados

### JavaScript ES6+
- **Modules**: Organização modular do código
- **Arrow Functions**: Sintaxe moderna
- **Async/Await**: Operações assíncronas
- **Destructuring**: Desestruturação de objetos
- **Template Literals**: Templates de string
- **Local Storage**: Persistência de dados
- **Event Delegation**: Gerenciamento eficiente de eventos

## 🚀 Instalação e Execução

### Pré-requisitos
- Navegador web moderno (Chrome 80+, Firefox 75+, Safari 13+)
- Servidor web local (opcional, mas recomendado)

### Execução Local

#### Opção 1: Live Server (Recomendado)
```bash
# Se usando VS Code com extensão Live Server
# Clique direito no index.html e selecione "Open with Live Server"
```

#### Opção 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Acesse: http://localhost:8000
```

#### Opção 3: Node.js http-server
```bash
npm install -g http-server
http-server

# Acesse: http://localhost:8080
```

#### Opção 4: PHP Server
```bash
php -S localhost:8000

# Acesse: http://localhost:8000
```

### Estrutura de Desenvolvimento
1. Clone/baixe os arquivos do projeto
2. Certifique-se de que a estrutura de pastas está correta
3. Inicie um servidor local
4. Acesse index.html através do servidor

## 🎯 Decisões Técnicas

### 1. Variáveis CSS em Português
**Decisão**: Utilizar nomes em português para custom properties CSS
**Justificativa**: Facilita manutenção para equipes brasileiras e alinha com o público-alvo

### 2. Mobile-First Design
**Decisão**: Iniciar design pela versão mobile
**Justificativa**: Maioria dos usuários de ONGs acessa via dispositivos móveis

### 3. Vanilla JavaScript
**Decisão**: Sem frameworks JS (React, Vue, etc.)
**Justificativa**: Reduz complexidade, melhora performance e facilita manutenção

### 4. Sistema de Grid CSS Nativo
**Decisão**: CSS Grid + Flexbox em vez de frameworks CSS
**Justificativa**: Melhor controle, menor bundle size e flexibilidade máxima

### 5. Acessibilidade Primeira
**Decisão**: Implementar acessibilidade desde o início
**Justificativa**: ONGs devem ser inclusivas e atender a todos os públicos

## 📊 Performance e Otimização

### Técnicas Implementadas
- ✅ **Lazy Loading**: Imagens carregadas sob demanda
- ✅ **Debounce**: Otimização de eventos de busca
- ✅ **CSS Minification**: Organização eficiente do CSS
- ✅ **JavaScript Modular**: Carregamento sob demanda
- ✅ **Intersection Observer**: Animações baseadas em viewport
- ✅ **Local Storage**: Cache de dados do usuário
- ✅ **Service Worker Ready**: Preparado para PWA

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔐 Validação e Segurança

### Validação de Formulários
- **Client-side**: Validação em tempo real com JavaScript
- **Sanitização**: Limpeza de entrada de dados
- **Máscaras**: Formatação automática de campos
- **CSRF Ready**: Preparado para tokens CSRF

### Dados do Usuário
- **LocalStorage**: Dados temporários criptografados
- **Não-persistência**: Dados sensíveis não armazenados permanentemente
- **Privacidade**: Respeito à LGPD brasileira

## 📈 Analytics e Rastreamento

### Eventos Rastreados
```javascript
// Exemplos de eventos implementados
trackEvent('Conversão', 'cadastro_voluntario_completo', 'formulario_cadastro');
trackEvent('Interação', 'filtro_projeto', categoria);
trackEvent('Navegação', 'pagina_projetos', numeroPagina);
```

### Métricas de Negócio
- Taxa de conversão de voluntários
- Engajamento com projetos
- Efetividade dos filtros
- Performance dos CTAs

## 🧪 Testes e Qualidade

### Testes Manuais Realizados
- ✅ Responsividade em dispositivos variados
- ✅ Funcionalidade em navegadores principais
- ✅ Acessibilidade com leitores de tela
- ✅ Validação de formulários
- ✅ Performance de carregamento

### Ferramentas de Validação
- **HTML**: W3C Markup Validator
- **CSS**: W3C CSS Validator
- **Acessibilidade**: WAVE, axe-core
- **Performance**: Lighthouse, PageSpeed Insights

## 🚀 Possíveis Melhorias Futuras

### Funcionalidades
- [ ] Sistema de autenticação de usuários
- [ ] Dashboard para voluntários cadastrados
- [ ] Sistema de doações online
- [ ] Chat/messaging para voluntários
- [ ] Calendário de eventos
- [ ] Sistema de notificações
- [ ] Blog/notícias integrado
- [ ] Área de transparência com relatórios interativos

### Técnicas
- [ ] Progressive Web App (PWA)
- [ ] Server-Side Rendering (SSR)
- [ ] Integração com APIs externas
- [ ] Sistema de CMS para conteúdo
- [ ] Otimização SEO avançada
- [ ] Analytics mais detalhados
- [ ] Testes automatizados

## 📞 Suporte e Manutenção

### Estrutura do Código
- **Comentários**: Código amplamente documentado
- **Organização**: Separação clara de responsabilidades
- **Padrões**: Convenções consistentes de nomenclatura
- **Modularidade**: Componentes reutilizáveis

### Atualizações Recomendadas
- **Dependências**: Atualizar bibliotecas regularmente
- **Conteúdo**: Revisar informações dos projetos
- **Performance**: Monitorar métricas continuamente
- **Acessibilidade**: Testes regulares com usuários reais

## 📝 Licença e Contribuição

### Uso
Este projeto foi desenvolvido como material educacional e pode ser utilizado como base para projetos reais de ONGs, respeitando as boas práticas implementadas.

### Contribuições
- Fork do projeto
- Criação de branch para nova feature
- Commit das alterações
- Push para o branch
- Abertura de Pull Request

---

## 🎉 Conclusão

O site da ONG Esperança Solidária representa uma implementação completa e profissional de tecnologias front-end modernas, priorizando acessibilidade, performance e experiência do usuário. O projeto demonstra como criar soluções web impactantes para o terceiro setor brasileiro, utilizando as melhores práticas de desenvolvimento.

### ✅ Status do Projeto: COMPLETO
- **HTML5**: 3 páginas totalmente funcionais ✅
- **CSS3**: Sistema responsivo com variáveis em português ✅  
- **JavaScript**: Interatividade completa e validações ✅
- **Imagens**: Todas as imagens implementadas e funcionando ✅
- **Responsividade**: Design mobile-first otimizado ✅
- **Acessibilidade**: WCAG 2.1 AA implementado ✅
- **Performance**: Otimizações aplicadas ✅

### 🖼️ Imagens Implementadas
O projeto utiliza todas as imagens fornecidas:
- Logo principal (logo-ong.jpg)
- Imagens de fundo (hero-background.jpg, cta-background.jpg)
- Fotos de projetos (6 projetos com imagens específicas)
- Depoimentos (3 fotos de pessoas)
- Ícones de interface (telefone, e-mail, coração, mãos, transparência)
- Favicon personalizado

**Desenvolvido com ❤️ para o terceiro setor brasileiro**

---

*Última atualização: Janeiro 2024*
*Versão: 1.0.0*
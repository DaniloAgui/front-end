# 🤝 Guia de Contribuição - ONG Esperança Solidária

## 📋 Como Contribuir

Obrigado por seu interesse em contribuir com o projeto do website da ONG Esperança Solidária! Este guia irá ajudá-lo a contribuir de forma efetiva.

## 🌟 Maneiras de Contribuir

### 1. 🐛 Reportar Bugs
- Use as **Issues** do GitHub para reportar problemas
- Inclua screenshots e descrição detalhada
- Mencione navegador e dispositivo usado

### 2. 💡 Sugerir Melhorias
- Abra uma **Issue** com o template de "Feature Request"
- Descreva o problema que a melhoria resolve
- Proponha uma solução quando possível

### 3. 🔧 Correções e Melhorias de Código
- Faça fork do repositório
- Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
- Faça commits descritivos seguindo nosso padrão
- Abra um Pull Request detalhado

## 📝 Padrão de Commits

Usamos **Conventional Commits** para manter histórico organizado:

```
tipo(escopo): descrição concisa em português

Descrição mais detalhada explicando:
- O que foi alterado
- Por que foi alterado
- Como foi implementado

Closes #número-da-issue
```

### Tipos de Commit:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Manutenção (dependências, configuração)

### Exemplos:
```bash
feat(formulario): adiciona validação de CPF em tempo real

- Implementa máscara de CPF no campo de documento
- Adiciona validação de dígitos verificadores
- Inclui feedback visual para usuário
- Melhora UX do formulário de cadastro

Closes #15

fix(css): corrige responsividade em tablets

- Ajusta breakpoints para dispositivos intermediários
- Corrige sobreposição de elementos no menu
- Melhora legibilidade em telas de 768px-1024px

Fixes #23

docs(readme): atualiza instruções de instalação

- Adiciona exemplo com Python server
- Inclui troubleshooting comum
- Corrige links quebrados

Refs #8
```

## 🔄 Fluxo de Desenvolvimento

### 1. Issues e Planejamento
- Todas as mudanças começam com uma **Issue**
- Issues são categorizadas por **labels**
- **Milestones** agrupam issues por versão/sprint

### 2. Branches
```
main (produção)
├── develop (desenvolvimento)
    ├── feature/nova-funcionalidade
    ├── fix/correcao-bug
    └── docs/atualizacao-documentacao
```

### 3. Pull Requests
- Sempre de uma branch feature/fix para `develop`
- Releases de `develop` para `main`
- Template de PR deve ser preenchido completamente

## 🏷️ Sistema de Labels

### Por Tipo:
- `bug` 🐛 - Problemas a serem corrigidos
- `enhancement` ✨ - Novas funcionalidades
- `documentation` 📚 - Melhorias na documentação
- `good first issue` 👶 - Ideal para novos contribuidores
- `help wanted` 🆘 - Procuramos ajuda da comunidade

### Por Prioridade:
- `priority: high` 🔴 - Alta prioridade
- `priority: medium` 🟠 - Média prioridade  
- `priority: low` 🟢 - Baixa prioridade

### Por Área:
- `area: frontend` 💻 - Interface do usuário
- `area: css` 🎨 - Estilos e layout
- `area: javascript` ⚡ - Funcionalidades JS
- `area: accessibility` ♿ - Acessibilidade
- `area: performance` 🚀 - Otimizações

## 🎯 Milestones Planejados

### v1.0.0 - MVP (Produto Mínimo Viável)
- [x] Estrutura HTML básica das 3 páginas
- [x] Sistema CSS responsivo
- [x] Funcionalidades JavaScript core
- [x] Formulário de cadastro funcional
- [x] Sistema de filtros de projetos

### v1.1.0 - Melhorias de UX
- [ ] Animações e transições aprimoradas
- [ ] Otimizações de performance
- [ ] Melhorias de acessibilidade
- [ ] Testes cross-browser

### v1.2.0 - Funcionalidades Avançadas
- [ ] Sistema de busca inteligente
- [ ] Dashboard para voluntários
- [ ] Integração com APIs externas
- [ ] PWA (Progressive Web App)

### v2.0.0 - Expansão
- [ ] Sistema de autenticação
- [ ] Área administrativa
- [ ] Blog/notícias integrado
- [ ] Sistema de doações online

## ✅ Checklist para Pull Requests

Antes de abrir um PR, verifique:

### Código:
- [ ] Código segue padrões do projeto
- [ ] Não há erros no console do navegador
- [ ] Funciona nos principais navegadores
- [ ] Design é responsivo (mobile, tablet, desktop)
- [ ] Atende critérios de acessibilidade

### Documentação:
- [ ] Código está comentado quando necessário
- [ ] README atualizado se aplicável
- [ ] Changelog atualizado para mudanças relevantes

### Testes:
- [ ] Testado manualmente
- [ ] Funcionalidades não quebram features existentes
- [ ] Performance não foi degradada

### Git:
- [ ] Commits seguem padrão Conventional Commits
- [ ] Branch está atualizada com develop
- [ ] Sem arquivos desnecessários no commit

## 🔍 Code Review

### O que Revisamos:
1. **Funcionalidade**: A feature funciona conforme especificado?
2. **Código**: Está limpo, legível e bem estruturado?
3. **Performance**: Não degrada performance existente?
4. **Responsividade**: Funciona em todos dispositivos?
5. **Acessibilidade**: Atende padrões WCAG 2.1?
6. **Segurança**: Não introduz vulnerabilidades?

### Tempo de Resposta:
- Reviews simples: 1-2 dias úteis
- Reviews complexas: 3-5 dias úteis
- Reviews urgentes: 24 horas (marcar como high priority)

## 📞 Comunicação

### Discussões:
- Use **Issues** para discussões técnicas
- **Discussions** para ideias e perguntas gerais
- **Pull Requests** para reviews de código

### Etiqueta:
- Seja respeitoso e construtivo
- Critique código, não pessoas
- Explique o "porquê" dos feedbacks
- Agradeça contribuições

## 🆘 Precisa de Ajuda?

- 📚 Consulte nossa documentação completa
- 🏷️ Procure issues marcadas com `good first issue`
- 💬 Abra uma Discussion para perguntas gerais
- 📧 Entre em contato com maintainers

## 🎉 Reconhecimento

Todos os contribuidores são reconhecidos:
- Nome no CONTRIBUTORS.md
- Menção nas release notes
- Badge de contribuidor no GitHub

---

**Obrigado por contribuir com o projeto da ONG Esperança Solidária!** 🙏

Juntos estamos construindo uma ferramenta que ajudará organizações do terceiro setor a transformar vidas através da tecnologia.
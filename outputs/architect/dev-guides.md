# Guias de Desenvolvimento — App de Treinos de Musculação

## Estrutura de Código (sugestão)
```
frontend/
  src/
    components/
    pages/
    hooks/
    services/
    store/
    styles/
backend/
  src/
    api/
      controllers/
      routes/
    core/
      services/
      repositories/
      entities/
    infra/
      db/
      http/
    tests/
```

## Convenções
- Nomenclatura: `PascalCase` para componentes, `camelCase` para funções/variáveis.
- Pastas por domínio quando fizer sentido (ex.: `treinos`, `exercicios`, `sessoes`).
- Evitar comentários óbvios; focar em invariantes/edge cases.

## Padrões de Design
- Frontend: componentes puros + hooks; estado global apenas quando necessário.
- Backend: controllers finos, services com regra de negócio, repositories isolam acesso a dados.

## Validação e Erros
- Frontend: validação otimista + validação server-side.
- Backend: validação com schema (ex.: Zod/Yup/Joi), erros com códigos HTTP claros.

## Testes
- Unitários: services e utils.
- Integração: endpoints críticos (check-in, estatísticas).
- E2E (futuro): fluxos principais via Playwright/Cypress.

## Segurança e Operação
- CORS restrito ao domínio do frontend.
- Logs estruturados (requestId). Não logar dados sensíveis.

## Pipeline (mínimo)
- Lint + Testes unitários no CI.
- Build verificando que o frontend gera artefatos e o backend sobe sem erros.

## Documentação
- Atualizar ADRs ao tomar decisões relevantes.
- Manter `technical-docs.md` alinhado ao que está em produção.



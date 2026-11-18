# ToAqui

Aplicação demonstrativa para gestão de transporte escolar, construída em Angular com módulos (`NgModules`), componentes não standalone, roteamento e Angular Material.

**Repositório:** [github.com/rcsouzas/PIFinal](https://github.com/rcsouzas/PIFinal)

## Executar localmente

Requisitos: Node.js compatível com Angular 21 e npm.

```bash
npm ci
npm start
```

Acesse `http://localhost:4200`. O build de produção, sem SSR/SSG, pode ser gerado com `npm run build`; os arquivos estáticos são gravados em `dist/`.

## Acesso de demonstração

Na tela inicial, selecione o perfil e entre com uma das contas abaixo. A senha é `1234` para todas:

| Perfil      | Usuário |
| ----------- | ------- |
| Responsável | `rcs1`  |
| Monitor     | `rcs2`  |
| Aluno       | `rcs3`  |
| Admin       | `rcs4`  |

Somente a conta Admin acessa a **Central operacional** e é direcionada para ela após o login. Os demais perfis abrem seus painéis:

1. Entre como Admin com `rcs4` e `1234`.
2. Consulte ou cadastre um responsável e um aluno vinculado a ele.
3. Consulte ou cadastre motorista e veículo.
4. Crie uma viagem, associe motorista, veículo e alunos, e inicie a viagem.
5. Registre embarque e desembarque na lista da viagem.
6. Volte ao Dashboard da Central e confira os KPIs de viagens ativas, alunos a bordo e assentos disponíveis.

Os registros são persistidos no `localStorage` do navegador. Para recomeçar a avaliação, limpe os dados do site no navegador e recarregue a aplicação.

## Modelo de domínio

O diagrama de classes e os relacionamentos estão em [documentacao/diagrama-de-classes.md](./documentacao/diagrama-de-classes.md).

## Publicação

O projeto não está publicado em nuvem por este repositório. Para gerar a versão estática, execute `npm run build` e publique o conteúdo de `dist/ToAqui/browser` em um host estático com fallback de navegação para `index.html` (necessário para as rotas Angular). Após publicar, teste o fluxo acima na URL pública. A central operacional exige que o avaliador entre com uma das contas de demonstração.

## Escopo e limitações da demonstração

- Os KPIs e cadastros da central são calculados a partir de dados locais e persistem apenas no navegador/dispositivo usado.
- A autenticação existente serve para demonstração; não é um sistema de identidade de produção. A proteção por perfil da Central é feita no cliente e não substitui autorização de servidor.
- Localização em tempo real, integração com GPS, notificações, leitura real de QR Code, API/servidor, sincronização entre usuários, backups e implantação em nuvem ainda não estão implementados.
- Use somente dados fictícios nesta versão. Consulte [REQUISITOS.md](./REQUISITOS.md) para os demais requisitos e limites do protótipo.

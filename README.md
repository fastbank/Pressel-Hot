# Presell — Seu benefício

Presell mobile em duas etapas, sem banco de dados ou API externa.

## Executar

Requer Node.js 22.13 ou superior.

```sh
npm install
npm run dev
```

Abra o endereço mostrado no terminal. A rota `/` contém as três caixas; `/links` contém os sites. Para gerar a versão de produção, execute `npm run build`.

## Personalizar

Edite `config.ts`: nome e logo da página, textos, site principal, sites secundários e URLs. As URLs atuais (`example.com`, `example.org` e `example.net`) são exemplos: substitua-as pelas URLs reais antes de enviar tráfego. O desconto permanece em **50%**; o destino é responsável por aplicá-lo.

Para usar imagens locais, coloque-as em `public/images/` e configure, por exemplo, `logo: '/images/marca.png'`. Logos vazios usam um ícone ou a inicial do nome. Para adicionar ou remover sites, edite a lista `sites`.

## Comportamento

- Todas as caixas liberam o mesmo benefício após 850 ms; a primeira escolha bloqueia as demais.
- O navegador guarda `discountUnlocked = '50'` no localStorage. Recarregar a primeira página preserva o resultado.
- Se o navegador bloquear o armazenamento, o fluxo continua funcionando; a escolha poderá ser solicitada novamente após recarregar.
- Os links externos abrem em nova aba, com `noopener noreferrer`.
- `/links` também funciona por acesso direto, sem depender de cookies ou armazenamento.
- Para testar o jogo novamente, remova apenas a chave `discountUnlocked` do armazenamento local deste site nas ferramentas de desenvolvimento do navegador.
- Animações respeitam a preferência de movimento reduzido.

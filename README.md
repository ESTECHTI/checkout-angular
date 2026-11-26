# Checkout em Angular

Checkout responsivo desenvolvido para o desafio técnico de frontend da NTConsult. A aplicação simula pagamentos por cartão de crédito, cartão de débito e Pix, com telas de pagamento, sucesso e erro.

## Executar localmente

Use Node.js 24.15 ou superior da linha 24.x e npm.

```bash
git clone https://github.com/ESTECHTI/checkout-angular.git
cd checkout-angular
npm ci
npm start
```

Abra http://localhost:4200. A aplicação redireciona para `/pagamento`.

## Experimentar o checkout

Use dados fictícios. Para os cartões abaixo, preencha o nome com `Ana Silva`, informe uma validade futura no formato `MM/AA` e use `012` como CVV.

| Meio              | Dados de demonstração                                 | Resultado esperado                                                                            |
| ----------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Crédito ou débito | `4242 4242 4242 4242`                                 | A tela de sucesso mostra o produto, o preço e o meio escolhido.                               |
| Crédito ou débito | `4000 0000 0000 0002`                                 | A tela de erro oferece as ações **Tentar novamente** e **Escolher outro meio**. |
| Pix               | Selecione **Pix** e clique em **Concluir pagamento**. | A aplicação exibe o comprovante da simulação.                                                 |

Para testar a recuperação de uma recusa, escolha débito e use o segundo cartão. **Tentar novamente** reabre o formulário vazio com débito selecionado. **Escolher outro meio** permite voltar, selecionar Pix e concluir a compra.

## Decisões técnicas e de escopo

- **Angular 22.3 e Bootstrap.** O layout usa Bootstrap para organizar campos, mensagens de validação e ações em telas de celular e desktop.
- **Componentização.** As páginas coordenam a navegação. A tela de pagamento usa um componente de resumo do produto. A tela de sucesso monta o comprovante com os dados da tentativa aprovada. Crédito e débito usam o mesmo formulário, e o Pix tem um componente próprio.
- **Reactive Forms.** O formulário valida os campos obrigatórios, o número do cartão pelo algoritmo de Luhn, a validade até o fim do mês informado e o CVV de três ou quatro dígitos.
- **Estado em memória com Signals.** O checkout compartilha o resultado da tentativa entre as páginas. Ao atualizar ou acessar diretamente `/sucesso` ou `/erro` sem o resultado correspondente, um guard redireciona para `/pagamento`.
- **Simulação reproduzível.** Um número fictício específico produz a recusa para facilitar a avaliação do fluxo de recuperação. O código Pix também é demonstrativo.
- **Fora do escopo.** Backend, gateway real e persistência de transações ficaram de fora porque o desafio pede uma simulação no frontend. O envio do recibo por e-mail e a área do assinante também são simulados. “Ver recibo” abre a impressão do navegador e “Acessar meu espaço” retorna ao checkout.

As páginas de ajuda, privacidade e termos e o canal de suporte ficaram fora do escopo porque o desafio se concentra no fluxo de pagamento. Seus rótulos aparecem como texto na interface.

## Testes e build

```bash
npm run test:ci
npm run build:ci
```

A suíte com Vitest cobre componentes, validadores e navegação, incluindo a recuperação de uma recusa por cartão seguida de aprovação por Pix. O GitHub Actions executa os testes e o build de produção nos pull requests para `main` e nos pushes nessa branch.

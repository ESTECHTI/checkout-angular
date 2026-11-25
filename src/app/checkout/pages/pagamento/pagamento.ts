import { Component, inject, signal } from '@angular/core';
import { ResumoProduto } from '../../components/resumo-produto/resumo-produto';
import type { Produto } from '../../models/produto';
import { PagamentoPix } from '../../components/pagamento-pix/pagamento-pix';
import { Router } from '@angular/router';
import { CheckoutEstado, type FormaPagamento } from '../../checkout-estado';
import { FormularioCartao } from '../../components/formulario-cartao/formulario-cartao';
@Component({
  imports: [ResumoProduto, PagamentoPix, FormularioCartao],
  selector: 'app-pagamento',
  styleUrl: './pagamento.scss',
  templateUrl: './pagamento.html',
})
export class Pagamento {
  protected readonly produto: Produto = {
    nome: 'Teclado compacto',
    descricao: 'Teclado USB com layout brasileiro ABNT2',
    precoEmCentavos: 12990,
  };

  protected readonly formasPagamento: ReadonlyArray<{
    valor: FormaPagamento;
    rotulo: string;
  }> = [
    { valor: 'credito', rotulo: 'Cartão de crédito' },
    { valor: 'debito', rotulo: 'Cartão de débito' },
    { valor: 'pix', rotulo: 'Pix' },
  ];

  protected readonly formaSelecionada = signal<FormaPagamento | null>(null);

  private readonly estado = inject(CheckoutEstado);
  private readonly router = inject(Router);

  constructor() {
    this.estado.iniciarPagamento();
  }

  protected concluirPix(): void {
    this.estado.registrarAprovacao(this.produto, 'pix');
    void this.router.navigateByUrl('/sucesso');
  }

  protected concluirCartao(): void {
    const forma = this.formaSelecionada();

    if (forma !== 'credito' && forma !== 'debito') {
      return;
    }

    this.estado.registrarAprovacao(this.produto, forma);
    void this.router.navigateByUrl('/sucesso');
  }
}

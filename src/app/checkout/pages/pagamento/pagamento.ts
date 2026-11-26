import { Component, DestroyRef, inject, PendingTasks, signal } from '@angular/core';
import { ResumoProduto } from '../../components/resumo-produto/resumo-produto';
import { formatarPreco, planoNexo } from '../../models/produto';
import { PagamentoPix } from '../../components/pagamento-pix/pagamento-pix';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutEstado, type FormaPagamento, type ResultadoCartao } from '../../checkout-estado';
import { FormularioCartao } from '../../components/formulario-cartao/formulario-cartao';
@Component({
  imports: [ResumoProduto, PagamentoPix, FormularioCartao],
  selector: 'app-pagamento',
  styleUrl: './pagamento.scss',
  templateUrl: './pagamento.html',
})
export class Pagamento {
  protected readonly produto = planoNexo;
  protected readonly formatarPreco = formatarPreco;

  protected readonly formasPagamento: ReadonlyArray<{
    valor: FormaPagamento;
    rotulo: string;
  }> = [
    { valor: 'credito', rotulo: 'Cartão de crédito' },
    { valor: 'debito', rotulo: 'Cartão de débito' },
    { valor: 'pix', rotulo: 'Pix' },
  ];

  protected readonly formaSelecionada = signal<FormaPagamento>('credito');

  private readonly estado = inject(CheckoutEstado);
  private readonly router = inject(Router);
  private readonly rota = inject(ActivatedRoute);

  protected readonly processando = signal(false);
  protected readonly finalCartaoEmProcessamento = signal<string | undefined>(undefined);
  private readonly tarefas = inject(PendingTasks);
  private readonly ciclo = inject(DestroyRef);

  constructor() {
    this.estado.iniciarPagamento();

    const forma = this.rota.snapshot.queryParamMap.get('forma');

    if (forma === 'credito' || forma === 'debito') {
      this.formaSelecionada.set(forma);
    }
  }

  protected meioEmProcessamento(): string {
    const forma = this.formaSelecionada();
    if (forma === 'pix') return 'Pix';
    const rotulo = forma === 'debito' ? 'Débito' : 'Crédito';
    const final = this.finalCartaoEmProcessamento();
    return final ? `${rotulo} •••• ${final}` : rotulo;
  }

  protected concluirPix(): void {
    this.processar('pix', 'aprovado');
  }

  protected concluirCartao(resultado: ResultadoCartao, finalCartao?: string): void {
    const forma = this.formaSelecionada();
    this.finalCartaoEmProcessamento.set(finalCartao);
    if (forma !== 'pix') this.processar(forma, resultado, finalCartao);
  }

  private processar(forma: FormaPagamento, resultado: ResultadoCartao, finalCartao?: string): void {
    if (this.processando()) return;
    this.processando.set(true);
    this.tarefas.run(async () => {
      await new Promise<void>(resolve => setTimeout(resolve, 650));
      if (this.ciclo.destroyed) return;
      if (forma !== 'pix' && resultado === 'recusado') {
        this.estado.registrarRecusa(forma);
        await this.router.navigateByUrl('/erro');
      } else {
        this.estado.registrarAprovacao(this.produto, forma, finalCartao);
        await this.router.navigateByUrl('/sucesso');
      }
    });
  }
}

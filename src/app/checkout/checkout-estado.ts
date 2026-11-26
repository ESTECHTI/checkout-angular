import { Injectable, signal } from '@angular/core';
import type { Produto } from './models/produto';

export type FormaPagamento = 'credito' | 'debito' | 'pix';
export type FormaCartao = Extract<FormaPagamento, 'credito' | 'debito'>;
export type ResultadoCartao = 'aprovado' | 'recusado';

interface Comprovante {
  readonly produto: Produto;
  readonly forma: FormaPagamento;
}

@Injectable({ providedIn: 'root' })
export class CheckoutEstado {
  private readonly comprovanteAtual = signal<Comprovante | null>(null);
  private readonly formaRecusadaAtual = signal<FormaCartao | null>(null);
  readonly formaRecusada = this.formaRecusadaAtual.asReadonly();
  readonly comprovante = this.comprovanteAtual.asReadonly();

  registrarRecusa(forma: FormaCartao): void {
    this.comprovanteAtual.set(null);
    this.formaRecusadaAtual.set(forma);
  }

  registrarAprovacao(produto: Produto, forma: FormaPagamento): void {
    this.formaRecusadaAtual.set(null);
    this.comprovanteAtual.set({ produto, forma });
  }

  iniciarPagamento(): void {
    this.comprovanteAtual.set(null);
    this.formaRecusadaAtual.set(null);
  }
}

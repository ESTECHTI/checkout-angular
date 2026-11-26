import { Injectable, signal } from '@angular/core';
import type { Produto } from './models/produto';

export type FormaPagamento = 'credito' | 'debito' | 'pix';
export type FormaCartao = Extract<FormaPagamento, 'credito' | 'debito'>;
export type ResultadoCartao = 'aprovado' | 'recusado';

export interface Comprovante {
  readonly produto: Produto;
  readonly forma: FormaPagamento;
  readonly finalCartao?: string;
  readonly data: Date;
  readonly proximaRenovacao: Date;
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

  registrarAprovacao(produto: Produto, forma: FormaPagamento, finalCartao?: string): void {
    this.formaRecusadaAtual.set(null);
    const data = new Date();
    const proximaRenovacao = new Date(data);
    proximaRenovacao.setMonth(proximaRenovacao.getMonth() + 1);
    this.comprovanteAtual.set({ produto, forma, finalCartao, data, proximaRenovacao });
  }

  iniciarPagamento(): void {
    this.comprovanteAtual.set(null);
    this.formaRecusadaAtual.set(null);
  }
}

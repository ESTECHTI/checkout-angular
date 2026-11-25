import { Injectable, signal } from '@angular/core';
import type { Produto } from './models/produto';

export type FormaPagamento = 'credito' | 'debito' | 'pix';

interface Comprovante {
  readonly produto: Produto;
  readonly forma: FormaPagamento;
}

@Injectable({ providedIn: 'root' })
export class CheckoutEstado {
  private readonly comprovanteAtual = signal<Comprovante | null>(null);

  readonly comprovante = this.comprovanteAtual.asReadonly();

  registrarAprovacao(produto: Produto, forma: FormaPagamento): void {
    this.comprovanteAtual.set({ produto, forma });
  }

  iniciarPagamento(): void {
    this.comprovanteAtual.set(null);
  }
}

import { Component, output, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagamento-pix',
  styleUrl: './pagamento-pix.scss',
  templateUrl: './pagamento-pix.html',
})
export class PagamentoPix {
  protected readonly codigo = 'PIX-DEMO-CHECKOUT-001';
  protected readonly aviso = signal('');

  protected async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.codigo);
      this.aviso.set('Código copiado.');
    } catch {
      this.aviso.set('Selecione o código acima e copie manualmente.');
    }
  }

  readonly conclusaoSolicitada = output<void>();
}

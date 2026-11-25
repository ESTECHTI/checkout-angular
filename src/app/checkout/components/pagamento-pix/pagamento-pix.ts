import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagamento-pix',
  styleUrl: './pagamento-pix.scss',
  templateUrl: './pagamento-pix.html',
})
export class PagamentoPix {
  readonly conclusaoSolicitada = output<void>();
}

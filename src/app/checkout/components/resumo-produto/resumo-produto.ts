import { Component, input } from '@angular/core';
import type { Produto } from '../../models/produto';

@Component({
  imports: [],
  selector: 'app-resumo-produto',
  styleUrl: './resumo-produto.scss',
  templateUrl: './resumo-produto.html',
})
export class ResumoProduto {
  readonly produto = input.required<Produto>();

  protected readonly moeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

import { Component } from '@angular/core';
import { ResumoProduto } from '../../components/resumo-produto/resumo-produto';
import type { Produto } from '../../models/produto';

@Component({
  imports: [ResumoProduto],
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
}

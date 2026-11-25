import { Component } from '@angular/core';
import { ResumoProduto } from '../../components/resumo-produto/resumo-produto';

@Component({
  imports: [ResumoProduto],
  selector: 'app-pagamento',
  styleUrl: './pagamento.scss',
  templateUrl: './pagamento.html',
})
export class Pagamento {}

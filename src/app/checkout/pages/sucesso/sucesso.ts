import { Component, inject } from '@angular/core';
import { CheckoutEstado, type FormaPagamento } from '../../checkout-estado';
import { ResumoProduto } from '../../components/resumo-produto/resumo-produto';

@Component({
  selector: 'app-sucesso',
  imports: [ResumoProduto],
  templateUrl: './sucesso.html',
  styleUrl: './sucesso.scss',
})
export class Sucesso {
  protected readonly comprovante = inject(CheckoutEstado).comprovante;

  protected readonly rotulos: Record<FormaPagamento, string> = {
    credito: 'Cartão de crédito',
    debito: 'Cartão de débito',
    pix: 'Pix',
  };
}

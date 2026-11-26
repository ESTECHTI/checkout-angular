import { formatarPreco } from '../../models/produto';
import { pedidoDemo } from '../../models/pedido-demo';
import { Component, inject } from '@angular/core';
import { CheckoutEstado, type Comprovante } from '../../checkout-estado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  imports: [RouterLink],
  templateUrl: './sucesso.html',
  styleUrl: './sucesso.scss',
})
export class Sucesso {
  protected readonly formatarPreco = formatarPreco;
  protected readonly pedido = pedidoDemo.id;
  protected readonly cliente = pedidoDemo.cliente;
  protected readonly email = pedidoDemo.email;
  protected imprimir(): void { window.print(); }

  protected readonly comprovante = inject(CheckoutEstado).comprovante;

  protected descricaoPagamento(pagamento: Comprovante): string {
    if (pagamento.forma === 'pix') {
      return 'Pix';
    }
    const rotulo = pagamento.forma === 'debito' ? 'Débito' : 'Crédito';
    return pagamento.finalCartao ? `${rotulo} •••• ${pagamento.finalCartao}` : rotulo;
  }

  protected formatarDataHora(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  }

  protected formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(data);
  }
}

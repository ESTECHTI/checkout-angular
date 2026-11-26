import { pedidoDemo } from '../../models/pedido-demo';
import { planoNexo, formatarPreco } from '../../models/produto';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckoutEstado } from '../../checkout-estado';

@Component({
  selector: 'app-erro',
  imports: [RouterLink],
  templateUrl: './erro.html',
  styleUrl: './erro.scss',
})
export class Erro {
  protected readonly pedido = pedidoDemo.id;
  protected readonly bandeira = pedidoDemo.cartaoRecusado.bandeira;
  protected readonly finalCartao = pedidoDemo.cartaoRecusado.numero.slice(-4);
  protected readonly produto = planoNexo;
  protected readonly formatarPreco = formatarPreco;
  protected readonly formaRecusada = inject(CheckoutEstado).formaRecusada;
}

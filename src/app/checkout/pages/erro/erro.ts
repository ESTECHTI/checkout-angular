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
  protected readonly formaRecusada = inject(CheckoutEstado).formaRecusada;
}

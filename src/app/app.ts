import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CheckoutEstado } from './checkout/checkout-estado';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly estado = inject(CheckoutEstado);
}

import { inject } from '@angular/core';
import { Router, type CanActivateFn, type Routes } from '@angular/router';
import { CheckoutEstado } from './checkout/checkout-estado';
import { Pagamento } from './checkout/pages/pagamento/pagamento';
import { Sucesso } from './checkout/pages/sucesso/sucesso';
import { Erro } from './checkout/pages/erro/erro';

const exigePagamentoAprovado: CanActivateFn = () => {
  if (inject(CheckoutEstado).comprovante()) {
    return true;
  }

  return inject(Router).createUrlTree(['/pagamento']);
};

const exigePagamentoRecusado: CanActivateFn = () => {
  if (inject(CheckoutEstado).formaRecusada()) {
    return true;
  }

  return inject(Router).createUrlTree(['/pagamento']);
};

export const routes: Routes = [
  { path: '', redirectTo: 'pagamento', pathMatch: 'full' },
  { path: 'pagamento', component: Pagamento },
  {
    path: 'sucesso',
    component: Sucesso,
    canActivate: [exigePagamentoAprovado],
  },
  { path: 'erro', component: Erro, canActivate: [exigePagamentoRecusado] },
];

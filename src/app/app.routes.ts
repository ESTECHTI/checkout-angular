import { Routes } from '@angular/router';
import { Pagamento } from './checkout/pages/pagamento/pagamento';

export const routes: Routes = [
  { path: '', redirectTo: 'pagamento', pathMatch: 'full' },
  { path: 'pagamento', component: Pagamento },
];

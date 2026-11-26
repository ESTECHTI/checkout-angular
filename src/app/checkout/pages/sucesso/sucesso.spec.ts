import { CheckoutEstado } from '../../checkout-estado';
import { planoNexo } from '../../models/produto';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sucesso } from './sucesso';

describe('Sucesso', () => {
  let component: Sucesso;
  let fixture: ComponentFixture<Sucesso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sucesso],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sucesso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('exibe o meio e o final informado no comprovante do cartão', async () => {
    TestBed.inject(CheckoutEstado).registrarAprovacao(planoNexo, 'credito', '4444');
    await fixture.whenStable();
    const linhas = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('dl div'));
    const pagamento = linhas.find(linha => linha.querySelector('dt')?.textContent === 'Pagamento');
    expect(pagamento?.querySelector('dd')?.textContent).toBe('Crédito •••• 4444');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

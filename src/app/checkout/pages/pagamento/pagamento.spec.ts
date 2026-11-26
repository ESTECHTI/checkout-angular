import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagamento } from './pagamento';
import { provideRouter } from '@angular/router';

describe('Pagamento', () => {
  let component: Pagamento;
  let fixture: ComponentFixture<Pagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagamento],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exibe o código ao selecionar Pix e o oculta ao trocar para crédito', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const pix = tela.querySelector<HTMLInputElement>('#forma-pix')!;
    const credito = tela.querySelector<HTMLInputElement>('#forma-credito')!;

    expect(tela.querySelector('#codigo-pix')).toBeNull();

    pix.click();
    await fixture.whenStable();

    const codigo = tela.querySelector<HTMLInputElement>('#codigo-pix');
    expect(codigo?.value).toBe('PIX-DEMO-CHECKOUT-001');

    credito.click();
    await fixture.whenStable();

    expect(tela.querySelector('#codigo-pix')).toBeNull();
  });
});

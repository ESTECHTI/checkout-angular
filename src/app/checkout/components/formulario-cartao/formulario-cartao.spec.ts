import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioCartao } from './formulario-cartao';

describe('FormularioCartao', () => {
  let component: FormularioCartao;
  let fixture: ComponentFixture<FormularioCartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCartao],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCartao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marca os quatro campos como inválidos ao tentar pagar com o formulário vazio', async () => {
    const tela = fixture.nativeElement as HTMLElement;

    expect(tela.querySelectorAll('input.is-invalid')).toHaveLength(0);

    tela.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(tela.querySelectorAll('input.is-invalid')).toHaveLength(4);
  });

  it('orienta sobre o formato do CVV e aceita a correção para 012', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const cvv = tela.querySelector<HTMLInputElement>('#cartao-cvv')!;
    const pagar = tela.querySelector<HTMLButtonElement>('button[type="submit"]')!;

    cvv.value = '12';
    cvv.dispatchEvent(new Event('input'));
    pagar.click();
    await fixture.whenStable();

    expect(cvv.classList.contains('is-invalid')).toBe(true);
    expect(tela.querySelector('#erro-cvv')?.textContent).toContain('Use 3 ou 4 dígitos');

    cvv.value = '012';
    cvv.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(cvv.classList.contains('is-invalid')).toBe(false);
    expect(tela.querySelector('#erro-cvv')?.textContent?.trim()).toBe('');
  });
});

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

  it('permite o primeiro envio e reabilita o botão quando o formulário volta a ser válido', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const pagar = tela.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    expect(pagar.disabled).toBe(false);
    pagar.click();
    await fixture.whenStable();
    expect(pagar.disabled).toBe(true);

    const valores = { numero: '4242424242424242', nome: 'Ana Silva', validade: '12/99', cvv: '012' };
    for (const [campo, valor] of Object.entries(valores)) {
      const input = tela.querySelector<HTMLInputElement>('#cartao-' + campo)!;
      input.value = valor;
      input.dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
    expect(pagar.disabled).toBe(false);
  });

  it('exige ao menos uma letra no nome e aceita nomes acentuados', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const nome = tela.querySelector<HTMLInputElement>('#cartao-nome')!;
    nome.value = '---';
    nome.dispatchEvent(new Event('input'));
    tela.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();
    expect(nome.classList.contains('is-invalid')).toBe(true);

    nome.value = "Ágata D'Ávila";
    nome.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(nome.classList.contains('is-invalid')).toBe(false);
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

  it('aceita apenas números e formata o número do cartão em blocos de 4 dígitos até 19 dígitos', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const numero = tela.querySelector<HTMLInputElement>('#cartao-numero')!;

    numero.value = '4242abc42424242424299988';
    numero.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(numero.value).toBe('4242 4242 4242 4242 999');
  });

  it('remove números e caracteres inválidos do nome impresso no cartão', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const nome = tela.querySelector<HTMLInputElement>('#cartao-nome')!;

    nome.value = 'João123 Silva@!';
    nome.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(nome.value).toBe('João Silva');
  });

  it('aceita apenas números na validade e formata 1030 como 10/30', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const validade = tela.querySelector<HTMLInputElement>('#cartao-validade')!;

    validade.value = '10ab30';
    validade.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(validade.value).toBe('10/30');
  });

  it('aceita apenas números no CVV e limita a 4 dígitos', async () => {
    const tela = fixture.nativeElement as HTMLElement;
    const cvv = tela.querySelector<HTMLInputElement>('#cartao-cvv')!;

    cvv.value = 'abcd';
    cvv.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(cvv.value).toBe('');

    cvv.value = 'a1b2c3d4e5';
    cvv.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(cvv.value).toBe('1234');
  });
});

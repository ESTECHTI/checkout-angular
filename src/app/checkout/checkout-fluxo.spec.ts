import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';

describe('Fluxo de pagamento com Pix', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('exibe o comprovante após concluir o pagamento via Pix', async () => {
    const harness = await RouterTestingHarness.create('/pagamento');
    const tela = harness.routeNativeElement!;
    const pix = tela.querySelector<HTMLInputElement>('#forma-pix')!;

    pix.click();
    await harness.fixture.whenStable();

    const concluir = tela.querySelector<HTMLButtonElement>('app-pagamento-pix .concluir')!;

    concluir.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/sucesso');

    const comprovante = harness.routeNativeElement!.textContent ?? '';
    expect(comprovante).toContain('Pagamento confirmado');
    expect(comprovante).toContain('Pix');
    expect(comprovante).toContain('Nexo Pro');
    expect(comprovante).toMatch(/R\$\s*79,90/);
  });

  it('redireciona para pagamento ao abrir sucesso sem comprovante', async () => {
    await RouterTestingHarness.create('/sucesso');

    expect(TestBed.inject(Router).url).toBe('/pagamento');
  });

  it('permite concluir com Pix após uma recusa no débito', async () => {
    const harness = await RouterTestingHarness.create('/pagamento');
    const router = TestBed.inject(Router);
    const pagamento = harness.routeNativeElement!;

    pagamento.querySelector<HTMLInputElement>('#forma-debito')!.click();
    await harness.fixture.whenStable();

    const dados = {
      'cartao-numero': '4000 0000 0000 0002',
      'cartao-nome': 'Ana Silva',
      'cartao-validade': '12/99',
      'cartao-cvv': '012',
    };

    for (const [id, valor] of Object.entries(dados)) {
      const campo = pagamento.querySelector<HTMLInputElement>(`#${id}`)!;
      campo.value = valor;
      campo.dispatchEvent(new Event('input', { bubbles: true }));
    }

    pagamento.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(router.url).toBe('/erro');

    const erro = harness.routeNativeElement!;
    expect(erro.textContent).toContain('Cartão não autorizado');
    expect(erro.querySelector('[role=alert]')?.textContent).toContain(
      'Seu banco recusou essa transação. Confira os dados e o limite disponível ou use outro meio de pagamento.',
    );

    expect(erro.textContent).toContain('#NX-10482');
    expect(erro.textContent).toMatch(/Débito · Visa •••• 0002/);
    const trocarForma = Array.from(erro.querySelectorAll('a')).find(
      (link) => link.textContent?.trim() === 'Escolher outro meio',
    );
    expect(trocarForma).toBeDefined();
    trocarForma!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(router.url).toBe('/pagamento');

    const novaTentativa = harness.routeNativeElement!;
    novaTentativa.querySelector<HTMLInputElement>('#forma-pix')!.click();
    await harness.fixture.whenStable();

    novaTentativa.querySelector<HTMLButtonElement>('app-pagamento-pix .concluir')!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(router.url).toBe('/sucesso');
    expect(harness.routeNativeElement!.textContent).toContain('Pix');
  });

  it('redireciona para pagamento ao abrir erro sem uma recusa registrada', async () => {
    await RouterTestingHarness.create('/erro');

    expect(TestBed.inject(Router).url).toBe('/pagamento');
  });
});

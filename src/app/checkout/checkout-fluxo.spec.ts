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

    const concluir = tela.querySelector<HTMLButtonElement>('app-pagamento-pix button')!;

    concluir.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/sucesso');

    const comprovante = harness.routeNativeElement!.textContent ?? '';
    expect(comprovante).toContain('Pagamento concluído');
    expect(comprovante).toContain('Pix');
    expect(comprovante).toContain('Teclado compacto');
    expect(comprovante).toMatch(/R\$\s*129,90/);
  });

  it('redireciona para pagamento ao abrir sucesso sem comprovante', async () => {
    await RouterTestingHarness.create('/sucesso');

    expect(TestBed.inject(Router).url).toBe('/pagamento');
  });
});

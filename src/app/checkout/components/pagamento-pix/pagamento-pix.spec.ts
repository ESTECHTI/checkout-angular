import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagamentoPix } from './pagamento-pix';

describe('PagamentoPix', () => {
  let component: PagamentoPix;
  let fixture: ComponentFixture<PagamentoPix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoPix],
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoPix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('solicita a conclusão do pagamento quando a pessoa clica no botão', () => {
    let quantidadeDeSolicitacoes = 0;

    fixture.componentInstance.conclusaoSolicitada.subscribe(() => {
      quantidadeDeSolicitacoes++;
    });

    const tela = fixture.nativeElement as HTMLElement;
    const botao = tela.querySelector('button')!;

    botao.click();

    expect(quantidadeDeSolicitacoes).toBe(1);
  });
});

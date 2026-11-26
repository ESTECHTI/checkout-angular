import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Erro } from './erro';
import { provideRouter } from '@angular/router';

describe('Erro', () => {
  let component: Erro;
  let fixture: ComponentFixture<Erro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Erro],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Erro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exibe o texto de suporte abaixo do cartão de erro', () => {
    const tela = fixture.nativeElement as HTMLElement;
    expect(tela.querySelector('.support-note a, .support-note [role="link"]')).toBeNull();
    expect(tela.querySelector('.support-note')?.textContent).toContain(
      'Ainda precisa de ajuda? Fale com a gente',
    );
  });
});

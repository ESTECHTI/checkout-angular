import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumoProduto } from './resumo-produto';

describe('ResumoProduto', () => {
  let component: ResumoProduto;
  let fixture: ComponentFixture<ResumoProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumoProduto);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('produto', {
      nome: 'Mouse sem fio',
      descricao: 'Mouse com receptor USB.',
      precoEmCentavos: 8950,
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exibe o nome, a descrição e o preço do produto em reais', () => {
    const elemento = fixture.nativeElement as HTMLElement;
    const texto = elemento.textContent ?? '';

    expect(texto).toContain('Mouse sem fio');
    expect(texto).toContain('Mouse com receptor USB.');
    expect(texto).toMatch(/R\$\s*89,50/);
  });
});

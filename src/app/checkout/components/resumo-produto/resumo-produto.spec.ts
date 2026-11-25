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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

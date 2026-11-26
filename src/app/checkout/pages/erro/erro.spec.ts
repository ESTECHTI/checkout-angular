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
});

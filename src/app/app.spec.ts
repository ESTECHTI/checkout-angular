import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display Checkout as the main heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const heading = element.querySelector('h1');

    expect(heading?.textContent?.trim()).toBe('Checkout');
  });

  it('exibe os textos de ajuda, privacidade e termos no rodapé', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const rodape = (fixture.nativeElement as HTMLElement).querySelector('footer.site-footer')!;
    expect(rodape.textContent).toContain('Precisa de ajuda?');
    expect(rodape.textContent).toContain('Privacidade');
    expect(rodape.textContent).toContain('Termos');
    expect(rodape.querySelector('a, [role="link"]')).toBeNull();
  });
});

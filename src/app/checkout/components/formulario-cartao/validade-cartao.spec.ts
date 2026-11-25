import { FormControl } from '@angular/forms';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validarValidadeCartao } from './validade-cartao';

describe('validarValidadeCartao', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2027, 0, 31, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['13/27', { formatoValidade: true }],
    ['01/2027', { formatoValidade: true }],
    ['12/26', { cartaoVencido: true }],
    ['01/27', null],
    ['02/27', null],
  ])('valida a entrada %s', (entrada, esperado) => {
    const controle = new FormControl(entrada);

    expect(validarValidadeCartao(controle)).toEqual(esperado);
  });
});

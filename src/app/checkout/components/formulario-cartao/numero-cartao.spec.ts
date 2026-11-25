import { FormControl } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { validarNumeroCartao } from './numero-cartao';

describe('validarNumeroCartao', () => {
  it.each([
    ['4242424242424242', null],
    ['4242 4242 4242 4242', null],
    ['4242 4242 4242 4241', { numeroCartao: true }],
    ['4242ABCD42424242', { numeroCartao: true }],
    ['0000000000000000', { numeroCartao: true }],
    ['4242', { numeroCartao: true }],
  ])('valida a entrada %s', (entrada, esperado) => {
    const controle = new FormControl(entrada);

    expect(validarNumeroCartao(controle)).toEqual(esperado);
  });
});

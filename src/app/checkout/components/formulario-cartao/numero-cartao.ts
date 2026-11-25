import type { ValidatorFn } from '@angular/forms';

export const validarNumeroCartao: ValidatorFn = (controle) => {
  const valor = controle.value;

  if (!valor) {
    return null;
  }

  const numero = valor.replace(/ /g, '');

  if (!/^[0-9]{13,19}$/.test(numero) || /^(\d)\1+$/.test(numero)) {
    return { numeroCartao: true };
  }

  let soma = 0;
  let dobrar = false;

  for (let indice = numero.length - 1; indice >= 0; indice--) {
    let digito = Number(numero[indice]);

    if (dobrar) {
      digito *= 2;

      if (digito > 9) {
        digito -= 9;
      }
    }

    soma += digito;
    dobrar = !dobrar;
  }

  return soma % 10 === 0 ? null : { numeroCartao: true };
};

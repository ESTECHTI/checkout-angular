import type { ValidatorFn } from '@angular/forms';

export const validarValidadeCartao: ValidatorFn = (controle) => {
  const valor = controle.value;

  if (!valor) {
    return null;
  }

  const partes = /^(0[1-9]|1[0-2])\/([0-9]{2})$/.exec(valor);

  if (!partes) {
    return { formatoValidade: true };
  }

  const mes = Number(partes[1]);
  const ano = 2000 + Number(partes[2]);
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth() + 1;

  if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    return { cartaoVencido: true };
  }

  return null;
};

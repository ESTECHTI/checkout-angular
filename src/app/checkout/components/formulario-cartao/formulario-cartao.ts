import { pedidoDemo } from '../../models/pedido-demo';
import { planoNexo, formatarPreco } from '../../models/produto';
import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validarValidadeCartao } from './validade-cartao';
import { validarNumeroCartao } from './numero-cartao';
import type { ResultadoCartao } from '../../checkout-estado';

@Component({
  selector: 'app-formulario-cartao',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-cartao.html',
  styleUrl: './formulario-cartao.scss',
})
export class FormularioCartao {
  protected readonly produto = planoNexo;
  protected readonly formatarPreco = formatarPreco;
  readonly pagamentoSolicitado = output<ResultadoCartao>();

  protected readonly formulario = new FormGroup({
    numero: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, validarNumeroCartao],
    }),
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\p{L}/u)],
    }),
    validade: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, validarValidadeCartao],
    }),
    cvv: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)],
    }),
  });

  protected formatarNumero(evento: Event): void {
    this.aplicarMascara(evento, this.formulario.controls.numero, (valor) =>
      valor
        .replace(/\D/g, '')
        .slice(0, 19)
        .replace(/(\d{4})(?=\d)/g, '$1 '),
    );
  }

  protected formatarNome(evento: Event): void {
    this.aplicarMascara(evento, this.formulario.controls.nome, (valor) =>
      valor.replace(/[^\p{L}\s'-]/gu, ''),
    );
  }

  protected formatarValidade(evento: Event): void {
    this.aplicarMascara(evento, this.formulario.controls.validade, (valor) => {
      const digitos = valor.replace(/\D/g, '').slice(0, 4);
      return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
    });
  }

  protected formatarCvv(evento: Event): void {
    this.aplicarMascara(evento, this.formulario.controls.cvv, (valor) =>
      valor.replace(/\D/g, '').slice(0, 4),
    );
  }

  private aplicarMascara(
    evento: Event,
    controle: FormControl<string>,
    formatar: (valor: string) => string,
  ): void {
    const input = evento.target as HTMLInputElement;
    const valorOriginal = input.value;
    const cursor = input.selectionStart;
    const formatado = formatar(valorOriginal);

    if (valorOriginal !== formatado) {
      input.value = formatado;
      if (cursor !== null) {
        const prefixoFormatado = formatar(valorOriginal.slice(0, cursor));
        input.setSelectionRange(prefixoFormatado.length, prefixoFormatado.length);
      }
    }

    if (controle.value !== formatado) {
      controle.setValue(formatado);
    }
  }

  get finalCartao(): string {
    return this.formulario.controls.numero.value.replace(/ /g, '').slice(-4);
  }

  protected enviar(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    const numero = this.formulario.controls.numero.value.replace(/ /g, '');
    const resultado = numero === pedidoDemo.cartaoRecusado.numero ? 'recusado' : 'aprovado';

    this.pagamentoSolicitado.emit(resultado);
  }
}

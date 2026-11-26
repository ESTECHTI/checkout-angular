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
  readonly pagamentoSolicitado = output<ResultadoCartao>();

  protected readonly formulario = new FormGroup({
    numero: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, validarNumeroCartao],
    }),
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/)],
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

  protected enviar(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    const numero = this.formulario.controls.numero.value.replace(/ /g, '');
    const resultado = numero === '4000000000000002' ? 'recusado' : 'aprovado';

    this.pagamentoSolicitado.emit(resultado);
  }
}

export interface Produto {
  readonly nome: string;
  readonly descricao: string;
  readonly precoEmCentavos: number;
}

export const planoNexo: Produto = {
  nome: 'Nexo Pro',
  descricao: 'Plano mensal · 1 usuário',
  precoEmCentavos: 7990,
};

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatarPreco(centavos: number): string {
  return moeda.format(centavos / 100);
}

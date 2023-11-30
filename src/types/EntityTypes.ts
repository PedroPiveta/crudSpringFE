export type cliente = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
};

export type vendedor = {
    id: number;
    nome: string;
    email: string;
    meta: number;
};

export type ligacao = {
    id: number;
    duracao: number;
    descricao: string;
    horario: string;
    cliente?: cliente;
    vendedor?: vendedor;
}
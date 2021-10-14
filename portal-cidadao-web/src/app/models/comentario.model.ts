export interface IComentarioModel {
    id: number;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
    postagemId: number;
}
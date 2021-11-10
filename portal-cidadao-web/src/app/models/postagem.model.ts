import { ICategoriaModel } from "./categoria.model";
import { IComentarioModel } from "./comentario.model";
import { IEnumModel } from "./enum.model";

export interface IPostagemModel {
    id: number;
    subcategoria: IEnumModel;
    categoria: ICategoriaModel;
    categoriaId: number;
    titulo: string;
    descricao: string;
    imagemUrl: string;
    latitude: number;
    longitude: number;
    bairro: string;
    dataCadastro: Date;
    resolvido: boolean;
    usuarioId: number;
    curtidas: number;
    descurtidas: number;
    comentarios: IComentarioModel[];
    excluida: boolean;
}
import { ICategoriaModel } from "./categoria.model";
import { IComentarioModel } from "./comentario.model";
import { IEnumModel } from "./enum.model";
import { IUsuarioModel } from "./usuario.model";

export interface IPostagemModel {
    id: number;
    subcategoria: IEnumModel;
    categoria: ICategoriaModel;
    confiabilidade: string;
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
    usuario: IUsuarioModel;
    curtidas: number;
    descurtidas: number;
    comentarios: IComentarioModel[];
    excluida: boolean;
}
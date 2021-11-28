export interface IDashboardAbertosModel {
    itens: IDashboardAbertosItem[];
    totalAbertos: number;
}

export interface IDashboardAbertosItem {
    mes: string;
    qtdPostagens: number;
}
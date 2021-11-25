export interface IDashboardAtrasadosModel {
    itens: IDashboardAtrasadosItem[];
    totalAtrasados: number;
}

export interface IDashboardAtrasadosItem {
    mes: string;
    qtdPostagens: number;
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexPlotOptions,
  ApexTooltip,
  ApexFill,
  ApexYAxis
} from "ng-apexcharts";
import { DashboardService } from 'src/app/service/dashboard.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    //legend: ApexLegend;
};

@Component({
  selector: 'app-grafico-incidentes-bairros',
  templateUrl: './grafico-incidentes-bairros.component.html',
  styleUrls: ['./grafico-incidentes-bairros.component.scss']
})
export class GraficoIncidentesBairrosComponent implements OnInit {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;

  constructor(
    public matDialog: MatDialog,
    private service: DashboardService
  ) {
    this.chartOptions = {
        series: [
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Agosto/2021",
          ]
        },
        yaxis: {
          title: {
            text: " postagens"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val: any) {
              return  val + " postagens";
            }
          }
        }
      };
    }

    ngOnInit(): void {
      this.service.obterDashboardBairros()
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.bairro,
              data: [
                item.qtdPostagens
              ]
            }
          });

          this.chartOptions.series = dadosGrafico;
        }
      });

      const date = new Date(); 
      const mes = this.capitalizeFirstLetter(date.toLocaleString('pt-BR', { month: 'long' }));
      const mesAno = `${mes}/${date.getFullYear()}`;
      this.chartOptions.xaxis.categories = [
        mesAno
      ]
    }

    private capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

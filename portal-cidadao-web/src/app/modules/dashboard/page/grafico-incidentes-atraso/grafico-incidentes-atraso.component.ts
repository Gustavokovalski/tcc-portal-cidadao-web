import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/service/dashboard.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grafico-incidentes-atraso',
  templateUrl: './grafico-incidentes-atraso.component.html',
  styleUrls: ['./grafico-incidentes-atraso.component.scss']
})
export class GraficoIncidentesAtrasoComponent {
  @ViewChild("chart") chart = new ChartComponent();
  public chartOptions = {} as ChartOptions;
  public chartLoaded = false;

  constructor(
    public matDialog: MatDialog,
    private service: DashboardService,
    
  ) {

    }
    ngOnInit(): void {
     var dataBase = new Date();
     var meses = [];

     var mesBase = dataBase.getMonth();
     while (meses.length < 6) {
       meses.push({
         numero: dataBase.getMonth()+1,
         nome: dataBase.toLocaleString('default', { month: 'long' })
       });
       if (dataBase.getMonth() + 1 === 1) {
         dataBase.setMonth(12);
       } else {
         dataBase.setMonth(dataBase.getMonth()-1);
       }
     }
     console.log(meses);
     meses = meses.reverse();
      
      this.service.obterDashboardAtrasados(meses[0].numero, meses[5].numero)
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.itens.length > 0) { 
          this.chartOptions = {
            series: [
              {
                name: 'Incidentes em atraso',
                data: res.dados.itens.map((item) => item.qtdPostagens),
              }
            ],
            chart: {
              height: 280,
              type: "line",
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "straight"
            },
            title: {
              text: 'Incidentes em atraso: ' + res.dados.totalAtrasados.toString(),
              align: "center",
              style: {
                fontSize: '18px',
              }
            },
            subtitle: {
                text: "Postagens com mais de 15 dias sem resolução",
                align: "center"
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
              }
            },
            xaxis: {
              categories: res.dados.itens.map(x => x.mes)
            },
            yaxis: {
              labels: {
                formatter: function(val) {
                  return Math.floor(val).toString()
                }
              }
            }
          };
          this.chartLoaded = true;
      }
      });
    }
 }
    
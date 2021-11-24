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
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
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

  constructor(
    public matDialog: MatDialog,
    private service: DashboardService,
    
  ) {
      this.chartOptions = {
        series: [
         
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
          text: "Incidentes em atraso: 68",
          align: "center"
        },
        subtitle: {
            text: "Incidentes com mais de 15 dias sem resolução",
            align: "center"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            
          ]
        }
      };
    }
    ngOnInit(): void {
     var curMonth = (new Date().getMonth()+1).toString();
     console.log(curMonth);
     var lastSix = [];
     var mes1= '';
     var mes2= '';
     var mes3= '';
     var mes4= '';
     var mes5= '';
     var mes6= '';
     var dadosGrafico1, dadosGrafico2, dadosGrafico3, dadosGrafico4, dadosGrafico5, dadosGrafico6;
      if(curMonth == '1'){
      lastSix.push('8', '9', '10', '11', '12', '1');
      }
      else
      if(curMonth == '2'){
        lastSix.push('9', '10', '11', '12', '1', '2');
        }
        else
      if(curMonth == '3'){
        lastSix.push('10', '11', '12', '1', '2', '3');
        }
        else
      if(curMonth == '4'){
        lastSix.push('11', '12', '1', '2', '3', '4');
        }
        else
      if(curMonth == '5'){
        lastSix.push('12', '1', '2', '3', '4', '5');
        }
        else
      if(curMonth == '6'){
        lastSix.push('1', '2', '3', '4', '5', '6');
        }
        else
      if(curMonth == '7'){
        lastSix.push('2', '3', '4', '5', '6', '7');
        }
        else
      if(curMonth == '8'){
        lastSix.push('3', '4', '5', '6', '7', '8');
        }
        else
      if(curMonth == '9'){
        lastSix.push('4', '5', '6', '7', '8', '9');
        }
        else
      if(curMonth == '10'){
        lastSix.push('5', '6', '7', '8', '9', '10');
        }
        else
      if(curMonth == '11'){
        lastSix.push('6', '7', '8', '9', '10', '11');
        console.log(lastSix);
              }
        else
      if(curMonth == '12'){
        lastSix.push('7', '8', '9', '10', '11', '12');
        }          
      
      this.service.obterDashboardAtrasados(lastSix[0])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) { 
         
          mes1 = lastSix[0];
         dadosGrafico1 = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]            
          }
        });
      }
      console.log(dadosGrafico1);
    });
          this.service.obterDashboardAtrasados(lastSix[1])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          console.log(res);
         dadosGrafico2 = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
        }
      });
          this.service.obterDashboardAtrasados(lastSix[2])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          console.log(res);
         dadosGrafico3 = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
        }
      });
          this.service.obterDashboardAtrasados(lastSix[3])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          console.log(res);
         dadosGrafico4 = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
        }
      });
          this.service.obterDashboardAtrasados(lastSix[4])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          console.log(res);
         dadosGrafico5 = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
        }
      });
      console.log('iii');
          this.service.obterDashboardAtrasados(lastSix[5])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          console.log(res);
          console.log(res);
         dadosGrafico6 = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
        }
      });
      console.log(dadosGrafico1);
      console.log(dadosGrafico2);
      console.log(dadosGrafico3);
      console.log(dadosGrafico4);
      console.log(dadosGrafico5);
      console.log(dadosGrafico6);
      this.chartOptions.xaxis.categories = [
        dadosGrafico1.name, dadosGrafico2.name, dadosGrafico3.name, dadosGrafico4.name, dadosGrafico5.name, dadosGrafico6.name
      ]      
      console.log(this.chartOptions);
      this.chartOptions.series = dadosGrafico1, dadosGrafico2, dadosGrafico3, dadosGrafico4, dadosGrafico5, dadosGrafico6;
      console.log(this.chartOptions);
    }
 }
    
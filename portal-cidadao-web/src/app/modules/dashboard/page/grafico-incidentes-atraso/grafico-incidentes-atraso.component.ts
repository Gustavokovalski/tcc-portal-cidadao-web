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
     var meses = [];
     var mes1= '';
     var mes2= [];
     var mes3= [];
     var mes4= [];
     var mes5= [];
     var mes6= [];
     var qtde1= [];
     var qtde2= [];
     var qtde3= [];
     var qtde4= [];
     var qtde5= [];
     var qtde6= [];
      if(curMonth == '1'){
      lastSix.push('8', '9', '10', '11', '12', '1');
      meses.push('Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro');
      }
      else
      if(curMonth == '2'){
        lastSix.push('9', '10', '11', '12', '1', '2');
        meses.push('Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro');

        }
        else
      if(curMonth == '3'){
        meses.push('Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro', 'Março');

        lastSix.push('10', '11', '12', '1', '2', '3');
        }
        else
      if(curMonth == '4'){
        meses.push('Novembro', 'Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril');
        lastSix.push('11', '12', '1', '2', '3', '4');
        }
        else
      if(curMonth == '5'){
        meses.push('Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio');
        lastSix.push('12', '1', '2', '3', '4', '5');
        }
        else
      if(curMonth == '6'){
        meses.push('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho');
        lastSix.push('1', '2', '3', '4', '5', '6');
        }
        else
      if(curMonth == '7'){
        meses.push('Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho');
        lastSix.push('2', '3', '4', '5', '6', '7');
        }
        else
      if(curMonth == '8'){
        meses.push('Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto');
        lastSix.push('3', '4', '5', '6', '7', '8');
        }
        else
      if(curMonth == '9'){
        meses.push('Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro');
        lastSix.push('4', '5', '6', '7', '8', '9');
        }
        else
      if(curMonth == '10'){
        meses.push('Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro');
        lastSix.push('5', '6', '7', '8', '9', '10');
        }
        else
      if(curMonth == '11'){
        meses.push('Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro');
        lastSix.push('6', '7', '8', '9', '10', '11');
        console.log(lastSix);
              }
        else
      if(curMonth == '12'){
        meses.push('Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
        lastSix.push('7', '8', '9', '10', '11', '12');
        }          
      
      this.service.obterDashboardAtrasados(lastSix[0])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) { 
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
          this.chartOptions.xaxis.categories = meses;
          this.chartOptions.series=dadosGrafico;    
          
              
      }
    });
          this.service.obterDashboardAtrasados(lastSix[1])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
          this.chartOptions.xaxis.categories = meses;
          this.chart.appendSeries(dadosGrafico);   
          console.log(this.chart);
        }
      });
          this.service.obterDashboardAtrasados(lastSix[2])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
          this.chartOptions.xaxis.categories = meses;
          this.chart.appendSeries(dadosGrafico);  
          
        }});
          this.service.obterDashboardAtrasados(lastSix[3])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
          this.chartOptions.xaxis.categories = meses;
          this.chart.appendSeries(dadosGrafico);  
        }
      });
          this.service.obterDashboardAtrasados(lastSix[4])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
          this.chartOptions.xaxis.categories = meses;
          this.chart.appendSeries(dadosGrafico); 
        }
      });
          this.service.obterDashboardAtrasados(lastSix[5])
      .then((res) => {
        if (res.sucesso && res.dados && res.dados.length > 0) {
          const dadosGrafico = res.dados.map(function(item) {
            return {
              name: item.mes,
              data: [
                item.qtdPostagens
              ]
            }
          });
          this.chartOptions.xaxis.categories = meses;
          this.chart.appendSeries(dadosGrafico);  
        }
      });
      
        
      console.log(this.chartOptions);
    }
 }
    
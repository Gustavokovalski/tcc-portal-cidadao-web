import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './page/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficoIncidentesAbertosComponent } from './page/grafico-incidentes-abertos/grafico-incidentes-abertos.component';
import { GraficoIncidentesAtrasoComponent } from './page/grafico-incidentes-atraso/grafico-incidentes-atraso.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GraficoIncidentesBairrosComponent } from './page/grafico-incidentes-bairros/grafico-incidentes-bairros.component';
import { GraficoSegurancaComponent } from './page/grafico-seguranca/grafico-seguranca.component';
import { GraficoCategoriasComponent } from './page/grafico-categorias/grafico-categorias.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GraficoIncidentesAbertosComponent,
    GraficoIncidentesAtrasoComponent,
    GraficoIncidentesBairrosComponent,
    GraficoSegurancaComponent,
    GraficoCategoriasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    NgApexchartsModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule {}

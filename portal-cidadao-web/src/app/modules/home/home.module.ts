import { NgModule } from '@angular/core';
import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home.routing';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatButtonModule} from '@angular/material/button';
import { ModalCriarPostagemComponent } from './page/modal-criar-postagem/modal-criar-postagem.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxAutocomPlaceModule } from 'ngx-autocom-place';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    HomeComponent,
    ModalCriarPostagemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    GoogleMapsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    NgxAutocomPlaceModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [],
  providers: []
})
export class HomeModule {}

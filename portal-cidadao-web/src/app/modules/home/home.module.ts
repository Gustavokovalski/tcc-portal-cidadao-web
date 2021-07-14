import { NgModule } from '@angular/core';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatButtonModule} from '@angular/material/button';
import { ModalCriarPostagemComponent } from './page/modal-criar-postagem/modal-criar-postagem.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxAutocomPlaceModule } from 'ngx-autocom-place';

@NgModule({
  declarations: [
    HomeComponent,
    ModalCriarPostagemComponent
  ],
  imports: [
    HomeRoutingModule, 
    GoogleMapsModule,
    MatButtonModule,
    MatDialogModule,
    NgxAutocomPlaceModule
  ],
  exports: [],
  providers: []
})
export class HomeModule {}

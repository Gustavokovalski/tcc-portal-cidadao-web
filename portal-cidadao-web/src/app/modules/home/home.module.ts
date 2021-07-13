import { NgModule } from '@angular/core';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule, 
    GoogleMapsModule,
    MatButtonModule
  ],
  exports: [],
  providers: []
})
export class HomeModule {}

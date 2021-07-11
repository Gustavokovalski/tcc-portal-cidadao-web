import { NgModule } from '@angular/core';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule, 
    GoogleMapsModule
  ],
  exports: [],
  providers: []
})
export class HomeModule {}

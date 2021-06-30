import { NgModule } from '@angular/core';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [HomeRoutingModule],
  exports: [],
  providers: []
})
export class HomeModule {}

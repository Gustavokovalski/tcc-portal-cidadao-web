import { NgModule } from '@angular/core';

import { LoginComponent } from './page/login/login.component';

import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRoutingModule]
})
export class AuthModule {}

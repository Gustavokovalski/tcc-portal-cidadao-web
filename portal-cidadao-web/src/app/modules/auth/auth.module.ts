import { NgModule } from '@angular/core';

import { LoginComponent } from './page/login/login.component';

import { AuthRoutingModule } from './auth.routing';
import { CadastroComponent } from './page/cadastro/cadastro.component';

@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [AuthRoutingModule]
})
export class AuthModule {}

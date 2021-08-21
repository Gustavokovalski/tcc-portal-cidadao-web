import { NgModule } from '@angular/core';

import { LoginComponent } from './page/login/login.component';

import { AuthRoutingModule } from './auth.routing';
import { CadastroComponent } from './page/cadastro/cadastro.component';
import { EnvioEmailComponent } from './page/envio-email/envio-email.component';
import { ConfirmacaoEmailComponent } from './page/confirmacao-email/confirmacao-email.component';
import { EsqueciSenhaComponent } from './page/esqueci-senha/esqueci-senha.component';
import { EnvioEmailRecuperacaoComponent } from './page/envio-email-recuperacao/envio-email-recuperacao.component';
import { RedefinirSenhaComponent } from './page/redefinir-senha/redefinir-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent, 
    EnvioEmailComponent, 
    ConfirmacaoEmailComponent,
    EsqueciSenhaComponent,
    EnvioEmailRecuperacaoComponent,
    RedefinirSenhaComponent
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxMaskModule.forRoot()
  ]
})
export class AuthModule {}

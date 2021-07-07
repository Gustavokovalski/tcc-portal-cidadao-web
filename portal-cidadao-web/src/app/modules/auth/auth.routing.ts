import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './page/cadastro/cadastro.component';
import { ConfirmacaoEmailComponent } from './page/confirmacao-email/confirmacao-email.component';
import { EnvioEmailRecuperacaoComponent } from './page/envio-email-recuperacao/envio-email-recuperacao.component';
import { EnvioEmailComponent } from './page/envio-email/envio-email.component';
import { EsqueciSenhaComponent } from './page/esqueci-senha/esqueci-senha.component';
import { LoginComponent } from './page/login/login.component';
import { RedefinirSenhaComponent } from './page/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cadastro',
        component: CadastroComponent
      },
      {
        path: 'email-enviado',
        component: EnvioEmailComponent
      },
      {
        path: 'email-confirmado',
        component: ConfirmacaoEmailComponent
      },
      {
        path: 'esqueci-senha',
        component: EsqueciSenhaComponent
      },
      {
        path: 'email-enviado-recuperacao',
        component: EnvioEmailRecuperacaoComponent
      },
      {
        path: 'redefinir-senha',
        component: RedefinirSenhaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

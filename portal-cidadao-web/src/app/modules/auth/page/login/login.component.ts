import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUsuarioModel } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public model: IUsuarioModel = {} as IUsuarioModel;
  public returnUrl: string = '';

    public form = new FormGroup({
        login: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
     });
    
    private sub = new Subscription();
    constructor(
        private router: Router
        ) {
      debugger

  }

  ngOnInit() {}

  public async login() {
    //         debugger
    //         if (this.form.invalid) {
    //             this.toastr.warning('Formulário inválido!', 'Atenção');
    //             return;
    //         }
    //         this.authService.login(this.form.value.login, this.form.value.senha)
    //         .pipe(first())
    //         .subscribe(
    //             _data => {
    //                 if (_data.sucesso) {
    //                     this.router.navigate([this.returnUrl]);
    //                 } else {
    //                     // _data.mensagens.forEach(mensagem => {
    //                     //     this.toastr.warning(mensagem.descricao, 'Atenção');
    //                     // });
    //                 }
    //             },
    //             error => {
    //                 this.toastr.error(error, 'Atenção');
    //             });
    }
}

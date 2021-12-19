import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IUsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.currentUserValue?.id) {
      this.router.navigate(['/home']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public async login() {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.authService
      .login(this.form.value.login, this.form.value.senha)
      .pipe(first())
      .subscribe(
        (_data) => {
          if (_data.sucesso) {
            this.router.navigate(['/home']);
          } else {
            this.toastr.warning(_data.mensagem.descricao, 'Atenção');
          }
        },
        (error) => {
          this.toastr.error(error, 'Atenção');
        }
      );
  }

  public irParaMapa() {
    console.log('aaaaa');
    this.router.navigate(['/home']);
  }

  public getLogoPath() {
    return environment.baseAssetsPath + '/images/logo.png';
  }
}

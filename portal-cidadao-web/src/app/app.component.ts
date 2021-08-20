import { Component } from '@angular/core';
import { IUsuarioModel } from './models/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'portal-cidadao';
  public currentUser!: IUsuarioModel;
}
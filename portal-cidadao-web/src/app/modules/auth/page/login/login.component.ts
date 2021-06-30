import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private sub = new Subscription();

  constructor(

  ) {

  }

  ngOnInit() {}

  login() {

  }


}

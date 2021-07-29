import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private sub = new Subscription();

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {}

  login() {

  }


}
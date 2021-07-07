import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-email',
  templateUrl: './confirmacao-email.component.html',
  styleUrls: ['./confirmacao-email.component.scss']
})
export class ConfirmacaoEmailComponent implements OnInit {
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {}

  redirecionar() {
    window.location.href = '/home';
  }


}

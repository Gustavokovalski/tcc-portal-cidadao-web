import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public invisible = true;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.dashboardVisivel();
  }

  public dashboardVisivel(): void {
    if (
      this.authService.currentUserValue?.perfil?.codigo === 1 ||
      this.authService.currentUserValue?.perfil?.codigo === 3
    )
      this.invisible = false;
  }

  logout() {
    this.authService.logout();
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    const perfisRota = next.data.perfis;
    if (currentUser) {
      if (perfisRota) {
        if (!perfisRota.includes(currentUser.perfil?.nome)) {
          this.toastr.error('Você não possui acesso a essa página.', 'Acesso negado!');
          this.router.navigate(['/']);
          return false;
        }
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

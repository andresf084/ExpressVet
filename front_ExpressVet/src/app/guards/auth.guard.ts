import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private routerService: Router
    ){}


    canActivate() {
      if (this.authService.isLogged()) {
        return true;
      } else {
        this.routerService.navigate(['/login']);
        return false
      }
    }

}

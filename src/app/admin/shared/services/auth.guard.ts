import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (private auth: AuthService,
               private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuth()) {
      return true;
    } else {
      this.auth.logout();
      this.route.navigate(['/admin', 'login'], {
        queryParams: {
          logined: false
        }
      });
    }

    return undefined;
  }

}

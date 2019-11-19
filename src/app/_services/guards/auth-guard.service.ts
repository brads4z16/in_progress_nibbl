import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    let userdata = JSON.parse(localStorage.getItem('currentUser'));

    if(!userdata || new Date(userdata.expires) < new Date()) {
      this.router.navigate(['login']);
      localStorage.clear();
      return false
    }

    return true;
  }

}

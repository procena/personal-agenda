import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
interface MyToken {
  name: string;
  exp: number;
  role: string;
  authorities: Array<string>
  // whatever else is in the JWT.
}
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode<MyToken>(`${token}`);
    console.log([tokenPayload, tokenPayload.role, expectedRole]);
    if (
      !this.auth.isAuthenticated() ||
      tokenPayload.authorities[0] !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

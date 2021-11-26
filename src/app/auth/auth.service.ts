import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    

    const token = localStorage.getItem('token')?.toString();

    // Check if the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}

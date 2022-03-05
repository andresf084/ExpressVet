import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged = new Subject<boolean>();

constructor(
  private httpClient: HttpClient,
  private routerService: Router,
  private cookies: CookieService
) { }

  login(loginData: any){
    console.log(loginData) //para debug
    return this.httpClient.post("http://localhost:5600/user/login",loginData,{headers:{"Content-Type":"application/json"}})
  }

  isLoggedObserver(): Observable<boolean>{
    return this._isLogged.asObservable();
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  setUser(user: any) {
    this.cookies.set("user", user)
  }

  setRol(rol: any) {
    this.cookies.set("rol", rol)
  }

  getToken() {
    return this.cookies.get("token");
  }

  saveLoginToken(token: string){
    this.cookies.set('token', token)
    this._isLogged.next(this.isLogged());
  }

  isLogged() {
    const cookieExists: boolean = this.cookies.check("token");
    return cookieExists
  }

  logOut() {
    this.cookies.delete("token");
    this.cookies.delete("user");
    this._isLogged.next(this.isLogged());
    this.routerService.navigate(['/home'])
  }

}

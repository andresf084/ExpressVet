import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    user: "",
    password: ""
  };

  constructor(
    public authService: AuthService,
    private routerService: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.loginData.password && this.loginData.user){
      console.log(this.loginData.user)
      console.log(this.loginData.password)
      const user = {user: this.loginData.user, password: this.loginData.password};
      console.log(`${user.user} y ${user.password} son los datos del login`)
      this.authService.login(user).subscribe( data => {
      console.log(data);
      this.authService.saveLoginToken((data as any).token);
      this.authService.setToken((data as any).token);
      this.authService.setUser((data as any).user);
      this.authService.setRol((data as any).rol)
      this.routerService.navigateByUrl("/manageMeetings")
    });
    }else{
      console.log("error")
    }
  }
}

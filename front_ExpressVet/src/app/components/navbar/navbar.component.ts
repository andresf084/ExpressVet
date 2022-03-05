import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { MeetingsService } from 'src/app/services/meetings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userName: any ="";
  public userRol: any = "";
  public qtyMeetingsReserve: any = ""
  public qtyMeetingsActive: any = ""
  public qtyMeetingsComplete: any = ""

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private routerService: Router,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit() {
    this.getLoggedUser()
    this.qtyReserve()
    this.qtyActive()
    this.qtyComplete()
  }

  getLoggedUser() {
    this.userName = this.cookieService.get("user");
    this.userRol = this.cookieService.get("rol")
    //console.log(this.userInfo)
  }

  logOut() {
    this.cookieService.delete("token");
    this.cookieService.delete("user");
    this.cookieService.delete("rol");
    this.routerService.navigate(['/home'])
  }

  qtyReserve() {
    this.meetingsService.qtyMeetingsReserve().subscribe({
      next: (res: any) => {
        if (res > 0) {
          this.qtyMeetingsReserve = res
          //console.log(this.qtyMeetingsReserve)
        }
      },
      complete: () => {},
      error: () => {console.log('Error al contar reuniones reservadas')}
    })
  }

  qtyActive() {
    this.meetingsService.qtyMeetingsActive().subscribe({
      next: (res: any) => {
        //console.log(res)
        if (res > 0) {
          this.qtyMeetingsActive = res
          //console.log(this.qtyMeetingsActive)
        }
      },
      complete: () => {},
      error: () => {console.log('Error al contar reuniones activas')}
    })
  }

  qtyComplete() {
    this.meetingsService.qtyMeetingsComplete().subscribe({
      next: (res: any) => {
        //console.log(res)
        if (res > 0) {
          this.qtyMeetingsComplete = res
          //console.log(this.qtyMeetingsActive)
        }
      },
      complete: () => {},
      error: () => {console.log('Error al contar reuniones activas')}
    })
  }






}

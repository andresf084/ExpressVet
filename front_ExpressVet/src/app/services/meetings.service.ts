import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.services';


@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  createMeetings(data:any){
    return this.http.post(this.URL_API+'/meeting', data)
  }

  updateMeetings(data:any){
    return this.http.put(this.URL_API+'/meeting', data)
  }

  deleteMeetings(id:string){
    return this.http.delete(this.URL_API+'/meeting/' + id)
  }

  listMeetings(){
    return this.http.get(this.URL_API+'/meeting')
  }

  qtyMeetingsReserve(){
    return this.http.get(this.URL_API+'/meeting/cntRsrv')
  }

  qtyMeetingsActive(){
    return this.http.get(this.URL_API+'/meeting/cntActv')
  }

  qtyMeetingsComplete(){
    return this.http.get(this.URL_API+'/meeting/cntCmplt')
  }

  activeMeetings(data:any){
    return this.http.put(this.URL_API+'/meeting/active', data)
  }

  searchMeetings(data:any){
    return this.http.post(this.URL_API+'/meeting/search', data)
  }

  searchReserves(data:any){
    return this.http.post(this.URL_API+'/meeting/searchRsrvs', data)
  }

  cancelMeetings(data:any){
    return this.http.put(this.URL_API+'/meeting/cancel', data)
  }

}

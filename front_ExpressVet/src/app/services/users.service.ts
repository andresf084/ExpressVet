import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.services';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  createUsers(data:any){
    return this.http.post(this.URL_API+'/userMaster', data)
  }

  updateUsers(data:any){
    return this.http.put(this.URL_API+'/userMaster', data)
  }

  deleteUsers(id:string){
    return this.http.delete(this.URL_API+'/userMaster/' + id)
  }

  listUsers(){
    return this.http.get(this.URL_API+'/userMaster')
  }

  activeUsers(data:any){
    return this.http.put(this.URL_API+'/userMaster/active', data)
  }

  searchUsers(data:any){
    return this.http.post(this.URL_API+'/userMaster/search', data)
  }

}

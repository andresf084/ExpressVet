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
    return this.http.post(this.URL_API+'/user', data)
  }

  updateUsers(data:any){
    return this.http.put(this.URL_API+'/user', data)
  }

  deleteUsers(id:string){
    return this.http.delete(this.URL_API+'/user/' + id)
  }

  listUsers(){
    return this.http.get(this.URL_API+'/user')
  }

  activeUsers(data:any){
    return this.http.put(this.URL_API+'/user/active', data)
  }

  searchUsers(data:any){
    return this.http.post(this.URL_API+'/user/search', data)
  }

}

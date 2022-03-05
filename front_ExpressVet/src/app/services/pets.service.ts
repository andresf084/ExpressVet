import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.services';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  readonly URL_API = this.config.getConfig().backend.url

constructor(
  private config: ConfigService,
    private http: HttpClient
) { }

  createPets(data:any){
    return this.http.post(this.URL_API+'/petMaster', data)
  }

  updatePets(data:any){
    return this.http.put(this.URL_API+'/petMaster', data)
  }

  deletePets(id:string){
    return this.http.delete(this.URL_API+'/petMaster/' + id)
  }

  listPets(){
    return this.http.get(this.URL_API+'/petMaster')
  }

  activePets(data:any){
    return this.http.put(this.URL_API+'/petMaster/active', data)
  }

  searchPets(data:any){
    return this.http.post(this.URL_API+'/petMaster/search', data)
  }

}

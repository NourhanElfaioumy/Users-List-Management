import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Users } from '../models/usersmodel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/users';

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiurl);
  }

  GetUersById(id: any): Observable<Users> {
    return this.http.get<Users>(this.apiurl + '/' + id);
  }

  RemoveUsersById(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateUsers(data: any) {
    return this.http.post(this.apiurl, data);
  }

  UpdateUsers(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }

}

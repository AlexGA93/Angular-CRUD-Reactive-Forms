import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UserType } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _apiEndPoint: string = environment.apiEndPoint;
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private _http: HttpClient) {
    
  }

  getAllUsers(): Observable<UserType[]>{
    const url: string = `${this._apiEndPoint}/users`;
    return this._http.get<UserType[]>(url);
  }

  postNewUser(payload: UserType): Observable<UserType>{
    const url: string = `${this._apiEndPoint}/user`;
    return this._http.post<UserType>(url, payload);
  }






  updateUser(payload: UserType): Observable<UserType>{
    // const { username, name, email } = payload;
    const url: string = `${this._apiEndPoint}/user/${payload.id}`;
    return this._http.put<UserType>(url, payload);
  }

  deleteUserById(userId: number){
    console.log(userId);
    
    const url: string = `${this._apiEndPoint}/user/${userId}`;
    console.log(url);
    
    return this._http.delete(url);
  }
}

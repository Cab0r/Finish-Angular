import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  sendLogin(User: User): Observable<any> {
    console.log(User);
    return this.http.post('http://localhost:3001/login',User);
  }

  sendRegister(User: User): Observable<any>{
    console.log(User);
    return this.http.post('http://localhost:3001/register',User);
  }
}

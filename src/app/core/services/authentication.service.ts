import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignUpUser, JwtResponse, CurrentPerson } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentPerson: BehaviorSubject<CurrentPerson>;

  constructor(private http: HttpClient) {
    this.currentPerson = new BehaviorSubject<CurrentPerson>(JSON.parse(localStorage.getItem('currentUser')));
  }

  getCurrentPerson(): BehaviorSubject<CurrentPerson> {
    return this.currentPerson;
  }

  login(user: SignUpUser) {
    return this.http.post<string>(environment.apiUrl + 'login', user)
    .pipe(map(token => {
       if (token) {
         
         const currentPerson: CurrentPerson = {
          Id: 1, 
          Name: "1",
          Email: "1", 
          Token: token
        };
         localStorage.setItem('currentUser', JSON.stringify(currentPerson));
         this.currentPerson.next(currentPerson);
       }
      return token;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentPerson.next(null);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User,UserResult} from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<UserResult>(environment.apiUrl + 'users',{
      params:{
        page:'1',
        per_page:'4',
       
      }
    }).pipe(map(res => {
       return res.data;
     }));
  }

  getUserById(id: number) {
    return this.http.get<User[]>(environment.apiUrl + 'users/' + id);
  

}
}

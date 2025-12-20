// filepath: src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://635122e5dfe45bbd55b79589.mockapi.io/api/v1/users';
  private localUsersUrl = 'assets/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getLocalUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.localUsersUrl);
  }
}
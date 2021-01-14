import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl2 } from './const';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup = async (formData) => {
    const response = await this.http.post(`${backendUrl2}/signup`, formData, {observe: 'response'}).toPromise()
    // how come the response doesn't show?
    console.log('signup response from Express: ', response)
    
  }
}

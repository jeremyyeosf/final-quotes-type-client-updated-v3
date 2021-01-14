import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup = async (formData) => {
    const response = await this.http.post('http://localhost:3000/signup', formData, {observe: 'response'}).toPromise()
    // how come the response doesn't show?
    console.log('signup response from Express: ', response)
    
  }
}

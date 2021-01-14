import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { 
  }

  async sendEmail(mailData) {
    let result = await this.http.post('http://localhost:3000/email', mailData, {observe: 'response' }).toPromise()
    return result
  }
}

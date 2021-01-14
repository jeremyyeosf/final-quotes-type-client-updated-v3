import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl2 } from './const';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { 
  }

  async sendEmail(mailData) {
    let result = await this.http.post(`${backendUrl2}/email`, mailData, {observe: 'response' }).toPromise()
    return result
  }
}

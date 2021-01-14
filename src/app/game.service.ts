import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerResultData } from 'src/app/models';
import { backendUrl2 } from './const';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  playerResultDataArray: Array<PlayerResultData>

  constructor(private http: HttpClient) { }

  async storePlayerData(data: PlayerResultData) {
    // send data to Express to DB
    console.log('service sending to express...', data)
    let result = await this.http.post(`${backendUrl2}/api/data`, data, { observe: 'response' }).toPromise()
    console.log('from mongo post', result)
    return result
  }

  async retrieveScores() {
    let result = await this.http.get(`${backendUrl2}/api/data`, { observe: 'response' }).toPromise()
    console.log('retrieved high scores:', result.body)
    
    return result.body
    // find player score by playerId
    // const playerScore = this.scoresArray.find(playerId)
    // return high scores
    // this.playerResultDataArray.push(data)
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-option',
  templateUrl: './game-option.component.html',
  styleUrls: ['./game-option.component.css']
})
export class GameOptionComponent implements OnInit {

  categories: Array<string> = [
    'random', 'inspirational', 'friendship', 'technology', 'wisdom'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

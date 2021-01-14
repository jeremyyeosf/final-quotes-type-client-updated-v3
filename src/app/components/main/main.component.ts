import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  constructor(private router: Router, private authSvc: AuthenticationService) { }

  ngOnInit(): void {
  }


  enterGame() {
    this.router.navigate(['/option'])
  }


}

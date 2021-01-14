import { Quote } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/email.service';
import { ScoreDetail } from 'src/app/models';
import { GameService } from '../../game.service';

@Component({
    selector: 'app-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.css'],
})
export class EndComponent implements OnInit {
    @Input() score: number = 0;
    @Input() quotesCompleted: Array<string> = [''];
    highScores;
    emailForm: FormGroup = this.fb.group({
        to: ['', [Validators.required, Validators.email]],
    });




    constructor(
        private gameService: GameService,
        private fb: FormBuilder,
        private emailService: EmailService
    ) { }

    ngOnInit(): void {
        this.getHighScores();
    }


    emailQuotes() {
        console.log(this.emailForm.value);
        const emailData = this.emailForm.value;
        console.log('text: ', this.quotesCompleted);
        Object.assign(emailData, { subject: 'Quotes from Typing Game' });
        Object.assign(emailData, { text: this.quotesCompleted });
        // append to emailData email subject and text:quotes
        this.emailService.sendEmail(emailData);
    }

    getHighScores = async () => {
        this.highScores = await this.gameService.retrieveScores();
    };
}

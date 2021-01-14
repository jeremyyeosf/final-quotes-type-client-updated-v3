import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/game.service';
import { Quote } from '../../models';
import { QuoteService } from '../../quote.service';
import { PlayerResultData } from 'src/app/models';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit, OnDestroy {
    quote: Quote;
    @ViewChild('quoteDisplay') quoteDisplay;
    quoteInput: string = '';
    quoteCharArray: Array<String> = [];
    isLoaded: boolean = false
    score: number = 0;
    time: number = 10
    endGame: boolean = false
    playerData: PlayerResultData = {
        playerName: '',
        playerScore: 0,
        totalTimeTaken: 0,
        quotesCompleted: []
    }
    quotesCompleted: Array<string> = ['']
    quotesArrayObjectsCompleted: Array<Quote> = []
    scoresSubmitted: boolean = false

    constructor(private quoteService: QuoteService, private router: Router, private gameService: GameService, private authSvc: AuthenticationService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.startgame();
    }

    ngAfterViewInit() {
        this.startTimer()
    }

    ngOnDestroy(): void {

    }

    startgame() {
        this.score = 0
        this.renderNewQuote();
        console.log('player: ', this.authSvc.currPlayer)
    }

    renderNewQuote() {
        const category = this.route.snapshot.paramMap.get('category').toLowerCase();
        console.log('category: ', category)
        this.quoteService.getQuote(category).subscribe((result) => {
            this.quote = result;
            console.log('quote returned', this.quote);
            this.quoteCharArray = this.quote.content.split('');
            this.isLoaded = true
        });
    }

    feedback() {
        const spanElementArray = this.quoteDisplay.nativeElement.childNodes;
        // if correct
        if (this.quoteInput == this.quote.content) {
            this.score += 1
            this.time += 10
            this.quoteInput = ''
            // add completed quotes into Arr
            this.quotesCompleted.push(this.quote.content)
            this.quotesArrayObjectsCompleted.push(this.quote)
            this.renderNewQuote();
        }
        for (let i = 0; i < spanElementArray.length; i++) {
            // if haven't typed that char yet
            if (this.quoteInput.charAt(i) == '') {
                spanElementArray[i].classList.remove('correct');
                spanElementArray[i].classList.remove('incorrect');
            } else if (this.quoteInput.charAt(i) == this.quote.content.charAt(i)) {
                spanElementArray[i].classList.add('correct');
                spanElementArray[i].classList.remove('incorrect');
            } else {
                spanElementArray[i].classList.remove('correct');
                spanElementArray[i].classList.add('incorrect');
            }
        }
    }

    startTimer() {
        this.time = 20
        let startTime = Date.now()
        const timer = setInterval(() => {
            this.time -= 1
            if (this.time == 0) {
                clearInterval(timer)
                console.log('Game over!')
                let timeElapsed = Math.floor(((Date.now()) - startTime) / 1000)
                console.log('timeElapsed', timeElapsed, 's')

                // undefined or null something
                console.log('this.authSvc.currPlayer', this.authSvc.currPlayer)
                console.log('this.score', this.score)
                console.log('this.quotesCompleted', this.quotesArrayObjectsCompleted)
                Object.assign(this.playerData, { playerName: this.authSvc.currPlayer })
                Object.assign(this.playerData, { playerScore: this.score })
                Object.assign(this.playerData, { quotesCompleted: this.quotesArrayObjectsCompleted })
                Object.assign(this.playerData, { totalTimeTaken: timeElapsed })
                // console.log('PLAYER DATA quotes: ', this.playerData.quotesCompleted)
                this.storePlayerData(this.playerData)
                this.endGame = true
                // this.router.navigate(['/end'])
            }
        }, 1000)

    }

    storePlayerData = async (data) => {
        console.log('Game storing player data...')
        const response = await this.gameService.storePlayerData(data)
        if (response.status == 200) {
            this.scoresSubmitted = true
        }
    }

    endGameNow() {
        this.time = 1
    }
}

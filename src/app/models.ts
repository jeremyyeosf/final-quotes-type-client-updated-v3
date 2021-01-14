export interface Quote {
    _id: string
    tags: Array<string>
    content: string
    author: string
    length: number
}

export interface LoginCredentials {
	username: string
	password: string
}

export interface PlayerResultData {
    playerName: string
    playerScore: number
    totalTimeTaken: number
    quotesCompleted: Array<Quote>
}

export interface ScoreDetail {
    _id: string
    playerName: string
    playerScore: number
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
// import { Observable, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
import { LoginCredentials } from './models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

    loginCredentials: LoginCredentials
    currPlayer: string = ''
    private token: string = ''
    private isVerified: boolean = false
    googleUser: boolean = false
    normalUser: boolean = false

    constructor(private http: HttpClient, private router: Router) { }

    checkToken = async (token): Promise<any> => {
        try {
            if (this.googleUser) {
                const resultFromGoogle = await this.googleAuth(this.token)
                console.log('resultFromGoogle', resultFromGoogle)
                if (resultFromGoogle) {
                    return resultFromGoogle
                }
            } else if (this.normalUser) {
                return this.http.get<any>('http://localhost:3000/protected/secret', {
                    headers: { Authorization: `Bearer ${token}` }
                }).toPromise().then(result => {
                    console.log('original check token', result)
                    return result.userVerified
                })
            }
        } catch {
            console.log('Google or Normal Error')
        }
    }

    setGoogleUser () {
        console.log('set to google')
        this.googleUser = true
        this.normalUser = false
    }

    setNormalUser () {
        console.log('set to normal user')
        this.normalUser = true
        this.googleUser = false
    }

    resetUser() {
        console.log('user reset')
        this.normalUser = false
        this.googleUser = false
    }

    login(username, password): Promise<boolean> {
        // write a call to the backend
        // examine the status code
        this.token = ''
        return this.http.post<any>('http://localhost:3000/authentication',
            { username, password }, { observe: 'response' }
        ).toPromise()
            .then(resp => {
                if (resp.status == 200) {
                    this.token = resp.body.token
                }
                this.currPlayer = username
                // console.info('resp: ', resp)
                return true
            })
            .catch(err => {
                if (err.status == 401) {
                    // handle error
                }
                console.info('err:', err)
                return false
            })
    }

    googleAuth(token) {
        return this.http.get<any>(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`, { observe: 'response' }
        ).toPromise().then(response => {
            // console.log('google auth response:', response)
            this.currPlayer = response.body['email']
            if (response.status == 200) {
                return true
            }
        })
    }

    setTokenfromGoogle(token) {
        this.token = token
        console.log('token set')
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(res => {
            this.checkToken(this.token).then(
                (result) => {
                    res(result)
                },
                error => {
                    console.log('can Activate error', error)
                    this.router.navigate(['/error']);
                    res(false);
                }
            )
        })
    }
}

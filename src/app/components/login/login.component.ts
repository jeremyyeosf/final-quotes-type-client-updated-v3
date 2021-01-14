import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { AuthService } from 'src/app/auth-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ''
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  // token: string = ''

  constructor(private readonly auth: AuthService, private fb: FormBuilder, private authSvc: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authSvc.currPlayer = ''

  }

  checkCredentials() {
    // console.info('> values: ', this.loginForm.value)
    this.authSvc.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .then(result => {
        console.info('>>> result: ', result)
        this.authSvc.setNormalUser()
        this.router.navigate(['/main'])
      })
  }

  login() {
    this.auth
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          return EMPTY;
        }),
      )
      .subscribe(
        (response) => {
          response
          // console.log('GOOG RESPONSE', response)
          this.authSvc.setTokenfromGoogle(response.credential['idToken'])
          this.authSvc.setGoogleUser()
          this.authSvc.googleAuth(response.credential['idToken']).then(
            result => {
              // console.log(result)
              this.router.navigate([`/main`]);
            }
          )
        }

      );
  }


}

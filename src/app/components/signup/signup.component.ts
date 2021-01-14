import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) {}

  ngOnInit(): void {}

  signup = async () => {
    console.log('form:', this.signupForm.value)
    await this.signupService.signup(this.signupForm.value)
    // console.log('response from Express: ', response)
    this.router.navigate(['/'])
  }
}

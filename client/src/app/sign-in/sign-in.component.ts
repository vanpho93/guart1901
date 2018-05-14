import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  formSignIn: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: ['teo@gmail.com', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  signIn() {
    console.log(this.formSignIn.get('email'));
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/core/services/sign-up.service';
import { Router } from '@angular/router';
import { SignUpUser } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})





export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.checkPasswords
      }
    );
  }
   

  


  get user() {
    let usr = new SignUpUser();
     usr.email =  String(this.signUpForm.get('Email').value);
     usr.password =  String(this.signUpForm.get('Password').value);
    return  usr;
  }

  get nameField() {
    return this.signUpForm.get('Name');
  }

  get emailField() {
    return this.signUpForm.get('Email');
  }

  get passwordField() {
    return this.signUpForm.get('Password');
  }

  // get confirmPasswordField() {
  //   return this.signUpForm.get('ConfirmPassword');
  // }

  checkPasswords(group: FormGroup) {
    let pass = group.get('Password').value;
    let confirmPass = group.get('ConfirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.signUpService.signUp(this.user).subscribe((data )=> (
        this.router.navigate(['/sign-in'])
      ), err=> {
        alert('Error');
        console.log(err);
      });
    }}


    // if (this.authService.getCurrentPerson() && this.authService.getCurrentPerson().value) {
    //   return true;
    // } .subscribe((data: User) => (this.user = data))
    // else {
    // this.router.navigate(['/sign-in']);
    //   return false;
    // }}
    // if (!this.signUpForm.valid){
    //   err=> {
    //         alert('Error');
    //        console.log(err);
    
    //      } }
    // else{
    //   this.signUpService.signUp(this.signUpForm.value).subscribe((data ) =>(
    //     this.router.navigate(['/login'])
        
    //   ))
    
    //      }
    // }

  }

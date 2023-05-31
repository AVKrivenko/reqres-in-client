import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignUpUser } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  returnUrl;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.auth.logout();
    this.initForm();
  }

  initForm() {
    this.signInForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }

  get emailField() {
    return this.signInForm.get('Email');
  }

  get passwordField() {
    return this.signInForm.get('Password');
  }

  get user() {
    let usr = new SignUpUser();
     usr.email =  String(this.signInForm.get('Email').value);
     usr.password =  String(this.signInForm.get('Password').value);
    return  usr;
  }

  signIn() {
    if (this.signInForm.valid) {
      this.auth.login(this.user).subscribe(data => {
        if (localStorage.getItem('currentUser') != null) {
          console.log(data);
          this.router.navigate(['/users']);
        }
      });
    }
  }
}

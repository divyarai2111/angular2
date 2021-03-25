import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  userModel: User = new User();
  submitMessage: string = ''
  errMessage:string
  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService) {
      localStorage.clear()

  }

  // loginForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required])
  // })

  loginSubmit() {


    // if (this.loginForm.valid) {
      this.userModel.username = this.username.value
      this.userModel.password = this.password.value

      console.log(this.userModel)
      this.authenticationService.authenticateUser(this.userModel).subscribe((data) => {
        console.log(data);
        this.authenticationService.setBearerToken(data.token)
        // localStorage.setItem("token", data.token)
        // this.router.navigate(["/dashboard"])
        this.routerService.routeToDashboard()
      }, (err) => {
        this.submitMessage = err.message;
        if (err.status === 403) {
          this.submitMessage = err.error.message;
        } else {
          this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
        }
      })
    // }
  }


  getUserNameErrorMessage() {
    if (!this.userModel.username) {
      return "Must enter UserName";
    }
    else {
      return '';
    }
  }
  getPasswordErrorMessage() {
    if (!this.userModel.password) {

      return "Must enter password";
    }
    else {

      return '';
    }
  }
}

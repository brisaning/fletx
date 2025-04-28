import { Component } from '@angular/core';
import { LoginService } from '../../../../servicies/login.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-main',
  imports: [],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss',
  providers: [LoginService],
})
export class LoginMainComponent {

  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  onLogin() {
    let params = {
      email: this.loginForm.value.email.getRawValue(),
      password: this.loginForm.value.password.getRawValue(),
    }

    console.log({'Login button clicked': params, "loginForm": this.loginForm});
    this.loginService.login(params).subscribe(
      response => {
        console.log('Login successful', response);
        // Handle successful login, e.g., navigate to another page
      }
    );
  }
  

}

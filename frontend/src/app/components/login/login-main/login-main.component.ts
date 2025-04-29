import { Component } from '@angular/core';
import { LoginService } from '../../../../servicies/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-main',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss',
  providers: [LoginService],
})
export class LoginMainComponent {

  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.log('Form is invalid');
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.loginForm.markAllAsTouched();
    this.loginForm.markAsPristine();

    const {email, password} = this.loginForm.value;

    let params = {
      email,
      password
    }

    console.log({'Login button clicked': params, "loginForm": this.loginForm.value});
    this.loginService.login(params).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('auth_token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
        // Handle successful login, e.g., navigate to another page
      }
    );
  }

  getRegsiter() {
    this.router.navigate(['/register']);
  }
  

}

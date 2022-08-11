import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'Email': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required)
    });
  }

  login() {
    this.error = false;
    this.authService.logIn(this.loginForm.value.Email, this.loginForm.value.Password)
    .then((success) => {
      if (success) {
        this.router.navigate(['/recipes']);
      }
    })
    .catch(() => {
      this.error = true;
    });
  }

}

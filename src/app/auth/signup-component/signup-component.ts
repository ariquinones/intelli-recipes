import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth-service";

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.html',
  styleUrls: ['../auth.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'Email': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required)
    });
  }

  signup() {
    this.error = false;
    this.authService.signUp(this.signupForm.value.Email, this.signupForm.value.Password)
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
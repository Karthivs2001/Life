
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  errorMessage: string = '';
  successMessage: string = ''; 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params.token;
    });

    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  submit(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.resetForm.valid) {
      const password = this.resetForm.get('password')?.value;

      this.authService.resetPassword(this.token, password).pipe(
        finalize(() => {
          if (!this.errorMessage) {
            this.successMessage = 'Password reset successful. You can now login with your new password.';
          }
        })
      ).subscribe(
        (response) => {
          console.log('Reset Password Response:', response);
        },
        (error) => {
          console.error('Reset Password Error:', error);
          this.errorMessage = 'An error occurred. Please try again.';
        }
      );
    }
  }
}

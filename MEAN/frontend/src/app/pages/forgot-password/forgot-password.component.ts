import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  submit() {
    if (this.forgetForm.valid) {
      const email = this.forgetForm.get('email')?.value;
      this.authService.forgotPassword(email).subscribe(
        (response) => {
         
          console.log(response);
          if (response && response.message) {
          
            this.showSuccessMessage(response.message);
          }
        },
        (error) => {
          
          console.error(error);
          
        }
      );
    }
  }
  
  showSuccessMessage(message: string) {
   
    alert(message);
  }
}

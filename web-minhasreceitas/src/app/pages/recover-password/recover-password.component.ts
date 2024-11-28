import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgOptimizedImage } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {
  recoverPasswordForm!: FormGroup;

  constructor(
    private location: Location,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.recoverPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }


  submit() {
    this.loginService.recoverPassword(this.recoverPasswordForm.value.email)
      .subscribe({
        next: () => {
          this.toastrService.success("Acesse o e-mail informado e siga as instruções.")
          this.router.navigate(['login'])
        },
        error: err => this.toastrService.error(err.error.message)
      })
  }

  back() {
    this.location.back();
  }
}

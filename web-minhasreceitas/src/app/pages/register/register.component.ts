import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router} from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Location, NgOptimizedImage } from '@angular/common';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatButton,
    MatHint
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hide = signal(true);

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private location: Location
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, { validators: this.passwordMatchValidator() })
  }

  submit() {
    this.loginService.register(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      'USER')
      .subscribe({
        next: () => {
          this.toastrService.success("Conta cadastrada com sucesso!")
          this.router.navigate(['login'])
        },
        error: err => this.toastrService.error(err.error.message)
      })
  }

  back() {
    this.location.back()
  }

  private passwordMatchValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const passwordConfirm = group.get('passwordConfirm')?.value;
      const errors: ValidationErrors = {};
      if (password && passwordConfirm && password !== passwordConfirm) {
        errors['passwordMismatch'] = true;
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  getErrorMessage(field: string): string | null {
    if (field === 'passwordConfirm' && this.registerForm.hasError('passwordMismatch')) {
      return 'Senhas não conferem.';
    }
    return null;
  }
}

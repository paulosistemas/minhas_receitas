import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

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
    })
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
}

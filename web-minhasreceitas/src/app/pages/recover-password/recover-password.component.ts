import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {LoginService} from "../../services/login.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recover-password',
  standalone: true,
    imports: [
        ReactiveFormsModule
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

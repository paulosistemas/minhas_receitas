import {Component, inject, signal} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ReactiveFormsModule
} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton, MatIconButton} from "@angular/material/button";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-password-dialog',
  standalone: true,
  imports: [
    MatToolbar,
    MatDivider,
    MatFormField,
    MatIcon,
    MatInput,
    MatSuffix,
    MatFormFieldModule,
    MatIconButton,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.scss']
})
export class EditPasswordDialogComponent {

  private userService = inject(UserService);
  private toastrService = inject(ToastrService);

  userId = parseInt(<string>sessionStorage.getItem('user-id'));

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, {validators: this.passwordMatchValidator()});

  constructor(private dialogRef: MatDialogRef<EditPasswordDialogComponent>) {
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit() {
    const {currentPassword, newPassword} = this.passwordForm.value;
    this.userService.changePassword({
      id: this.userId,
      currentPassword: currentPassword!,
      newPassword: newPassword!,
    }).subscribe({
      next: () => {
        this.toastrService.success("Senha alterada com sucesso!");
        this.dialogRef.close();
      },
      error: err => this.toastrService.error(err.error.message)
    });
  }

  private passwordMatchValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      const currentPassword = group.get('currentPassword')?.value;
      const newPassword = group.get('newPassword')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      const errors: ValidationErrors = {};
      if (currentPassword && newPassword && currentPassword === newPassword) {
        errors['passwordSameAsCurrent'] = true;
      }
      if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        errors['passwordMismatch'] = true;
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  getErrorMessage(field: string): string | null {
    const control = this.passwordForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    if (field === 'newPassword' && this.passwordForm.hasError('passwordSameAsCurrent')) {
      return 'A nova senha não pode ser igual à senha atual.';
    }
    if (field === 'confirmPassword' && this.passwordForm.hasError('passwordMismatch')) {
      return 'A confirmação da senha não corresponde à nova senha.';
    }
    return null;
  }
}

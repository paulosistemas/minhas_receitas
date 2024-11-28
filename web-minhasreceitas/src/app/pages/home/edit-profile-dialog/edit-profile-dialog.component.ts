import {Component, inject} from '@angular/core';
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatToolbar,
    ReactiveFormsModule,
    MatMiniFabButton
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {

  data = inject(MAT_DIALOG_DATA);
  userService = inject(UserService);
  toastrService = inject(ToastrService);

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
  ) {
  }

  editProfileForm = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    image: new FormControl(this.data.image, []),
  });

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        let base64Image = reader.result as string;
        this.editProfileForm.patchValue({image: base64Image})
      };
      reader.readAsDataURL(file)
    }
  }

  submit() {
    const updatedProfile = {
      id: this.data.id,
      name: this.editProfileForm.value.name,
      email: this.editProfileForm.value.email,
      image: this.editProfileForm.value.image,
    }
    this.userService.update(updatedProfile, this.data.id).subscribe({
      next: () => {
        this.toastrService.success("Perfil atualizado com sucesso!")
        this.editProfileForm.reset()
        this.dialogRef.close({
          ...updatedProfile,
        })
      },
      error: err => this.toastrService.error(err.error.message),
    })
  }

  cancel() {
    this.dialogRef.close();
  }
}

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  data = inject(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}

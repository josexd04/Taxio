import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-assign-folio-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, ReactiveFormsModule],
  templateUrl: './assign-folio-dialog.component.html',
  styleUrl: './assign-folio-dialog.component.css'
})
export class AssignFolioDialogComponent {
  readonly data = inject<{ taxiNumber: number }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<AssignFolioDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    folio: ['', [Validators.required]],
  });

  confirm(): void {
    if (this.form.valid) {
      this.dialogRef.close({ folio: this.form.controls.folio.value });
    }
  }
}
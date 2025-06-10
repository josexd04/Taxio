import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-new-taxi-dialog',
    standalone:true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatDialogModule],
    templateUrl: './new-taxi-dialog.component.html',
    styleUrls: ['./new-taxi-dialog.component.css']
})
export class NewTaxiDialogComponent {
  form: FormGroup;
  private readonly dialogRef = inject(MatDialogRef<NewTaxiDialogComponent>);
  readonly data = inject<{ taxiNumber: number }>(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);

  constructor() {
    // Initialize the reactive form with pre-filled taxiNumber (if provided)
    // and set validation rules for required fields.
    this.form = this.formBuilder.group({
      taxiNumber: [this.data?.taxiNumber || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      arrivalFolio: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  confirm(): void {
    if (this.form.valid) {
      // If the form is valid, close the dialog and return the form data.
      this.dialogRef.close({
        taxiNumber: this.form.controls['taxiNumber'].value,
        folio: this.form.controls['arrivalFolio'].value
      });
    } else {
      // Mark all form controls as touched to display validation errors.
      this.form.markAllAsTouched();
    }
  }
}

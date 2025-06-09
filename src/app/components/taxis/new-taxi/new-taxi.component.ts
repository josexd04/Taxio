import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewTaxiDialogComponent } from './new-taxi-dialog/new-taxi-dialog.component';
import { } from '@angular/common/http';
import { TaxisService } from '../../../services/taxis.service';
import { ErrorDialogComponent } from '../../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-new-taxi',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-taxi.component.html',
  styleUrls: ['./new-taxi.component.css'],
})
export class NewTaxiComponent {
  form: FormGroup;
  err: boolean = false;
  errorMessage: string = '';

  // Event emitter to notify parent component of state changes
  @Output() updateStateSignal: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private taxiService: TaxisService) {
    // Initialize the reactive form with validation rules
    this.form = this.fb.group({
      taxiNumber: ['', Validators.required],
      arrivalFolio: ['', Validators.required], // Mark as required if needed
    });
  }

  openDialog(): void {
    // Open the dialog, passing current taxiNumber value (if any)
    const dialogRef = this.dialog.open(NewTaxiDialogComponent, {
      width: '20%',
      data: { taxiNumber: this.form.value.taxiNumber ? Number(this.form.value.taxiNumber) : null },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the form with the data returned from the dialog
        this.form.patchValue({
          taxiNumber: result.taxiNumber,
          arrivalFolio: result.folio,
        });
        // Proceed to add the taxi using the updated form value
        this.addTaxiWithFolio(result.folio);
      }
    });
  }

  addTaxiWithFolio(folio: string): void {
    if (this.form.valid) {
      // Build taxiData object to be sent to the service
      const taxiData = {
        taxiNumber: Number(this.form.value.taxiNumber),
        arrivalFolio: folio
      };

      // Call the service to add a taxi and handle the response
      this.taxiService.addTaxi(taxiData).subscribe({
        next: (response) => {
          console.log('Nuevo taxi agregado:', response);
          this.updateStateSignal.emit(true); // Emit event to notify update
          this.form.reset();
          this.err = false;
        },
        error: (err) => {
          console.error('Error al agregar taxi:', err);
          this.err = true;
          this.errorMessage = err.error;
          this.dialog.open(ErrorDialogComponent, {
            data: { message: this.errorMessage },
          });
        }
      });
    } else {
      // Mark error state if form is invalid
      this.err = true;
      this.errorMessage = 'Unidad inválida';
      console.log(this.errorMessage);
      this.form.markAllAsTouched();
    }
  }
}


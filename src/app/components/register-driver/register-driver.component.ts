import { Component } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { OnInit } from '@angular/core';
import { IDriver } from '../../models/IDriver.models';
import { inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Component({
    selector: 'app-register-driver',
    standalone:true,
    imports: [ReactiveFormsModule, MatInput, MatInputModule],
    templateUrl: './register-driver.component.html',
    styleUrl: './register-driver.component.css'
})
export class RegisterDriverComponent implements OnInit {
  constructor(public driverService: DriverService, private router: Router, private dialog: MatDialog) { }
  private readonly _FormBuilder = inject(FormBuilder)

  formGroup = this._FormBuilder.nonNullable.group({
    name: ['', Validators.required],
    driverID: ['', Validators.required],
    license: ['', Validators.required],
    phone: ["", Validators.required],
    taxiNumber: ["", Validators.required],

  })

  ngOnInit(): void {

  }



  saveDriver() {

    if (this.formGroup.valid) {
      const driverData: IDriver = {
        name: this.formGroup.controls.name.value,
        driverID: this.formGroup.controls.driverID.value,
        license: this.formGroup.controls.license.value,
        phone: Number(this.formGroup.controls.phone.value),
        taxiNumber: Number(this.formGroup.controls.taxiNumber.value)
        
      };

      this.driverService.saveDriver(driverData).subscribe({
        next: (res) => {
          console.log(res)
          this.formGroup.reset()  // Reset the form after successful save
          this.router.navigate(["/active-driver"])
        },
        error: error => {
          console.log(error)
          this.dialog.open(ErrorDialogComponent, {
            data: { message: `${error.error}` }
          })
        }
      })
    } else {
      console.log("Form is not valid")
      this.formGroup.markAllAsTouched()
    }

  }
}
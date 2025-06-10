import { Component } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { OnInit } from '@angular/core';
import { IDriver } from '../../models/IDriver.models';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';



@Component({
    selector: 'app-active-driver',
    imports: [DatePipe],
    templateUrl: './active-driver.component.html',
    styleUrl: './active-driver.component.css'
})
export class ActiveDriverComponent implements OnInit {

  constructor(private driverService: DriverService, private dialog: MatDialog) { }

  drivers: IDriver[] = [];
  driverID: string = ""
  result: string = "";


  ngOnInit(): void {
    this.driverService.getDriver().subscribe(
      {
        next: res => {
          this.drivers = res

        },
        error: error => console.log(error)
        

      }
    )
  }



  activateDriver(driverID: string): void {
    this.driverService.activateDriver(driverID).subscribe(
      {
        next: res => {
          console.log(res)
          this.result = res
          this.ngOnInit()  // Refresh the table with the updated drivers list
        },
        error: error => {
          console.log(error)
          this.dialog.open(ErrorDialogComponent, {
            data: { message: this.result || `${error.error}` }
          })
          this.result = error.error
        }

      }
    )
  }

  deactivateDriver(driverID: string): void {
    this.driverService.deactivateDriver(driverID).subscribe(
      {
        next: res => {
          console.log(res)
          this.result = res
          this.ngOnInit()  // Refresh the table with the updated drivers list
        },
        error: error => {
          console.log(error)
          this.result = error.error
          this.dialog.open(ErrorDialogComponent, {
            data: { message: this.result || `${error.error}` }
          })
        }

      }
    )
  }

}

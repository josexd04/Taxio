import { Component, OnInit } from '@angular/core';
import { TaxisService } from '../../../services/taxis.service';
import { ActivatedRoute, Params, Navigation } from '@angular/router';
import { ITaxi } from '../../../models/ITaxis.models';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';





@Component({
    selector: 'app-taxi-info',
    imports: [DatePipe],
    templateUrl: './taxi-info.component.html',
    styleUrl: './taxi-info.component.css'
})
export class TaxiInfoComponent implements OnInit {

  constructor(private taxiService: TaxisService, private ActiveRoute: ActivatedRoute, private router: Router){

  }

  taxi?: ITaxi;

  taxiNumber: Number = 0

  driverID: string = ""

  error: boolean = false;


  ngOnInit(): void {
    this.ActiveRoute.params.subscribe({
      next: (params: Params) => {
        this.taxiService.getTaxiById(params["_id"]).subscribe({
          next: (taxi: ITaxi) => {
            this.taxi = taxi;
            this.taxiNumber = taxi.taxiNumber
            this.driverID = taxi.driverID
            console.log(this.taxi);
          },
          error: (error) => {
            console.log(error);
            this.error = true
          }
        })
      }
    })
  }

  deleteTaxi(): void {
    if (this.taxi && this.taxi._id) {
      this.taxiService.removeTaxiById(this.taxi._id).subscribe({
        next: () => {
          console.log('Taxi deleted successfully' + this.taxi?.driverID);
          this.router.navigate(['/taxis']);
        },
        error: (error) => {
          console.error('Error deleting taxi:', error);
          this.error = true;
        }
      });
    }


  }

}

import { Component, OnInit } from '@angular/core';
import { TaxisService } from '../../services/taxis.service';
import { ITaxi } from '../../models/ITaxis.models';
import { AssignFolioComponent } from './assign-folio/assign-folio.component';
import { SelectPositionComponent } from './select-position/select-position.component';
import { NewTaxiComponent } from './new-taxi/new-taxi.component';
import { RouterLink } from '@angular/router';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-taxis',
  standalone: true,
  imports: [
    DatePipe,
    NewTaxiComponent,
    SelectPositionComponent,
    RouterLink,
    AssignFolioComponent,
    DragDropModule,
  ],
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css'],
})
export class TaxisComponent implements OnInit {
  taxis: ITaxi[] = [];

  constructor(private taxisService: TaxisService) {}

  ngOnInit(): void {
    this.loadTaxis();
  }

  loadTaxis(): void {
    this.taxisService.getTaxis().subscribe({
      next: (res) => {
        this.taxis = res;
        console.log(this.taxis);
      },
      error: (error) => console.error(error),
    });
  }

  drop(event: CdkDragDrop<ITaxi[]>): void {
    moveItemInArray(this.taxis, event.previousIndex, event.currentIndex);
  }

  handleUpdateState(updated: boolean): void {
    if (updated) {
      this.loadTaxis();
      console.log('El estado ha sido actualizado en el componente hijo.');
    }
  }
}

import { Component, OnInit, input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TaxisService } from '../../../services/taxis.service';

@Component({
    selector: 'app-select-position',
    standalone:true,
    imports: [MatFormFieldModule, MatSelectModule, FormsModule],
    templateUrl: './select-position.component.html',
    styleUrls: ['./select-position.component.css']
})
export class SelectPositionComponent implements OnInit {
  Options = [
    { value: "parking", viewValue: "Parking" },
    { value: 'A', viewValue: 'Terminal A' },
    { value: 'B', viewValue: 'Terminal B' },
    { value: 'C', viewValue: 'Terminal C' },
    { value: "servicioPersonal", viewValue: "Servicio personal" },
    { value: 'polaris', viewValue: 'Polaris' },
    { value: "guardiaNacional", viewValue: "Guardia nacional" },
    { value: "hilton", viewValue: "Hilton" },
    { value: "hangares", viewValue: "Hangares" }
  ];

  constructor(private taxiService: TaxisService) {}

  driverID = input.required<string>();
  initialPosition = input<string | undefined>();
  selectedPosition = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.selectedPosition.set(this.initialPosition());
  }

  onPositionChange(event: MatSelectChange): void {
    const newPosition = event.value;
    this.selectedPosition.set(newPosition);

    const currentDriverID = this.driverID();
   

    if (!currentDriverID) {
       console.error("Error: driverID no está definido. No se puede actualizar la posición.");
       return;
    }

    if (newPosition === undefined || newPosition === null) {
        console.warn("Advertencia: La nueva posición es indefinida. No se actualizará.");
        return;
    }

    const taxiData = {
      driverID: currentDriverID,
      position: newPosition
    };

    this.taxiService.updateTaxiPosition(taxiData).subscribe({
        next: (updatedTaxi) => {
            console.log("Posición actualizada exitosamente:", updatedTaxi);
        },
        error: (err) => {
            console.error("Error al actualizar la posición:", err);
        }
    });
  }
}
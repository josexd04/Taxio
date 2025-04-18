import { Component, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignFolioDialogComponent } from './assign-folio-dialog/assign-folio-dialog.component';
import { input } from '@angular/core';
import { FoliosService } from '../../../services/folios.service';
import { IFolio } from '../../../models/IFolio.models';
import { ErrorDialogComponent } from '../../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-assign-folio',
  templateUrl: './assign-folio.component.html',
  standalone: true,
  styleUrls: ['./assign-folio.component.css'],
})
export class AssignFolioComponent {
  taxiNumberSignal = input<number>();
  updateState = output<boolean>();
  private readonly dialog = inject(MatDialog);
  private readonly folioService = inject(FoliosService);

  openDialog(): void {
    const dialogRef = this.dialog.open(AssignFolioDialogComponent, {
      width: '400px',
      data: { taxiNumber: this.taxiNumberSignal() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignFolio(result.folio);
      }
    });
  }

  assignFolio(folio: string): void {
    const folioData: IFolio = {
      taxiNumber: this.taxiNumberSignal(),
      user: 'testUser',
      folio,
    };

    this.folioService.assignFolios(folioData).subscribe({
      next: () => {
        this.updateState.emit(true);
      },
      error: error => {
        console.error('Error al asignar el folio', error);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: `${error.error}` },
        });
      },
    });
  }
}

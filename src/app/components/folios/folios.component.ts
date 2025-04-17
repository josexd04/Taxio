import { Component, OnInit } from '@angular/core';
import { FoliosService } from '../../services/folios.service';
import { IFolio } from '../../models/IFolio.models';


@Component({
  selector: 'app-folios',
  standalone: true,
  imports: [],
  templateUrl: './folios.component.html',
  styleUrl: './folios.component.css'
})
export class FoliosComponent  implements OnInit {

 folios:IFolio[] = []

constructor( private foliosService: FoliosService){}

ngOnInit(): void {
    this.loadFolios()
}

loadFolios() {
  this.foliosService.getFolios().subscribe({
    next: (res)=> {
      this.folios = res
      console.log(res)
    }, 
    error: (err)=> {
      console.log(err)
    }
  })
}

}


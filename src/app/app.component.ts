import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
constructor(public authService: AuthService){

}
}

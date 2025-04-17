import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [FormsModule, MatInputModule],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css'
})

export class SinginComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  err: boolean = false;
  errorMessage: string = ".";

  user = {
    userName: "",
    password: "",
    token: ""
  }

  signIn() {
    this.authService.signIn(this.user).subscribe({
      next: res =>  {
        console.log(res)
        localStorage.setItem("token", res.token)
        this.authService.loggedIn()

        this.router.navigate(["/taxis"])
      },
      error: (error) => {
        this.err = true;
        this.errorMessage = error.error

      }

    })
  }

}

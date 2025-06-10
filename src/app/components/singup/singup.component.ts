import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-singup',
    imports: [FormsModule],
    templateUrl: './singup.component.html',
    styleUrl: './singup.component.css'
})
export class SingupComponent {

  user = {
    userName: "",
    password: ""
  }

  err: boolean = false;
  errorMessage: string = "";


  constructor(private authService: AuthService, private router: Router) { }


  singUp() {
    this.authService.signUp(this.user).subscribe({
      next: res => {
        console.log(res)
        localStorage.setItem("token", res)
        this.router.navigate(["/taxis"])
      },
      error: error => {
        console.log(error)
        this.err = true;
        this.errorMessage = error.error
      }
    })
  }

}

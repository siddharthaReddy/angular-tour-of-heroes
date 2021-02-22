import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.setMessage();
  }

  ngOnInit(): void {
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn? 'in' : 'Out');
  }

  login() {
    this.message = 'Trying to log in...';

    this.authService.login().subscribe( () => {
      this.setMessage();

      if(this.authService.isLoggedIn) {
        const redirectUrl = '/admin';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}

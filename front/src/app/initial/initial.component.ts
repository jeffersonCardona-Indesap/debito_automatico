import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-initial',
  imports: [],
  standalone: true,
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent implements OnInit {

  token:string='';
  showMessage: boolean = false;

  constructor(private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.showMessage = false;
    this.token = window.localStorage.getItem('token') || '';

    if (this.isValidToken(this.token)) {
      this.authService.setToken(this.token);
      console.log('token: ', this.token);
      this.route.navigate(['/general-content']);
    } else {
      console.log('Invalid token');
      this.showMessage = true;
    }
  }

  isValidToken(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }

}

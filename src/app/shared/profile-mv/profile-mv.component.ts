import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-mv',
  templateUrl: './profile-mv.component.html',
  styleUrls: ['./profile-mv.component.scss']
})
export class ProfileMvComponent {


  username: string = '';
  password: string = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as {
      username: string;
      password: string;
    };

    this.username = state?.username || 'No username';
    this.password = state?.password || 'No password';
  }

  goBack() {
    this.router.navigate(['/mobileui']);
  }
}

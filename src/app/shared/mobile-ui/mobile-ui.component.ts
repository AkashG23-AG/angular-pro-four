import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-ui',
  templateUrl: './mobile-ui.component.html',
  styleUrls: ['./mobile-ui.component.scss']
})
export class MobileUiComponent {
   @HostBinding("class.flex-base") appliedClass = true;
   loginForm: FormGroup;

   constructor(private fb: FormBuilder, private router: Router) {
     this.loginForm = this.fb.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
   }
 
   onLogin() {
     if (this.loginForm.valid) {
       const { username, password } = this.loginForm.value;
       this.router.navigate(['/profilemv'], {
         state: { username, password }
       });
     } else {
       alert('Please enter username and password');
     }
   }


  isOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  closeDrawer() {
    this.isOpen = false;
  }


  showDiv1 = true;

  toggleDiv() {
    this.showDiv1 = !this.showDiv1;
  }
}



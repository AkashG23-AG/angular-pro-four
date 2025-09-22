import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-crud-operation',
  templateUrl: './crud-operation.component.html',
  styleUrls: ['./crud-operation.component.scss']
})
export class CrudOperationComponent implements OnInit{
  userForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(() => {
        this.loadUsers(); // Reload users after adding
        this.userForm.reset();
      });
    }
  }
  editUsers(user: any) {
    this.userService.updateUser(user).subscribe(() => {
      this.loadUsers(); // Reload users after updating
    });
  }
}

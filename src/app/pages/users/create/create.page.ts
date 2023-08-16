import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  user: User = {
    username: '',
    email: '',
    role: 2,
    confirmed: true,
  };

  constructor(private api: UsersService, private router: Router) {}

  ngOnInit() {}

  submitForm(userOutput: User) {
    this.api.createUser(userOutput).subscribe(() => {
      this.router.navigateByUrl('/users');
    });
  }
}

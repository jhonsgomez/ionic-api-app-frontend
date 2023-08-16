import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: number;
  user: User = {
    id: 0,
    username: '',
    email: '',
  };

  constructor(private api: UsersService, private route: ActivatedRoute, private router: Router) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.api.getUser(this.id).subscribe((res) => {
      this.user = res.data;
    });
  }

  submitForm(userOutput: User) {
    this.api.updateUser(userOutput.id!, userOutput).subscribe(() => {
      this.router.navigateByUrl('/users');
    });
  }
}

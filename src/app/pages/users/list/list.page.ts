import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {
  users: User[] = [];

  constructor(
    private api: UsersService,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe((res) => {
      this.users = res.data;
    });
  }

  async deleteUser(user: User) {
    const alert = this.alertController.create({
      header: 'Remove',
      message: 'Remove user ' + user.username + '?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.api.deleteUser(user.id!).subscribe(() => {
              this.getUsers();
            });
          },
        },
        'Cancel',
      ],
    });
    await (await alert).present();
  }
}

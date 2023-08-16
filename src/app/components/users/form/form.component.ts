import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() user: User;
  @Input() title: string;
  @Input() edit: boolean;
  @Input() create: boolean;
  @Output() userOutput = new EventEmitter<User>();
  formUser: FormGroup;

  constructor() {}

  ngOnChanges() {
    this.formUser = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      photo: new FormControl(this.user.photo),
    });
    if (this.edit) {
      this.formUser.addControl(
        'id',
        new FormControl(this.user.id, [Validators.required])
      );
    }
    if (this.create) {
      this.formUser.addControl(
        'password',
        new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(6),
        ])
      );
      this.formUser.addControl('role', new FormControl(this.user.role));
      this.formUser.addControl(
        'confirmed',
        new FormControl(this.user.confirmed)
      );
    }
  }

  submitForm() {
    this.userOutput.emit(this.formUser.value);
  }
}

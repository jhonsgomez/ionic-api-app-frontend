import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [FormComponent],
})
export class FormModule {}

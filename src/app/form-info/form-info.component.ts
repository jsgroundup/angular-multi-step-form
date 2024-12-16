import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppstoreService } from '../services/appstore.service';

@Component({
  selector: 'form-info.content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-info.component.html',
  styleUrl: './form-info.component.css'
})
export class FormInfoComponent {
  appStoreService = inject(AppstoreService)

  get formState (){
    return this.appStoreService.userPersonalInfo()
  }

  activeInputName: ''|'name'|'email'|'phone' = ''

  onFocus(name: InputNames){
    this.activeInputName = name
  }

  onBlur(name: InputNames){
    if(name!==this.activeInputName) return
    this.activeInputName = ''
  }

  nameIsInvalid(){
    const nameInput = this.formState.controls.name;
    return nameInput.invalid&&nameInput.touched&&this.activeInputName!=='name'
  }

  emailIsInvalid(){
    const emailInput = this.formState.controls.email;
    return emailInput.invalid&&emailInput.touched&&this.activeInputName!=='email'
  }

  phoneIsInvalid(){
    const phoneInput = this.formState.controls.phone;
    return phoneInput.invalid&&phoneInput.touched&&this.activeInputName!=='phone'
  }
}


type InputNames = ''|'name'|'email'|'phone'

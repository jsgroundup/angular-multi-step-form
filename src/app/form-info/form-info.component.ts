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
export class FormInfoComponent implements OnInit{
  ngOnInit(): void {
    if(!this.appStoreService.formInfoHasErrors()){
      this.appStoreService.isAboutLeavingPage = false;
      this.appStoreService.selected = 1;
    }
  }
  appStoreService = inject(AppstoreService)

  get formState (){
    return this.appStoreService.userPersonalInfo()
  }

  activeInputName: ''|'name'|'email'|'phone' = ''

  onFocus(name: InputNames){
    this.activeInputName = name;
    this.appStoreService.isAboutLeavingPage = false;
  }

  onBlur(name: InputNames){
    if(name!==this.activeInputName) return
    this.activeInputName = ''
  }

  nameIsInvalid(){
    if (this.activeInputName === 'name') return false;
    const nameInput = this.formState.controls.name;
    if (this.appStoreService.isAboutLeavingPage && nameInput.errors)
      return true;
    return nameInput.invalid&&nameInput.touched;
  }

  emailIsInvalid(){
    if (this.activeInputName === 'email') return false;
    const emailInput = this.formState.controls.email;
    if (this.appStoreService.isAboutLeavingPage && emailInput.errors)
      return true;
    return emailInput.invalid&&emailInput.touched
  }

  phoneIsInvalid(){
    if (this.activeInputName === 'phone') return false;
    const phoneInput = this.formState.controls.phone;
    if(this.appStoreService.isAboutLeavingPage&&phoneInput.errors) return true;
    return phoneInput.invalid&&phoneInput.touched;
  }
}


type InputNames = ''|'name'|'email'|'phone'

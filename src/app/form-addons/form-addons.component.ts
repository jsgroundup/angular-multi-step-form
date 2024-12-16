import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';

@Component({
  selector: 'form-addons.content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-addons.component.html',
  styleUrl: './form-addons.component.css'
})
export class FormAddonsComponent{
  appStoreService = inject(AppstoreService)

  get addons(){
    return this.appStoreService.addons
  }
  onItemSelected(index: number){
    const {selected} = this.addons[index];
    this.addons[index].selected = !selected
  }

  onItemSelectedWithKeyboard(e: KeyboardEvent, index: number){
    if(e.key.toLowerCase()==='enter'){
      this.onItemSelected(index)
    }
  }
}

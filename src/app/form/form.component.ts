import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'formcontent',
  standalone: true,
  imports: [CommonModule,  RouterOutlet],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  appStoreService = inject(AppstoreService)
  SELECTIONS!: SELECTION

  constructor(){
    this.SELECTIONS = this.appStoreService.SELECTIONS
  }
}


type SELECTION = AppstoreService['SELECTIONS']

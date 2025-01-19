import { Component, inject } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})

export class NavPanelComponent {
  appStoreService = inject(AppstoreService)

  router = inject(Router)

  SELECTIONS!: SELECTION

  pathnames!: (keyof typeof this.appStoreService.PATHNAMES)[]

  // Methods
  constructor(){
    this.SELECTIONS = this.appStoreService.SELECTIONS
    this.pathnames = Object.keys(this.appStoreService.PATHNAMES) as typeof this.pathnames
  }

  select(selection: SELECTION[keyof SELECTION]){
    this.appStoreService.navigateTo(selection, true);
  }

  onItemSelectedWithKeyboard(e: KeyboardEvent, selection: SELECTION[keyof SELECTION]){
    if(e.key.toLowerCase()==='enter'){
      this.select(selection)
    }
  }
}



type SELECTION = AppstoreService['SELECTIONS']


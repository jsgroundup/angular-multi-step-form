import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPanelComponent } from "./nav-panel/nav-panel.component";
import { FormComponent } from "./form/form.component";
import { AppstoreService } from './services/appstore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavPanelComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  appStoreService = inject(AppstoreService)

  onBack(){
    const {SELECTIONS} = this.appStoreService
    switch (this.appStoreService.selected) {
      case SELECTIONS.SUMMARY:
        this.appStoreService.selected = SELECTIONS.ADDONS
        break;
      case SELECTIONS.ADDONS:
        this.appStoreService.selected = SELECTIONS.PLAN
        break;
      case SELECTIONS.PLAN:
        this.appStoreService.selected = SELECTIONS.INFO
        break;
    }
    this.appStoreService.saveToLocalStorage()
  }
  onNext(){
    const {SELECTIONS} = this.appStoreService
    switch (this.appStoreService.selected) {
      case SELECTIONS.INFO:
        this.appStoreService.selected = SELECTIONS.PLAN
        break;
      case SELECTIONS.PLAN:
        this.appStoreService.selected = SELECTIONS.ADDONS
        break;
      case SELECTIONS.ADDONS:
        this.appStoreService.selected = SELECTIONS.SUMMARY
        break;
    }
    this.appStoreService.saveToLocalStorage()
  }

  onConfirm(){
    this.appStoreService.detailsConfirmed = true
    this.appStoreService.saveToLocalStorage()
  }
}

import { Component, inject } from '@angular/core';
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
    const {SELECTIONS} = this.appStoreService;
    let backTo = this.appStoreService.selected;
    switch (this.appStoreService.selected) {
      case SELECTIONS.SUMMARY:
        backTo = SELECTIONS.ADDONS
        break;
      case SELECTIONS.ADDONS:
        backTo = SELECTIONS.PLAN
        break;
      case SELECTIONS.PLAN:
        backTo = SELECTIONS.INFO
        break;
    }
    this.appStoreService.navigateTo(backTo);
  }
  onNext(){
    const {SELECTIONS} = this.appStoreService;
    let moveTo = this.appStoreService.selected;
    switch (this.appStoreService.selected) {
      case SELECTIONS.INFO:
        moveTo = SELECTIONS.PLAN
        break;
      case SELECTIONS.PLAN:
        moveTo = SELECTIONS.ADDONS
        break;
      case SELECTIONS.ADDONS:
        moveTo = SELECTIONS.SUMMARY
        break;
    }
    this.appStoreService.navigateTo(moveTo);
  }

  onConfirm(){
    if (
      this.appStoreService.formInfoHasErrors()
    ) {
      this.appStoreService.navigateTo(this.appStoreService.SELECTIONS.INFO);
      return; // Form info has errors
    }

    this.appStoreService.detailsConfirmed = true
    this.appStoreService.saveToLocalStorage()
  }
}

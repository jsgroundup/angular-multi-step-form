import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';

@Component({
  selector: 'form-summary.content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-summary.component.html',
  styleUrl: './form-summary.component.css'
})

export class FormSummaryComponent{
  appStoreService = inject(AppstoreService)

  get selectedAddons(){
    return this.appStoreService.addons.filter(item=>item.selected)
  }

  get totalPrice(){
    return this.selectedAddons.reduce((pre,current)=>pre+current.price, 0) + this.selectedPlanPrice
  }

  get selectedPlanPrice(){
    return this.appStoreService.prices[this.appStoreService.planType][this.appStoreService.planCategory]
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AppstoreService } from '../services/appstore.service';
import { Store } from '@ngrx/store';
import { BIGSTORE } from '../store/appstore.selector';
import { setAddon } from '../store/appstore.actions';

@Component({
  selector: 'form-addons.content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-addons.component.html',
  styleUrl: './form-addons.component.css',
})
export class FormAddonsComponent implements OnInit {

  appStoreService = inject(AppstoreService);
  get addons() {
    return this.appStoreService.addons;
  }

  constructor(private store: Store<BIGSTORE>) {}

  ngOnInit(): void {
    this.appStoreService.selected = 3;
  }

  onItemSelected(index: number) {
    const selected = !this.addons[index].selected; // Toggle selection

    // Update store
    this.store.dispatch(setAddon({ index, selected: selected }));
  }

  onItemSelectedWithKeyboard(e: KeyboardEvent, index: number) {
    if (e.key.toLowerCase() === 'enter') {
      this.onItemSelected(index);
    }
  }
}

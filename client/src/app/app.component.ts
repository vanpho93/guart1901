import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, User } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: User = null;

  constructor(private store: Store<AppState>) {
    this.store.select('user').subscribe(user => this.user = user);
  }
}

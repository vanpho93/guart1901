import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, User } from './types';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  user: User = null;

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.store.select('user').subscribe(user => this.user = user);
    this.userService.check();
  }
}

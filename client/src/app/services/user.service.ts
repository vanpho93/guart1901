import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

const SERVER_URL = 'http://localhost:3000';

@Injectable()

export class UserService {
    constructor(
        private http: Http,
        private router: Router,
        private store: Store<AppState>
    ) {}

    signIn(email: string, password: string) {
        const body = JSON.stringify({ email, password });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${SERVER_URL}/signin`, body, { headers })
        .toPromise()
        .then(res => res.json(), res => res.json())
        .then(resJson => {
            if (!resJson.success) return alert(resJson.message);
            this.store.dispatch({ type: 'SET_USER', user: resJson.user });
            this.router.navigate(['/profile']);
            localStorage.setItem('token', resJson.user.token);
        });
    }

    check() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        return this.http.post(`${SERVER_URL}/check`, null, { headers })
        .toPromise()
        .then(res => res.json(), res => res.json())
        .then(resJson => {
            if (!resJson.success) return this.router.navigate(['/signin']);
            this.store.dispatch({ type: 'SET_USER', user: resJson.user });
            this.store.dispatch({ type: 'LOADED' });
            this.router.navigate(['/profile']);
            localStorage.setItem('token', resJson.user.token);
        });
    }
}

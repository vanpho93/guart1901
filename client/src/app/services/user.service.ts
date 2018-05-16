import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { decode } from 'jsonwebtoken';

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

    verifyToken(): boolean {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                this.store.dispatch({ type: 'LOADED' });
                return false;
            }
            const decoded: any = decode(token);
            if (!decode) {
                this.store.dispatch({ type: 'LOADED' });
                localStorage.removeItem('token');
                return false;
            }
            if (decoded.exp * 1000 < Date.now()) {
                this.store.dispatch({ type: 'LOADED' });
                localStorage.removeItem('token');
                return false;
            }
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            this.store.dispatch({ type: 'LOADED' });
            return false;
        }
    }

    check() {
        const token = localStorage.getItem('token');
        if (!this.verifyToken()) return;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        return this.http.post(`${SERVER_URL}/check`, null, { headers })
        .toPromise()
        .then(res => res.json(), res => res.json())
        .then(resJson => {
            this.store.dispatch({ type: 'LOADED' });
            if (!resJson.success) {
                return localStorage.removeItem('token');
            }
            this.store.dispatch({ type: 'SET_USER', user: resJson.user });
            localStorage.setItem('token', resJson.user.token);
        });
    }

    logOut() {
        this.store.dispatch({ type: 'LOG_OUT' });
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
    }
}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

const SERVER_URL = 'http://localhost:3000';

@Injectable()

export class UserService {
    constructor(private http: Http, private router: Router) {}

    signIn(email: string, password: string) {
        const body = JSON.stringify({ email, password });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${SERVER_URL}/signin`, body, { headers })
        .toPromise()
        .then(res => res.json(), res => res.json())
        .then(resJson => {
            if (!resJson.success) return alert(resJson.message);
            this.router.navigate(['/profile']);
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
            console.log(resJson);
        });
    }
}

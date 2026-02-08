import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token = signal<String | null>(null);
    private user = signal(null);

    constructor(
        private http: HttpClient
    ) {
        this.init();
    }

    private init() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            this.token.set(token);
            this.user.set(JSON.parse(user));
        }
    }

    public getToken() { return this.token() }

    public refreshToken() {
        // TODO: Define an specific return type for this call.
        return this.http.post<any>(environment.apiUrl + '/auth/refresh', {}, { withCredentials: true });
    }

    public createAppointment(appointmentData: any) {
        return this.http.post<any>(environment.apiUrl + '/appointments/create', appointmentData);
    }

    public login(loginData: any) {
        return this.http.post<any>(environment.apiUrl + '/auth/login', loginData)
            .pipe(
                tap(res => {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    this.user.set(res.user);
                    localStorage.setItem('token', res.token);
                    this.token.set(res.token);
                })
            );
    }

    public signup(signupData: any) {
        return this.http.post(environment.apiUrl + '/customers/create', signupData);
    }

    public logout() {
        this.http.post('/logout', {}, { withCredentials: true }).pipe(
            tap(res => {
                localStorage.clear();

                this.user.set(null);
                this.token.set(null);
            })     
        ).subscribe();
    }


}
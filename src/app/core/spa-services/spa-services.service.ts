import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { SpaService } from "@app/shared/models/spa-service.model";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SpaServicesService {
    private services = signal<SpaService[] | null>(null);

    constructor(
        private http: HttpClient
    ) { }

    getServices() { return this.services }

    fetchServices() {
        this.http.get<any>(environment.apiUrl + '/services')
            .subscribe({
                next: res => {
                    this.services.set(res);
                },
                error: err => {
                    console.error(err);
                }
            })
    }


}
import { Component, WritableSignal } from "@angular/core";
import { SpaServicesService } from "@app/core/spa-services/spa-services.service";
import { ServiceCardComponent } from "@app/shared/components/service-card/service-card.component";
import { SpaService } from "@app/shared/models/spa-service.model";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    imports: [
        ServiceCardComponent
    ]
})
export class ServicesComponent {        
    public services: WritableSignal<SpaService[]|null>;

    constructor(
        servicesService: SpaServicesService             
    ) {
        servicesService.fetchServices();
        this.services = servicesService.getServices();
    }
}
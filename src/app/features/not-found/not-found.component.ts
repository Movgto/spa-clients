import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-not-found',
    templateUrl: 'not-found.component.html',
    imports: [
        MatButtonModule,
        RouterLink
    ]
})
export class NotFoundComponent {

}
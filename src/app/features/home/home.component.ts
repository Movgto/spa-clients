import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDivider, MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatDividerModule
    ]
})
export class HomeComponent {

}
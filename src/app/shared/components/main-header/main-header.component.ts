import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-main-header',
    templateUrl: 'main-header.component.html',
    imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive
]
})
export class MainHeaderComponent {
    
}
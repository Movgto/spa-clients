import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainHeaderComponent } from "../../shared/components/main-header/main-header.component";

@Component({
    selector: 'layout-home',
    templateUrl: 'home.layout.html',
    imports: [
        RouterOutlet,
        MainHeaderComponent
    ]
})
export class HomeLayout {

}
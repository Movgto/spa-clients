import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { BookServiceDialog } from "@app/shared/dialogs/book-service/book-service.dialog";
import { SpaService } from "@app/shared/models/spa-service.model";

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    imports: [
        MatDividerModule,
        MatButtonModule
    ]
})
export class ServiceCardComponent {
    public service = input.required<SpaService>();

    constructor(
        private matDialog: MatDialog
    ) {        

    }

    openDialog() {
        this.matDialog.open(BookServiceDialog);
    }
}
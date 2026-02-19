import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-book-service',
    templateUrl: './book-service.dialog.html',
    imports: [
        MatDialogModule,
        MatButtonModule
    ]
})
export class BookServiceDialog {
    constructor(
        private dialogRef: MatDialogRef<BookServiceDialog>        
    ) {}

    close() {
        this.dialogRef.close();
    }
}
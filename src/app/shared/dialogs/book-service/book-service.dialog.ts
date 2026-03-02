import { Component, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormatDatePipe } from "@app/shared/pipes/format-date.pipe";

@Component({
    selector: 'dialog-book-service',
    templateUrl: './book-service.dialog.html',
    imports: [
        MatDialogModule,
        MatButtonModule,
        FormatDatePipe
    ]
})
export class BookServiceDialog {

    public dates = signal<Date[]|null>(null);

    public currentDateIdx = signal<number>(0);    

    constructor(
        private dialogRef: MatDialogRef<BookServiceDialog>        
    ) {
        this.init();
    }

    close() {
        this.dialogRef.close();
    }

    private init() {
        this.initDates();

        console.log("Current dates for appointments:", this.dates());
    }

    private initDates() {
        const today = new Date(Date.now());

        today.setHours(0,0,0,0);

        const dates = [
            today
        ];

        for (let i = 1; i < 4; i++) {
            const nextDate = new Date(dates[i - 1].getTime() + (24 * 60 * 60 * 1000));

            dates.push(nextDate);
        }

        this.dates.set(dates);
    }    
}
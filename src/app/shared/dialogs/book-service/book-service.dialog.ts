import { CommonModule } from "@angular/common";
import { Component, computed, effect, Inject, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { SpaAppointmentsService } from "@app/core/spa-appointments/spa-appointments.service";
import { Slot } from "@app/shared/models/spa-slot.model";
import { FormatDatePipe } from "@app/shared/pipes/format-date.pipe";
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matChevronLeft, matChevronRight } from '@ng-icons/material-icons/baseline'

@Component({
    selector: 'dialog-book-service',
    templateUrl: './book-service.dialog.html',
    imports: [
        MatDialogModule,
        MatButtonModule,
        FormatDatePipe,
        CommonModule,
        NgIcon
    ],
    providers: [
        provideIcons({
            matChevronLeft,
            matChevronRight
        })
    ]
})
export class BookServiceDialog {

    public dates = signal<Date[] | null>(null);

    private currentDateIdx = signal<number>(0);

    public selectedDate = computed(() => this.dates() ? this.dates()![this.currentDateIdx()] : null)

    private appointmentsService = inject(SpaAppointmentsService);

    private appointmentsSlots = this.appointmentsService.availableSlots;

    public freeSlots = computed(() => {
        return this.appointmentsSlots() && this.selectedDate() ?
            this.appointmentsSlots()![this.selectedDate()!.toDateString()]
            : null
    })

    public canMoveBackOnDates = computed(() =>{
        console.log('Updating can move back on dates value...');

        if (!this.dates()) return false;

        const today = new Date();

        console.log("Today is:", today);

        today.setHours(0,0,0,0);

        return this.dates()![0].getTime() > today.getTime();
    })

    constructor(
        private dialogRef: MatDialogRef<BookServiceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { serviceId: number}
    ) {
        this.init();

        effect(() => {
            const dates = this.dates()!;
            
            this.updateSlots(dates);
        });
    }

    private close() {
        this.dialogRef.close();
    }

    private init() {
        this.initDates();

        console.log("Current dates for appointments:", this.dates());

        
    }

    // Dates methods

    private initDates() {
        const today = new Date(Date.now());

        today.setHours(0, 0, 0, 0);

        this.updateDates(today);
    }

    private updateDates(firstDate: Date) {
        firstDate.setHours(0, 0, 0, 0);

        const dates = [
            firstDate
        ];

        for (let i = 1; i < 4; i++) {
            const nextDate = new Date(dates[i - 1].getTime() + (24 * 60 * 60 * 1000));

            dates.push(nextDate);
        }

        this.dates.set(dates);        
    }

    
    public updateDate(index: number) {
        console.log('Updating date...');
        this.currentDateIdx.set(index);
    }   

    public moveDates(direction: 'back'|'forth') {
        if (!this.dates()) return;

        const currentDate = this.dates()![0];

        let daysOffset = 4 * 24 * 60 * 60 * 1000;

        if (direction === 'back') {      
            
            if (!this.canMoveBackOnDates()) return;

            daysOffset *= -1;
        }

        const firstDate = new Date(currentDate.getTime() + daysOffset);

        this.updateDates(firstDate);
    }

    // Slots functions
    
    private updateSlots(dates: Date[]) {
        this.appointmentsService.fetchDatesAvailability(dates, 1).subscribe({
            next: res => {
                console.log('Get appointments slots response:', res);
            }
        })
    }

    public selectSlot(slot: Slot, serviceId: number) {
        console.log('Selecting slot:', slot);
        console.log('Service id', serviceId);
    }
}
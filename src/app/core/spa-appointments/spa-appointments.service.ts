import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { tap } from "rxjs";
import { Slot } from '@app/shared/models/spa-slot.model'

type AvailableSlots = { [key: string]: Slot[] };

@Injectable({ providedIn: 'root' })
export class SpaAppointmentsService {

    public availableSlots = signal<AvailableSlots | null>(null);

    constructor(
        private http: HttpClient
    ) { }

    public fetchDatesAvailability(dates: Date[], serviceId: number) {
        return this.http.post<Slot[][]>(environment.apiUrl + '/appointments/free-slots-days',
            {
                dates,
                serviceId
            }
        )
            .pipe(
                tap(res => {


                    const slotsKeys = Object.keys(this.availableSlots() ?? {});

                    const slotsCopy: AvailableSlots = {};

                    slotsKeys.forEach(s => {
                        slotsCopy[s] = this.availableSlots()![s];
                    });

                    for (let slots of res) {
                        if (slots.length <= 0) {
                            continue;
                        }

                        const date = new Date(slots[0].start);

                        date.setHours(0, 0, 0, 0);

                        slotsCopy[date.toDateString()] = slots;
                    }

                    this.availableSlots.set(slotsCopy);
                })
            )
    }
}
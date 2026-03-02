import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'formatDate',
    standalone: true
})
export class FormatDatePipe implements PipeTransform {
    private dp = new DatePipe('es-MX');

    transform(
        value: Date,
        format: string = 'mediumDate',
        timezone?: string,
        locale?: string
    ) {
        if (value === null) return null;

        return this.dp.transform(value, format, timezone, locale);
    }
}
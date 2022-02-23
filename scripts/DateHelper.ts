export class DateHelper {
    static addDays(date: Date, days: number): Date {
        return new Date(date.getTime() + days * 3600000 * 24);
    }
}
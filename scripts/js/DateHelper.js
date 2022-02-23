export class DateHelper {
    static addDays(date, days) {
        return new Date(date.getTime() + days * 3600000 * 24);
    }
}

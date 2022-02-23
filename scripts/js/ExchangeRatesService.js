import { DateHelper } from "./DateHelper.js";
import { ExchangeRate } from "./ExchangeRate.js";
export class ExchangeRateService {
    get exchangeRates() {
        let date = new Date(Date.now());
        const values = [7.2, 7, 7.1, 7.5, 7.4, 7.4, 7.3, 7.5, 7.5, 7.6, 7.2, 7.1, 7.2, 7.2, 7.1, 7.3, 7.3, 7.4, 7.7, 7.8, 7.7].reverse();
        const exchangeRates = [];
        for (const value of values) {
            exchangeRates.push(new ExchangeRate(new Date(date.getFullYear(), date.getMonth(), date.getDate()), value));
            const days = 5 + Math.random() * 3;
            date = DateHelper.addDays(date, days * -1);
        }
        return exchangeRates.reverse();
    }
}

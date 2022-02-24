import { DateNumberChartControl } from "./DateNumberChartControl.js";
import { DateNumberPair } from "./DateNumberPair.js";
import { ExchangeRate } from "./ExchangeRate.js";

export class ExchangeRateChartControl extends DateNumberChartControl {
    constructor(element: HTMLDivElement) {
        super(element);
    }

    protected override onCurrentPointChanged(value: DateNumberPair): void {
        const exchangeRate = value as ExchangeRate;

        this.infoDiv.innerHTML = `<span class="chart-info-value">${exchangeRate.value.toFixed(2)}<span>&#160;NOK</span></span>
            <span class="chart-info-date">${exchangeRate.date.toDateString().toUpperCase()}</span>`;
    }
}
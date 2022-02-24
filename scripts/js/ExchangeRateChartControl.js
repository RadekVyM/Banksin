import { DateNumberChartControl } from "./DateNumberChartControl.js";
export class ExchangeRateChartControl extends DateNumberChartControl {
    constructor(element) {
        super(element);
    }
    onCurrentPointChanged(value) {
        const exchangeRate = value;
        this.infoDiv.innerHTML = `<span class="chart-info-value">${exchangeRate.value.toFixed(2)}<span>&#160;NOK</span></span>
            <span class="chart-info-date">${exchangeRate.date.toDateString().toUpperCase()}</span>`;
    }
}

import { ExchangeRateChartControl } from './ExchangeRateChartControl.js';
import { ExchangeRateService } from './ExchangeRatesService.js';
import { NavHeaderControl } from './NavHeaderControl.js';
class App {
    constructor() {
        this.controls = [];
        this.exchangeRateService = new ExchangeRateService();
    }
    Run() {
        this.controls.push(new NavHeaderControl(document.querySelector('section.opening-section header')));
        this.controls.push(this.exchangeRateChart = new ExchangeRateChartControl(document.querySelector('section.exchange-section .chart-control')));
        for (const control of this.controls) {
            control.initialize();
        }
        this.exchangeRateChart.update(this.exchangeRateService.exchangeRates);
    }
}
window.onload = function (ev) {
    const app = new App();
    app.Run();
};

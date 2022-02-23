import { Control } from './Control.js';
import { ExchangeRateChartControl } from './ExchangeRateChartControl.js';
import { ExchangeRateService } from './ExchangeRatesService.js';
import { NavHeaderControl } from './NavHeaderControl.js';

class App {
    private controls: Array<Control> = [];
    private exchangeRateChart!: ExchangeRateChartControl;
    private exchangeRateService = new ExchangeRateService();

    public Run(): void {
        this.controls.push(new NavHeaderControl(document.querySelector('section.opening-section header') as HTMLElement))
        this.controls.push(this.exchangeRateChart = new ExchangeRateChartControl(document.querySelector('section.exchange-section .chart-control') as HTMLDivElement))

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
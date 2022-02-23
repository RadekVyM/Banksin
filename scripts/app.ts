import { Control } from './Control.js';
import { HamburgerControl } from './HamburgerControl.js';

class App {
    private controls: Array<Control> = [];

    public Run(): void {
        this.controls.push(new HamburgerControl())

        for (const control of this.controls) {
            control.Initialize();
        }
    }
}

window.onload = function (ev) {
    const app = new App();
    app.Run();
};
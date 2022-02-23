import { HamburgerControl } from './HamburgerControl.js';
class App {
    constructor() {
        this.controls = [];
    }
    Run() {
        this.controls.push(new HamburgerControl());
        for (const control of this.controls) {
            control.Initialize();
        }
    }
}
window.onload = function (ev) {
    const app = new App();
    app.Run();
};

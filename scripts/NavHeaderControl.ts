import { Control } from "./Control.js";

export class NavHeaderControl implements Control {
    private readonly header: HTMLElement;

    constructor(element: HTMLElement) {
        this.header = element;
    }

    initialize(): void {
        const hamburgerButton = this.header.querySelector('#hamburger-button') as HTMLButtonElement;

        hamburgerButton.onclick = () => {
            this.header.classList.toggle('expanded');
        };
    }
}
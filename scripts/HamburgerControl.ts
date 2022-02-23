import { Control } from "./Control.js";

export class HamburgerControl implements Control {
    Initialize(): void {
        const hamburgerButton = document.querySelector('#hamburger-button') as HTMLButtonElement;
        const header = document.querySelector('section.opening-section header') as HTMLElement;

        hamburgerButton.onclick = () => {
            header.classList.toggle('expanded');
        };

        console.log('👋🤔');
    }
}
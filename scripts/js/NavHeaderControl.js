export class NavHeaderControl {
    constructor(element) {
        this.header = element;
    }
    initialize() {
        const hamburgerButton = this.header.querySelector('#hamburger-button');
        hamburgerButton.onclick = () => {
            this.header.classList.toggle('expanded');
        };
    }
}

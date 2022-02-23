export class HamburgerControl {
    Initialize() {
        const hamburgerButton = document.querySelector('#hamburger-button');
        const header = document.querySelector('section.opening-section header');
        hamburgerButton.onclick = () => {
            header.classList.toggle('expanded');
        };
        console.log('👋🤔');
    }
}

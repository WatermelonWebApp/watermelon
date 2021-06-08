class MiFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `Copyright &copy; 2021 Hernandez Nuñez Marco Antonio.`;
    }
}
customElements.define("mi-footer", MiFooter);

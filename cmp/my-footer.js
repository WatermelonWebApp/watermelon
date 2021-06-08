class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* HMTL */
        `<p>
         &copy; 2021
         Marco Antonio Hernandez Nuñez
         </p>`;
    }
}

customElements.define(
    "my-footer", MyFooter);

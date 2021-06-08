class MyProgreso extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `<progress max="100">Cargando...</progress>`;
    }
}

customElements.define("my-progreso", MyProgreso);
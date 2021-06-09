class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Hernández Núñez Marco Antonio.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);

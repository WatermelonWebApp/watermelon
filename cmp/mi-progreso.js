class MiProgeso extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<center><progress max="100">Cargando…</progress></center>`;
  }
}

customElements.define(
  "mi-progreso", MiProgeso);

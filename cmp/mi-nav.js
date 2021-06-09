import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul>
        <a href="index.html" class=logo">
          <img src="img/Logo.png" alt="Logo" width="50" height=auto>
          WATERMELON!
        </a>
        <li>
          <a href="index.html">
            Inicio</a>
        </li>
      </ul>`;
    this.ul = this.querySelector("ul");
    getAuth().onAuthStateChanged(usuario => this.cambiaUsuario(usuario), muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
  async cambiaUsuario(usu) {
    if (usu && usu.email) {
      let html = "";
      const roles =
        await cargaRoles(
          usu.email);
     if (roles.has("Cliente")) {
        html += /* html */
          `<li>
            <a href=
              "chat.html">Noticias del Dia</a>
          </li>`;
      }
      if (roles.has(
        "Administrador")) {
        html += /* html */
          `<li>
            <a href=
              "chat.html">Noticias del Dia</a>
          </li>
          <li>
            <a href="alumnos.html">Edición</a>
          </li>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-nav", MiNav);

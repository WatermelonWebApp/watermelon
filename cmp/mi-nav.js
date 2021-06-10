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
        <span class="marco">
          <img src="img/Logo.png" alt="Logo" width="50" height=auto>
          WATERMELON!
        </span>
      </a>
    </ul>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
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
      /* Enlaces para solo
       * para clientes. */
      if (roles.has("Cliente")) {
        html += /* html */
          `<li>
            <a href="diario.html">
              <span>Diario!</span>
            </a>
          </li>`;
      }
      /* Enlaces para solo
       * administradores.
       */
      if (roles.has(
        "Administrador")) {
        html += /* html */
        `<li>
          <a href="edicion.html">
            <span>Edición!</span>
          </a>
        </li>
        <li>
          <a href="usuarios.html">
            <span>Usuarios</span>
          </a>
        </li>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-nav", MiNav);

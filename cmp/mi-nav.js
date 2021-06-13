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
      <a align="left" href="index.html" class="logo-tr">
        <span>
          WATERMELON!
        </span>
      </a>
    </ul>`;
    this.ul = this.querySelector("ul");
    getAuth().onAuthStateChanged( usuario => this.cambiaUsuario(usuario), muestraError);
  }

  async cambiaUsuario(usu) {
    if (usu && usu.email) {
      let html = "";
      const roles = await cargaRoles(usu.email);
      // Enlaces de usuario "Cliente"
      if (roles.has("Cliente")) {
        html += /* html */
          `<li>
            <a align="right" href="diario.html" class="liga">
              <span>Diario!</span>
            </a>
          </li>`;
      }
      // Enlaces de usuario "Administrador"
      if (roles.has("Administrador")) {
        html += /* html */
        `<li>
          <a align="right" href="edicion.html" class="liga">
            <span>Edición!</span>
          </a>
        </li>
        <li>
          <a align="right" href="usuarios.html" class="liga">
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

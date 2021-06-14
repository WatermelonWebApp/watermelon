import {
  getFirestore
} from "../lib/Fab.js";
import {
  subeStorage
} from "../lib/Storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/Utilit.js";
import {
  muestraUsuarios
} from "./navegacion.js";

const firestore = getFirestore();
const daoRol = firestore.collection("Rol");
const daoUsuario = firestore.collection("Usuario");

export function checksRoles(elemento, valor) {
  const set = new Set(valor || []);
  daoRol.onSnapshot(snap => {
      let html = "";
      if (snap.size > 0) {
        snap.forEach(doc => html += checkRol(doc, set));
      } else {
        html += /* html */
          `<li class="vacio">
              Aun no hay roles
            </li>`;
      }
      elemento.innerHTML = html;
    },
    e => {
      muestraError(e);
      checksRoles(elemento, valor);
    }
  );
}

export function checkRol(doc, set) {
  const data = doc.data();
  const checked = set.has(doc.id) ? "checked" : "";
  return (/* html */
    `<li>
      <label class="fila">
        <input type="checkbox" name="rolIds" value="${cod(doc.id)}" ${checked}>
        <span class="texto">
          <strong class="primario">
            ${cod(doc.id)}
          </strong>
          <span class="secundario">
            ${cod(data.descripción)}
          </span>
        </span>
      </label>
    </li>`);
}

export async function guardaUsuario(evt, formData, id) {
  try {
    evt.preventDefault();
    const rolIds = formData.getAll("rolIds");
    await daoUsuario.doc(id).set({
        rolIds
      });
    const avatar = formData.get("avatar");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}

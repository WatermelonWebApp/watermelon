import {
  getAuth
} from "../lib/Fab.js";
import {
  muestraError
} from "../lib/Utilit.js";
import {
  iniciaSesión,
  terminaSesión
} from "./seguridad.js";

const forma = document["forma"];
const avatar = document.querySelector("#avatar");
getAuth().onAuthStateChanged(muestraSesión, muestraError);

async function muestraSesión(usuario) {
  if (usuario && usuario.email) {
    forma.email.value = usuario.email || "";
    forma.nombre.value = usuario.displayName || "";
    forma.terminarSesión.addEventListener("click", terminaSesión);
  } else {
    iniciaSesión();
  }
}

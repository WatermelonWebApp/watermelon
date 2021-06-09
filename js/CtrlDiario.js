import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

auth.onAuthStateChanged(
  async usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      usuario = usuarioAuth.email;
      muestraMensajes();
    } else {
      await auth.signInWithRedirect(provider);
    }
  },
  procesaError
);

const firestore = firebase.firestore();
function agrega() {
  firestore.collection("MENSAJE").add({
    USUARIO: usuario,
    TEXTO: texto.value.trim(),
    TIMESTAMP: firebase.firestore.FieldValue.serverTimestamp()
  });
  function muestraMensajes() {
    firestore.collection("MENSAJE").orderBy("TIMESTAMP", "desc").onSnapshot(querySnapshot => {
      mensajes.innerHTML = "";
      querySnapshot.forEach(doc => {
        const data = doc.data();
        var d = data.TIMESTAMP.toDate(),
        dformat = [d.getDate(), d.getMonth()+1, d.getFullYear()].join(' - ')+' '+
                  [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        mensajes.innerHTML +=
          `<li><u>${cod(data.USUARIO)}</u>${dformat}<br>${cod(data.TEXTO)}</li>`;
      })
    },
    e => {
      procesaError(e);
      muestraMensajes();
    }
  )
  }
}
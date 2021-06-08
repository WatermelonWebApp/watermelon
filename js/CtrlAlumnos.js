import {
    getAuth, getFirestore
} from "../lib/fabrica.js";
import {
    cod, muestraError
} from "../lib/util.js";
import { muestraAlumnos } from "./navegacion.js";
import {
    tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.querySelector("#lista");
const daoAlumno = getFirestore().collection("Alumno");
getAuth().onAuthStateChanged(protege, muestraError);

/** @param {import(
 * "../lib/tiposFire.js").User}
 * usuario */
async function protege(usuario) {
    if (tieneRol(usuario,["Administrado"])) {
        consulta();
    }
}

function consulta() {
    daoAlumno
        .orderBy("nombre")
        .onSnapshot(htmlLista, arrConsulta);
}

/**
 * @param {import(
 * "../lib/tiposFire.js").querySnapshot} snap */
 function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
        snap.forEach(doc =>
            html += htmlFila(doc));
    } else {
        html += /* html */
            `<li class="vacio">
            -- No hay alumnos registrados --
            </li>`;
    }
    lista.innerHTML = html;
 }

 /**
  * @param {import(
  * "../lib/tiposFire.js").DocumentSnapshot} doc */
  function htmlFila(doc) {
      /**
       * @type {import("./tipos.js").Alumno} */
       const data = doc.data();
       const matricula = cod(data.matricula);
       const nombre = cod(data.nombre);
       var fsf = cod(data.fecha);
       var fecha = new Date(fsf);
       var espacio = "[  -  ]";
       var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join(' - ');
       const parametros = new URLSearchParams();
       parametros.append("id", doc.id);
       return ( /* html */
        `<li>
            <a class= "fila" href= "alumno.html?${parametros}">
                <strong class= "primario">
                    ${matricula} ${nombre} ${dformat}
                </strong>
            </a>
        </li>`);
  }

  /** @param {Event} evt */
  async function guarda(evt) {
      try {
        evt.preventDefault();
        const formData = new FormData(forma);
        const matricula = getString(formData, "matricula").trim();
        const nombre = getString(formData, "nombre").trim();
        const telefono = getString(formData, "telefono").trim();
        const grupo = getString(formData, "grupo").trim();
        const fecha = getString(formData, "fecha").trim();
        /**
         * @type {import("./tipos.js").Alumno} */
         const modelo = {
             matricula,
             nombre,
             telefono,
             grupo,
             fecha
         };
         await daoAlumno.doc(id).set(modelo);
         muestraAlumnos()
      } catch (e) {
          muestraError(e);
      }
  }
  async function elimina(){
      try {
          if (confirm("Confirmar la "+"eliminación")) {
              await daoAlumno.doc(id).delete();
              muestraAlumnos();
          }
      } catch(e) {
        muestraError(e);
      }
  }
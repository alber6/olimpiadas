import { cleanPage } from "../../utils/cleanPage";
import { db, setDoc, doc, collection, query, where, getDocs } from "../../firebase-config";
import "./team.css";

// --- CONFIGURACIÓN DE ORDEN DE JUEGOS PARA CADA EQUIPO ---

// Orden en el que cada equipo juega el Día 1 (Juegos del 1 al 4)
const ORDEN_JUEGOS_DIA1 = {
  1: [1, 2, 4, 3],
  2: [1, 3, 2, 4],
  3: [2, 1, 3, 4],
  4: [2, 4, 1, 3],
  5: [3, 1, 4, 2],
  6: [3, 4, 2, 1],
  7: [4, 2, 3, 1],
  8: [4, 3, 1, 2]
};

// Orden en el que cada equipo juega el Día 2 (Juegos del 5 al 8)
const ORDEN_JUEGOS_DIA2 = {
  1: [5, 6, 8, 7],
  2: [5, 7, 6, 8],
  3: [6, 5, 7, 8],
  4: [6, 8, 5, 7],
  5: [7, 5, 8, 6],
  6: [7, 8, 6, 5],
  7: [8, 6, 7, 5],
  8: [8, 7, 5, 6]
};

// Información detallada de todos los juegos del evento
const DETALLES_DE_JUEGOS = {
  1: { nombre: "Puntería con la mano", descripcion: "Lanzamientos con pelotas hacia aros a diferentes distancias. 1 pto (cerca), 2 ptos (media), 3 ptos (lejos)." },
  2: { nombre: "Relevos", descripcion: "Carrera clásica pasando el testigo. Realizado 3 veces. El ganador de cada ronda consigue 5 puntos." },
  3: { nombre: "Baloncesto con cubos", descripcion: "Lanzamiento por parejas de espaldas con cubo en distancias: 1 pto (cerca), 2 ptos (media), 3 ptos (lejos)." },
  4: { nombre: "Saltos de longitud", descripcion: "Salto a pies juntos sucesivo por todo el grupo. El equipo con mayor distancia gana 5 puntos (3 intentos)." },
  5: { nombre: "Pasa aros", descripcion: "El grupo cogido de la mano debe pasar el aro por todos sin soltarse. 5 puntos para el ganador (3 rondas)." },
  6: { nombre: "Vaso pajita", descripcion: "Pasar un vaso boca abajo con pajita en la boca sin manos. 10 ptos por completarlo, 5 ptos a la mitad." },
  7: { nombre: "Pañuelos", descripcion: "Quitar pañuelos al rival sin perder el propio. 5 puntos por eliminar a todos los rivales (3 rondas)." },
  8: { nombre: "Roba pelotas", descripcion: "Llevar pelotas de una en una al aro rival. 3 rondas, cada victoria otorga 5 puntos." },
  9: { nombre: "Juego Extra 1", descripcion: "Juego de puntuación adicional según las directrices de los organizadores." },
  10: { nombre: "Juego Extra 2", descripcion: "Juego de puntuación adicional según las directrices de los organizadores." }
};

// Muestra una notificación flotante de éxito o error en la pantalla
function mostrarAlertaFlotante(mensaje, tipo = "exito") {
  let contenedorAlertas = document.querySelector(".toast-container");
  if (!contenedorAlertas) {
    contenedorAlertas = document.createElement("div");
    contenedorAlertas.className = "toast-container";
    document.body.appendChild(contenedorAlertas);
  }
  
  const alerta = document.createElement("div");
  alerta.className = `toast ${tipo === "exito" ? "success" : "error"}`;
  
  const icono = tipo === "exito" ? "✅" : "❌";
  alerta.innerHTML = `<span>${icono}</span> <span>${mensaje}</span>`;
  
  contenedorAlertas.appendChild(alerta);
  
  // Ocultar y remover la alerta después de 3 segundos
  setTimeout(() => {
    alerta.style.animation = "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
    setTimeout(() => alerta.remove(), 300);
  }, 3000);
}

// Genera la lista visual de pasos de la línea de tiempo superior
function generarLineaTiempoHTML(diaNumero, idEquipo) {
  let listaJuegos = [];
  if (diaNumero === 1) {
    listaJuegos = ORDEN_JUEGOS_DIA1[idEquipo] || [1, 2, 3, 4];
  } else if (diaNumero === 2) {
    listaJuegos = ORDEN_JUEGOS_DIA2[idEquipo] || [5, 6, 7, 8];
  } else {
    listaJuegos = [9, 10]; // Juegos Extra
  }

  return listaJuegos.map((numeroJuego, indicePaso) => {
    // Para el Día 2 (juegos 5-8), restamos 4 para mostrar "Juego 1, 2, 3, 4" en la interfaz
    // Para Extras (juegos 9-10), restamos 8 para mostrar "Juego 1, 2"
    let numeroParaMostrar = numeroJuego;
    if (numeroJuego >= 5 && numeroJuego <= 8) {
      numeroParaMostrar = numeroJuego - 4;
    } else if (numeroJuego >= 9) {
      numeroParaMostrar = numeroJuego - 8;
    }

    return `
      <div class="step-card">
        <div class="step-badge">${indicePaso + 1}º</div>
        <div class="step-title">Juego ${numeroParaMostrar}</div>
        <div class="step-name">${DETALLES_DE_JUEGOS[numeroJuego].nombre}</div>
      </div>
    `;
  }).join("");
}

// Componente para la pantalla de control y carga de puntos de un equipo
export const Team = async (idEquipo) => {
  const contenedorPrincipal = document.querySelector("main");
  cleanPage(contenedorPrincipal);

  // Pantalla de carga mientras se obtienen los datos de la base de datos
  contenedorPrincipal.innerHTML = `
    <div class="team-loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando información del Equipo ${idEquipo}...</p>
    </div>
  `;

  // Array para guardar las puntuaciones (10 juegos, inician como null)
  const puntosDeJuegos = Array(10).fill(null);
  
  try {
    const referenciaColeccion = collection(db, "resultados");
    const consultaFiltrada = query(referenciaColeccion, where("equipo", "==", `Team ${idEquipo}`));
    const documentosObtenidos = await getDocs(consultaFiltrada);
    
    documentosObtenidos.forEach(documento => {
      const datos = documento.data();
      const numeroDeJuego = datos.juegoNumero;
      if (typeof numeroDeJuego === "number" && numeroDeJuego >= 1 && numeroDeJuego <= 10) {
        puntosDeJuegos[numeroDeJuego - 1] = datos.puntos;
      }
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    mostrarAlertaFlotante("Error al cargar las puntuaciones de la base de datos", "error");
  }

  // Cálculos iniciales para el panel de información
  const puntosTotales = puntosDeJuegos.reduce((acumulado, valor) => acumulado + (valor || 0), 0);
  const juegosRegistrados = puntosDeJuegos.filter(valor => valor !== null).length;

  // Generar HTML principal del panel de control
  contenedorPrincipal.innerHTML = `
    <div class="team-page-container">
      <!-- Ficha de cabecera con avatar e información general del equipo -->
      <section class="team-header-card">
        <div class="team-profile">
          <div class="team-avatar">E${idEquipo}</div>
          <div class="team-title-section">
            <h2>Equipo ${idEquipo}</h2>
            <p>Panel de Control y Carga de Puntos</p>
          </div>
        </div>
        <div class="team-stats">
          <div class="stat-box">
            <span class="stat-value" id="team-total-points">${puntosTotales}</span>
            <span class="stat-label">Puntos Totales</span>
          </div>
          <div class="stat-box">
            <span class="stat-value" id="team-completed-games">${juegosRegistrados}/10</span>
            <span class="stat-label">Juegos Registrados</span>
          </div>
        </div>
      </section>

      <!-- Línea de tiempo que indica el orden en el que deben jugar -->
      <section class="trial-flow-section">
        <h3 id="timeline-heading">Orden de Pruebas (Día 1)</h3>
        <div class="flow-timeline" id="timeline-steps">
          ${generarLineaTiempoHTML(1, idEquipo)}
        </div>
      </section>

      <!-- Selector de pestañas para cambiar de día -->
      <section class="tabs-section">
        <div class="tabs-buttons">
          <button class="tab-btn active" data-tab="dia1">Día 1 (Lunes 15)</button>
          <button class="tab-btn" data-tab="dia2">Día 2 (Martes 16)</button>
          <button class="tab-btn" data-tab="extras">Juegos Extra</button>
        </div>

        <!-- Contenedores con el listado de tarjetas por día -->
        <div class="tab-panes">
          <!-- Tarjetas del Día 1 (Juegos 1 al 4) -->
          <div class="tab-pane active" id="pane-dia1">
            <div class="games-grid">
              ${generarTarjetasJuegoHTML(1, 4, puntosDeJuegos)}
            </div>
          </div>

          <!-- Tarjetas del Día 2 (Juegos 5 al 8 en DB, 1 al 4 en la vista) -->
          <div class="tab-pane" id="pane-dia2">
            <div class="games-grid">
              ${generarTarjetasJuegoHTML(5, 8, puntosDeJuegos)}
            </div>
          </div>

          <!-- Tarjetas de Juegos Extras (Juegos 9 y 10) -->
          <div class="tab-pane" id="pane-extras">
            <div class="games-grid">
              ${generarTarjetasJuegoHTML(9, 10, puntosDeJuegos)}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Controladores de eventos para cambiar entre las pestañas de días
  const botonesPestañas = contenedorPrincipal.querySelectorAll(".tab-btn");
  const panelesPestañas = contenedorPrincipal.querySelectorAll(".tab-pane");
  
  botonesPestañas.forEach(boton => {
    boton.addEventListener("click", () => {
      botonesPestañas.forEach(b => b.classList.remove("active"));
      panelesPestañas.forEach(p => p.classList.remove("active"));
      
      boton.classList.add("active");
      const panelActivo = contenedorPrincipal.querySelector(`#pane-${boton.dataset.tab}`);
      if (panelActivo) panelActivo.classList.add("active");
      
      const cabeceraTimeline = contenedorPrincipal.querySelector("#timeline-heading");
      const pasosTimeline = contenedorPrincipal.querySelector("#timeline-steps");
      
      if (boton.dataset.tab === "dia1") {
        cabeceraTimeline.textContent = "Orden de Pruebas (Día 1)";
        pasosTimeline.innerHTML = generarLineaTiempoHTML(1, idEquipo);
      } else if (boton.dataset.tab === "dia2") {
        cabeceraTimeline.textContent = "Orden de Pruebas (Día 2)";
        pasosTimeline.innerHTML = generarLineaTiempoHTML(2, idEquipo);
      } else {
        cabeceraTimeline.textContent = "Juegos Extra";
        pasosTimeline.innerHTML = generarLineaTiempoHTML(3, idEquipo);
      }
    });
  });

  // Vincular eventos de incrementar, decrementar y guardar para cada uno de los 10 juegos
  for (let num = 1; num <= 10; num++) {
    const selectorInput = contenedorPrincipal.querySelector(`#score-input-${num}`);
    const botonRestar = contenedorPrincipal.querySelector(`#btn-less-${num}`);
    const botonSumar = contenedorPrincipal.querySelector(`#btn-more-${num}`);
    const botonGuardar = contenedorPrincipal.querySelector(`#btn-save-${num}`);
    const etiquetaPuntosGuardados = contenedorPrincipal.querySelector(`#saved-badge-${num}`);
    const tarjetaJuego = contenedorPrincipal.querySelector(`#game-card-${num}`);

    if (!selectorInput || !botonGuardar) continue;

    // Acción para decrementar en 1
    botonRestar.addEventListener("click", () => {
      const valorActual = parseFloat(selectorInput.value) || 0;
      if (valorActual > 0) {
        selectorInput.value = Math.max(0, valorActual - 1);
        tarjetaJuego.classList.add("is-dirty"); // Agrega la etiqueta visual "Sin guardar"
      }
    });

    // Acción para incrementar en 1
    botonSumar.addEventListener("click", () => {
      const valorActual = parseFloat(selectorInput.value) || 0;
      selectorInput.value = valorActual + 1;
      tarjetaJuego.classList.add("is-dirty"); // Agrega la etiqueta visual "Sin guardar"
    });

    // Acción si el usuario escribe directamente en el campo de texto
    selectorInput.addEventListener("input", () => {
      tarjetaJuego.classList.add("is-dirty");
    });

    // Acción para guardar los puntos en Firebase
    botonGuardar.addEventListener("click", async () => {
      const valorAGuardar = parseFloat(selectorInput.value);
      if (isNaN(valorAGuardar) || valorAGuardar < 0) {
        mostrarAlertaFlotante("Por favor, introduce una puntuación válida (0 o mayor).", "error");
        return;
      }

      // Bloquear campos de entrada durante la subida de datos
      botonGuardar.disabled = true;
      selectorInput.disabled = true;
      botonRestar.disabled = true;
      botonSumar.disabled = true;
      botonGuardar.innerHTML = `<span class="saving-loader"></span>`;

      try {
        const idDocumentoBaseDatos = `team${idEquipo}-juego${num}`;
        const referenciaDocumento = doc(db, "resultados", idDocumentoBaseDatos);

        await setDoc(referenciaDocumento, {
          equipo: `Team ${idEquipo}`,
          juego: `Juego ${num}`,
          juegoNumero: num,
          puntos: valorAGuardar,
          dia: num <= 4 ? "Día 1" : num <= 8 ? "Día 2" : "Extra",
          fecha: new Date()
        });

        // Guardar la puntuación en la memoria del componente
        puntosDeJuegos[num - 1] = valorAGuardar;

        // Limpiar la clase "Sin guardar" y añadir destello de éxito
        tarjetaJuego.classList.remove("is-dirty");
        tarjetaJuego.classList.add("save-success");
        setTimeout(() => tarjetaJuego.classList.remove("save-success"), 1500);

        // Actualizar la etiqueta visual del marcador actual
        etiquetaPuntosGuardados.className = "saved-points-badge";
        etiquetaPuntosGuardados.textContent = `${valorAGuardar} pts`;

        // Recalcular y actualizar totales
        const nuevoTotal = puntosDeJuegos.reduce((acumulado, valor) => acumulado + (valor || 0), 0);
        const nuevosCompletados = puntosDeJuegos.filter(valor => valor !== null).length;
        contenedorPrincipal.querySelector("#team-total-points").textContent = nuevoTotal;
        contenedorPrincipal.querySelector("#team-completed-games").textContent = `${nuevosCompletados}/10`;

        // Calcular número para mostrar en la alerta ("Juego 1, 2, 3 o 4")
        const numeroParaMostrar = num <= 4 ? num : (num <= 8 ? num - 4 : num - 8);
        const etiquetaDia = num <= 4 ? "Día 1" : num <= 8 ? "Día 2" : "Extra";
        mostrarAlertaFlotante(`¡Juego ${numeroParaMostrar} (${etiquetaDia}) guardado con ${valorAGuardar} puntos!`, "exito");
      } catch (error) {
        console.error("Error al guardar puntuación en Firebase:", error);
        mostrarAlertaFlotante("Error al conectar con la base de datos", "error");
        tarjetaJuego.classList.add("save-error");
        setTimeout(() => tarjetaJuego.classList.remove("save-error"), 1500);
      } finally {
        // Desbloquear controles
        botonGuardar.disabled = false;
        selectorInput.disabled = false;
        botonRestar.disabled = false;
        botonSumar.disabled = false;
        botonGuardar.innerHTML = `Guardar`;
      }
    });
  }
};

// Genera el listado HTML de las tarjetas de entrada para los juegos
function generarTarjetasJuegoHTML(rangoInicio, rangoFin, puntosDeJuegos) {
  let codigoHTML = "";
  for (let num = rangoInicio; num <= rangoFin; num++) {
    const puntuacionGuardada = puntosDeJuegos[num - 1];
    const informacionJuego = DETALLES_DE_JUEGOS[num];
    const tienePuntos = puntuacionGuardada !== null;
    
    // Si es del Día 2 (juegos 5-8), mostramos en la tarjeta "JUEGO 1, 2, 3, 4"
    // Si es Extra (juegos 9-10), mostramos "JUEGO 1 EXTRA, 2 EXTRA"
    let numeroParaMostrar = num;
    let etiquetaExtra = "";
    if (num >= 5 && num <= 8) {
      numeroParaMostrar = num - 4;
    } else if (num >= 9) {
      numeroParaMostrar = num - 8;
      etiquetaExtra = " EXTRA";
    }
    
    codigoHTML += `
      <div class="game-card" id="game-card-${num}">
        <div class="game-card-header">
          <span class="game-number">JUEGO ${numeroParaMostrar}${etiquetaExtra}</span>
          <span class="saved-points-badge ${tienePuntos ? '' : 'empty'}" id="saved-badge-${num}">
            ${tienePuntos ? puntuacionGuardada + ' pts' : 'Sin registrar'}
          </span>
        </div>
        <div class="game-card-body">
          <h4>${informacionJuego.nombre}</h4>
          <p>${informacionJuego.descripcion}</p>
        </div>
        <div class="game-card-footer">
          <div class="score-input-wrapper">
            <button type="button" class="btn-adjust" id="btn-less-${num}">−</button>
            <input type="number" class="score-field" id="score-input-${num}" value="${tienePuntos ? puntuacionGuardada : ''}" placeholder="0" min="0">
            <button type="button" class="btn-adjust" id="btn-more-${num}">+</button>
          </div>
          <button type="button" class="btn-save" id="btn-save-${num}">Guardar</button>
        </div>
      </div>
    `;
  }
  return codigoHTML;
}

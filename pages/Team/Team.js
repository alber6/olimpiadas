import { cleanPage } from "../../utils/cleanPage";
import { db, setDoc, doc, collection, query, where, getDocs } from "../../firebase-config";
import "./team.css";

/**
 * CONFIGURACIÓN DE ORDEN DE PRUEBAS PARA CADA EQUIPO
 */

// Orden de pruebas para el Día 1 (Juegos del 1 al 4)
const TRIAL_ORDERS_DAY1 = {
  1: [1, 2, 4, 3],
  2: [1, 3, 2, 4],
  3: [2, 1, 3, 4],
  4: [2, 4, 1, 3],
  5: [3, 1, 4, 2],
  6: [3, 4, 2, 1],
  7: [4, 2, 3, 1],
  8: [4, 3, 1, 2]
};

// Orden de pruebas para el Día 2 (Juegos del 5 al 8)
const TRIAL_ORDERS_DAY2 = {
  1: [5, 6, 8, 7],
  2: [5, 7, 6, 8],
  3: [6, 5, 7, 8],
  4: [6, 8, 5, 7],
  5: [7, 5, 8, 6],
  6: [7, 8, 6, 5],
  7: [8, 6, 7, 5],
  8: [8, 7, 5, 6]
};

// Mapa detallado con los nombres e información rápida de cada juego
const GAME_DETAILS = {
  1: { name: "Puntería con la mano", desc: "Lanzamientos con pelotas hacia aros a diferentes distancias. 1 pto (cerca), 2 ptos (media), 3 ptos (lejos)." },
  2: { name: "Relevos", desc: "Carrera clásica pasando el testigo. Realizado 3 veces. El ganador de cada ronda consigue 5 puntos." },
  3: { name: "Baloncesto con cubos", desc: "Lanzamiento por parejas de espaldas con cubo en distancias: 1 pto (cerca), 2 ptos (media), 3 ptos (lejos)." },
  4: { name: "Saltos de longitud", desc: "Salto a pies juntos sucesivo por todo el grupo. El equipo con mayor distancia gana 5 puntos (3 intentos)." },
  5: { name: "Pasa aros", desc: "El grupo cogido de la mano debe pasar el aro por todos sin soltarse. 5 puntos para el ganador (3 rondas)." },
  6: { name: "Vaso pajita", desc: "Pasar un vaso boca abajo con pajita en la boca sin manos. 10 ptos por completarlo, 5 ptos a la mitad." },
  7: { name: "Pañuelos", desc: "Quitar pañuelos al rival sin perder el propio. 5 puntos por eliminar a todos los rivales (3 rondas)." },
  8: { name: "Roba pelotas", desc: "Llevar pelotas de una en una al aro rival. 3 rondas, cada victoria otorga 5 puntos." },
  9: { name: "Juego Extra 1", desc: "Juego de puntuación adicional según las directrices de los organizadores." },
  10: { name: "Juego Extra 2", desc: "Juego de puntuación adicional según las directrices de los organizadores." }
};

/**
 * Muestra una alerta flotante temporal en la pantalla (Toast Notification)
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success' para éxito, 'error' para errores)
 */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  
  container.appendChild(toast);
  
  // Animación de salida inversa y posterior eliminación del DOM
  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Renderiza los pasos/cards de la línea de tiempo superior
 * @param {number} dayNum - Día de actividades (1 para Día 1, 2 para Día 2, 3 para Juegos Extra)
 * @param {number} teamId - ID numérico del equipo (1-8)
 * @returns {string} Código HTML con los pasos
 */
function renderTimelineSteps(dayNum, teamId) {
  let order = [];
  if (dayNum === 1) {
    order = TRIAL_ORDERS_DAY1[teamId] || [1, 2, 3, 4];
  } else if (dayNum === 2) {
    order = TRIAL_ORDERS_DAY2[teamId] || [5, 6, 7, 8];
  } else {
    order = [9, 10]; // Juegos Extra
  }

  return order.map((gameNum, index) => `
    <div class="step-card">
      <div class="step-badge">${index + 1}º</div>
      <div class="step-title">Juego ${gameNum}</div>
      <div class="step-name">${GAME_DETAILS[gameNum].name}</div>
    </div>
  `).join("");
}

/**
 * Componente principal para el Panel del Equipo
 * @param {number} teamId - ID del equipo (1-8)
 */
export const Team = async (teamId) => {
  const main = document.querySelector("main");
  cleanPage(main);

  // Estado de carga inicial
  main.innerHTML = `
    <div class="team-loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando información del Equipo ${teamId}...</p>
    </div>
  `;

  // Inicialización del array local de puntos (10 juegos, por defecto null si no se han cargado)
  const scores = Array(10).fill(null);
  
  try {
    const colRef = collection(db, "resultados");
    const q = query(colRef, where("equipo", "==", `Team ${teamId}`));
    const snapshot = await getDocs(q);
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const index = data.juegoNumero;
      if (typeof index === "number" && index >= 1 && index <= 10) {
        scores[index - 1] = data.puntos;
      }
    });
  } catch (error) {
    console.error("Error al cargar puntuaciones de Firebase:", error);
    showToast("Error al pre-cargar las puntuaciones", "error");
  }

  // Cálculos iniciales para el resumen de estadísticas
  const totalPoints = scores.reduce((acc, val) => acc + (val || 0), 0);
  const completedGames = scores.filter(v => v !== null).length;

  // Estructura HTML principal de la vista del equipo
  main.innerHTML = `
    <div class="team-page-container">
      <!-- Ficha de Cabecera con Info y Totales -->
      <section class="team-header-card">
        <div class="team-profile">
          <div class="team-avatar">E${teamId}</div>
          <div class="team-title-section">
            <h2>Equipo ${teamId}</h2>
            <p>Panel de Control y Carga de Puntos</p>
          </div>
        </div>
        <div class="team-stats">
          <div class="stat-box">
            <span class="stat-value" id="team-total-points">${totalPoints}</span>
            <span class="stat-label">Puntos Totales</span>
          </div>
          <div class="stat-box">
            <span class="stat-value" id="team-completed-games">${completedGames}/10</span>
            <span class="stat-label">Juegos Registrados</span>
          </div>
        </div>
      </section>

      <!-- Línea de tiempo con el Orden de Pruebas Dinámico -->
      <section class="trial-flow-section">
        <h3 id="timeline-heading">Orden de Pruebas (Día 1)</h3>
        <div class="flow-timeline" id="timeline-steps">
          ${renderTimelineSteps(1, teamId)}
        </div>
      </section>

      <!-- Selector de Pestañas por Días de Actividad -->
      <section class="tabs-section">
        <div class="tabs-buttons">
          <button class="tab-btn active" data-tab="dia1">Día 1 (Lunes 15)</button>
          <button class="tab-btn" data-tab="dia2">Día 2 (Martes 16)</button>
          <button class="tab-btn" data-tab="extras">Juegos Extra</button>
        </div>

        <!-- Contenedores con el listado de tarjetas por día -->
        <div class="tab-panes">
          <!-- Juegos del Día 1 -->
          <div class="tab-pane active" id="pane-dia1">
            <div class="games-grid">
              ${renderGameCards(1, 4, scores)}
            </div>
          </div>

          <!-- Juegos del Día 2 -->
          <div class="tab-pane" id="pane-dia2">
            <div class="games-grid">
              ${renderGameCards(5, 8, scores)}
            </div>
          </div>

          <!-- Juegos Extras -->
          <div class="tab-pane" id="pane-extras">
            <div class="games-grid">
              ${renderGameCards(9, 10, scores)}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Controladores de eventos para el cambio de pestañas (Días)
  const tabButtons = main.querySelectorAll(".tab-btn");
  const tabPanes = main.querySelectorAll(".tab-pane");
  
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Quitar clases activas de todas las pestañas
      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));
      
      // Activar pestaña actual
      btn.classList.add("active");
      const activePane = main.querySelector(`#pane-${btn.dataset.tab}`);
      if (activePane) activePane.classList.add("active");
      
      // Actualizar dinámicamente el Orden de Pruebas superior
      const timelineHeading = main.querySelector("#timeline-heading");
      const timelineSteps = main.querySelector("#timeline-steps");
      
      if (btn.dataset.tab === "dia1") {
        timelineHeading.textContent = "Orden de Pruebas (Día 1)";
        timelineSteps.innerHTML = renderTimelineSteps(1, teamId);
      } else if (btn.dataset.tab === "dia2") {
        timelineHeading.textContent = "Orden de Pruebas (Día 2)";
        timelineSteps.innerHTML = renderTimelineSteps(2, teamId);
      } else {
        timelineHeading.textContent = "Juegos Extra";
        timelineSteps.innerHTML = renderTimelineSteps(3, teamId);
      }
    });
  });

  // Enlazar inputs, botones de incremento y guardado para cada uno de los 10 juegos
  for (let num = 1; num <= 10; num++) {
    const input = main.querySelector(`#score-input-${num}`);
    const btnLess = main.querySelector(`#btn-less-${num}`);
    const btnMore = main.querySelector(`#btn-more-${num}`);
    const btnSave = main.querySelector(`#btn-save-${num}`);
    const scoreBadge = main.querySelector(`#saved-badge-${num}`);
    const card = main.querySelector(`#game-card-${num}`);

    if (!input || !btnSave) continue;

    // Botón "-" decremento rápido
    btnLess.addEventListener("click", () => {
      const currentVal = parseFloat(input.value) || 0;
      if (currentVal > 0) {
        input.value = Math.max(0, currentVal - 1);
        card.classList.add("is-dirty"); // Marca la tarjeta como "modificada pero sin guardar"
      }
    });

    // Botón "+" incremento rápido
    btnMore.addEventListener("click", () => {
      const currentVal = parseFloat(input.value) || 0;
      input.value = currentVal + 1;
      card.classList.add("is-dirty"); // Marca la tarjeta como "modificada pero sin guardar"
    });

    // Cambios directos en el input de texto manual
    input.addEventListener("input", () => {
      card.classList.add("is-dirty");
    });

    // Botón Guardar - Carga a Firestore
    btnSave.addEventListener("click", async () => {
      const value = parseFloat(input.value);
      if (isNaN(value) || value < 0) {
        showToast("Por favor, introduce una puntuación válida (0 o mayor).", "error");
        return;
      }

      // Bloquear elementos y mostrar loader
      btnSave.disabled = true;
      input.disabled = true;
      btnLess.disabled = true;
      btnMore.disabled = true;
      btnSave.innerHTML = `<span class="saving-loader"></span>`;

      try {
        const docId = `team${teamId}-juego${num}`;
        const docRef = doc(db, "resultados", docId);

        await setDoc(docRef, {
          equipo: `Team ${teamId}`,
          juego: `Juego ${num}`,
          juegoNumero: num,
          puntos: value,
          dia: num <= 4 ? "Día 1" : num <= 8 ? "Día 2" : "Extra",
          fecha: new Date()
        });

        // Actualizar array de puntuaciones en memoria local
        scores[num - 1] = value;

        // Quitar estado modificado y aplicar efecto CSS de éxito temporal
        card.classList.remove("is-dirty");
        card.classList.add("save-success");
        setTimeout(() => card.classList.remove("save-success"), 1500);

        // Actualizar etiqueta del marcador guardado
        scoreBadge.className = "saved-points-badge";
        scoreBadge.textContent = `${value} pts`;

        // Actualizar estadísticas superiores globales
        const updatedTotal = scores.reduce((acc, val) => acc + (val || 0), 0);
        const updatedCompleted = scores.filter(v => v !== null).length;
        main.querySelector("#team-total-points").textContent = updatedTotal;
        main.querySelector("#team-completed-games").textContent = `${updatedCompleted}/10`;

        showToast(`¡Juego ${num} guardado con ${value} puntos!`);
      } catch (error) {
        console.error("Error al guardar puntuación:", error);
        showToast("Error al guardar en la base de datos.", "error");
        card.classList.add("save-error");
        setTimeout(() => card.classList.remove("save-error"), 1500);
      } finally {
        // Desbloquear controles y restaurar texto original del botón
        btnSave.disabled = false;
        input.disabled = false;
        btnLess.disabled = false;
        btnMore.disabled = false;
        btnSave.innerHTML = `Guardar`;
      }
    });
  }
};

/**
 * Función auxiliar para renderizar el listado HTML de las tarjetas de juego
 * @param {number} start - Juego inicial (ej. 1)
 * @param {number} end - Juego final (ej. 4)
 * @param {Array} scores - Array local con los resultados cargados de Firebase
 * @returns {string} Código HTML concatenado
 */
function renderGameCards(start, end, scores) {
  let html = "";
  for (let num = start; num <= end; num++) {
    const savedScore = scores[num - 1];
    const details = GAME_DETAILS[num];
    const hasScore = savedScore !== null;
    
    html += `
      <div class="game-card" id="game-card-${num}">
        <div class="game-card-header">
          <span class="game-number">JUEGO ${num}</span>
          <span class="saved-points-badge ${hasScore ? '' : 'empty'}" id="saved-badge-${num}">
            ${hasScore ? savedScore + ' pts' : 'Sin registrar'}
          </span>
        </div>
        <div class="game-card-body">
          <h4>${details.name}</h4>
          <p>${details.desc}</p>
        </div>
        <div class="game-card-footer">
          <div class="score-input-wrapper">
            <button type="button" class="btn-adjust" id="btn-less-${num}">−</button>
            <input type="number" class="score-field" id="score-input-${num}" value="${hasScore ? savedScore : ''}" placeholder="0" min="0">
            <button type="button" class="btn-adjust" id="btn-more-${num}">+</button>
          </div>
          <button type="button" class="btn-save" id="btn-save-${num}">Guardar</button>
        </div>
      </div>
    `;
  }
  return html;
}

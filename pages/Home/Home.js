import "./Home.css";
import { cleanPage } from "../../utils/cleanPage";
import { db } from "../../firebase-config.js";
import { collection, query, where, getDocs } from "../../firebase-config.js";
import { Team } from "../Team/Team";

// Obtiene las puntuaciones de la base de datos para un equipo específico (Juegos del 1 al 8)
export async function getGameScores(nombreDelEquipo) {
  const listadoDePuntos = Array(8).fill(0);
  const referenciaResultados = collection(db, "resultados");
  const consultaEquipos = query(referenciaResultados, where("equipo", "==", nombreDelEquipo));

  try {
    const documentosObtenidos = await getDocs(consultaEquipos);
    documentosObtenidos.forEach(documento => {
      const datos = documento.data();
      const numeroDeJuego = datos.juegoNumero;
      if (typeof numeroDeJuego === "number" && numeroDeJuego >= 1 && numeroDeJuego <= 8) {
        listadoDePuntos[numeroDeJuego - 1] = datos.puntos || 0;
      }
    });
  } catch (error) {
    console.error(`Error al obtener puntuación para ${nombreDelEquipo}:`, error);
  }
  return listadoDePuntos;
}

// Componente para pintar la página de inicio con la clasificación y el cronograma
export const HomeGames = async () => {
  const contenedorPrincipal = document.querySelector("main");
  cleanPage(contenedorPrincipal);

  // Pantalla de carga mientras se consultan las puntuaciones de los equipos
  contenedorPrincipal.innerHTML = `
    <div class="home-loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando Clasificación en Tiempo Real...</p>
    </div>
  `;

  // Cargar en paralelo las puntuaciones de los 8 equipos
  const listaEquipos = [];
  try {
    const listadoPromesas = Array.from({ length: 8 }, (_, indice) => {
      const idEquipo = indice + 1;
      return getGameScores(`Team ${idEquipo}`).then(puntos => {
        const puntuacionTotal = puntos.reduce((acumulado, valor) => acumulado + valor, 0);
        const juegosConPuntos = puntos.filter(valor => valor > 0).length;
        listaEquipos.push({ id: idEquipo, scores: puntos, total: puntuacionTotal, completed: juegosConPuntos });
      });
    });

    await Promise.all(listadoPromesas);
  } catch (error) {
    console.error("Error al cargar la información de los equipos:", error);
  }

  // Ordenar los equipos de mayor a menor puntuación total para la clasificación
  listaEquipos.sort((equipoA, equipoB) => equipoB.total - equipoA.total);

  // Generar el HTML de las filas de la tabla de clasificación
  const tablaClasificacionHTML = listaEquipos.map((equipo, indiceClasificacion) => {
    let medallaOEspecificacion = "";
    let claseDeFila = "";

    if (indiceClasificacion === 0) {
      medallaOEspecificacion = "🥇";
      claseDeFila = "rank-1";
    } else if (indiceClasificacion === 1) {
      medallaOEspecificacion = "🥈";
      claseDeFila = "rank-2";
    } else if (indiceClasificacion === 2) {
      medallaOEspecificacion = "🥉";
      claseDeFila = "rank-3";
    } else {
      medallaOEspecificacion = `<span class="rank-number">${indiceClasificacion + 1}</span>`;
    }

    // Calcular el progreso porcentual respecto a la puntuación del líder
    const puntuacionMaxima = Math.max(...listaEquipos.map(eq => eq.total), 1);
    const porcentajeProgreso = Math.min(100, Math.round((equipo.total / puntuacionMaxima) * 100));

    // Generar pequeñas esferas indicativas de puntos por juego (8 esferas ahora)
    const esferasPuntuacionHTML = equipo.scores.map((puntosJuego, indiceJuego) => `
      <span class="score-badge-mini ${puntosJuego > 0 ? 'active' : ''}" title="Juego ${indiceJuego + 1}: ${puntosJuego} pts">
        ${puntosJuego}
      </span>
    `).join("");

    return `
      <div class="leaderboard-row ${claseDeFila}" data-team-id="${equipo.id}">
        <div class="rank-col">${medallaOEspecificacion}</div>
        <div class="team-col">
          <span class="team-name">Equipo ${equipo.id}</span>
          <span class="team-details">Juegos registrados: ${equipo.completed}/8</span>
        </div>
        <div class="progress-col">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${porcentajeProgreso}%"></div>
          </div>
          <div class="mini-scores-container">${esferasPuntuacionHTML}</div>
        </div>
        <div class="points-col">
          <span class="points-value">${equipo.total}</span>
          <span class="points-label">pts</span>
        </div>
        <div class="action-col">
          <button class="btn-edit-scores" data-team-id="${equipo.id}">Cargar</button>
        </div>
      </div>
    `;
  }).join("");

  // Inserción de la estructura de Dashboard Stacked
  contenedorPrincipal.innerHTML = `
    <div class="home-container">
      <!-- Sección superior con título principal y reglamento -->
      <section class="hero-section">
        <div class="hero-content">
          <h2>Olimpiadas Liceo Ibérico 2026</h2>
          <p>Plataforma de seguimiento y clasificación interactiva en tiempo real para las Olimpiadas Escolares.</p>
        </div>
        <div class="rules-card">
          <div class="rules-header">
            <h3>📋 Reglamento General</h3>
          </div>
          <div class="rules-body">
            <div class="rule-item">
              <span class="rule-icon">⏳</span>
              <p>Cada juego tendrá una duración exacta de <strong>15 minutos</strong> para asegurar el dinamismo de la jornada.</p>
            </div>
            <div class="rule-item">
              <span class="rule-icon">🛠️</span>
              <p><strong>Materiales asignados:</strong> 10 aros, pelotas de tenis, testigo de relevos, conos, 2 cubos, pelotas blandas, pañuelos, vasos, pajitas y globos de agua.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- NUEVA SECCIÓN: Distribución del Profesorado (Lunes 15 / Martes 16) -->
      <section class="staff-section">
        <div class="section-header">
          <h3>👥 Organización de Profesores</h3>
          <div class="staff-tabs">
            <button class="staff-tab-btn active" data-staff-day="day1">Lunes 15</button>
            <button class="staff-tab-btn" data-staff-day="day2">Martes 16</button>
          </div>
        </div>
        <p class="section-desc">Consulta los profesores responsables de las estaciones de juego y los guías asignados a cada equipo.</p>
        
        <div class="staff-panes">
          <!-- Distribución del Lunes 15 -->
          <div class="staff-pane active" id="staff-pane-day1">
            <div class="staff-grid">
              
              <!-- Estaciones Lunes -->
              <div class="staff-card">
                <h4>Estaciones de Juego (Lunes 15)</h4>
                <p class="staff-subtitle">Profesores a cargo de explicar el juego:</p>
                <ul class="staff-list">
                  <li>
                    <span class="badge-juego">Juego 1</span>
                    <div class="staff-details">
                      <strong>Puntería con la mano:</strong>
                      <span>Maria y Esther</span>
                    </div>
                  </li>
                  <li>
                    <span class="badge-juego">Juego 2</span>
                    <div class="staff-details">
                      <strong>Relevos:</strong>
                      <span>Gabriel y Raquel</span>
                    </div>
                  </li>
                  <li>
                    <span class="badge-juego">Juego 3</span>
                    <div class="staff-details">
                      <strong>Baloncesto con cubos:</strong>
                      <span>Teresa y Alba</span>
                    </div>
                  </li>
                  <li>
                    <span class="badge-juego">Juego 4</span>
                    <div class="staff-details">
                      <strong>Saltos con pies juntos:</strong>
                      <span>Julián y Ana</span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Acompañantes Lunes -->
              <div class="staff-card">
                <h4>Acompañantes de Grupo (Lunes 15)</h4>
                <p class="staff-subtitle">Profesores tutores que guían a cada equipo en su circuito y controlar la puntuación:</p>
                <div class="guides-grid">
                  <div class="guide-item"><strong>Equipo 1:</strong> <span>Silvia</span></div>
                  <div class="guide-item"><strong>Equipo 2:</strong> <span>Laura</span></div>
                  <div class="guide-item"><strong>Equipo 3:</strong> <span>Luis</span></div>
                  <div class="guide-item"><strong>Equipo 4:</strong> <span>Mario</span></div>
                  <div class="guide-item"><strong>Equipo 5:</strong> <span>Javier</span></div>
                  <div class="guide-item"><strong>Equipo 6:</strong> <span>Miguel Ángel</span></div>
                  <div class="guide-item"><strong>Equipo 7:</strong> <span>Gloria</span></div>
                  <div class="guide-item"><strong>Equipo 8:</strong> <span>Luis Carlos</span></div>
                </div>
              </div>

            </div>
          </div>

          <!-- Distribución del Martes 16 -->
          <div class="staff-pane" id="staff-pane-day2">
            <div class="staff-grid">
              
              <!-- Estaciones Martes -->
              <div class="staff-card">
                <h4>Estaciones de Juego (Martes 16)</h4>
                <p class="staff-subtitle">Profesores a cargo de explicar y controlar la puntuación:</p>
                <ul class="staff-list">
                  <li>
                    <span class="badge-juego">Juego 1</span>
                    <div class="staff-details">
                      <strong>Pasa aros:</strong>
                      <span>Luis y Antonio</span>
                    </div>
                  </li>
                  <li>
                    <span class="badge-juego">Juego 2</span>
                    <div class="staff-details">
                      <strong>Vaso pajita:</strong>
                      <span>Silvia y Laura</span>
                    </div>
                  </li>
                  <li>
                    <span class="badge-juego">Juego 3</span>
                    <div class="staff-details">
                      <strong>Pañuelos colas:</strong>
                      <span>Javier y Miguel Ángel</span>
                    </div>
                  </li>
                  <li>
                    <span class="badge-juego">Juego 4</span>
                    <div class="staff-details">
                      <strong>Roba balones:</strong>
                      <span>Mario y Gloria</span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Acompañantes Martes -->
              <div class="staff-card">
                <h4>Acompañantes de Grupo (Martes 16)</h4>
                <p class="staff-subtitle">Profesores tutores que guían a cada equipo en su circuito:</p>
                <div class="guides-grid">
                  <div class="guide-item"><strong>Equipo 1:</strong> <span>Gabriel</span></div>
                  <div class="guide-item"><strong>Equipo 2:</strong> <span>Raquel</span></div>
                  <div class="guide-item"><strong>Equipo 3:</strong> <span>Luis Carlos</span></div>
                  <div class="guide-item"><strong>Equipo 4:</strong> <span>Esther</span></div>
                  <div class="guide-item"><strong>Equipo 5:</strong> <span>Julián</span></div>
                  <div class="guide-item"><strong>Equipo 6:</strong> <span>Ana</span></div>
                  <div class="guide-item"><strong>Equipo 7:</strong> <span>Teresa</span></div>
                  <div class="guide-item"><strong>Equipo 8:</strong> <span>Alba</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 1: Clasificación General (Leaderboard) -->
      <section class="leaderboard-section">
        <div class="section-header">
          <h3>🏆 Tabla de Clasificación</h3>
          <span class="live-indicator"><span class="pulse-dot"></span> EN VIVO</span>
        </div>
        <p class="section-desc">Selecciona un equipo de la tabla para ver su panel de control o registrar sus puntuaciones.</p>
        <div class="leaderboard-container">
          ${tablaClasificacionHTML}
        </div>
      </section>

      <!-- SECCIÓN 2: Cronograma Detallado de Actividades -->
      <section class="schedule-section expanded-schedule">
        <div class="section-header">
          <h3>📅 Cronograma Detallado de Actividades</h3>
          <div class="schedule-tabs">
            <button class="sch-tab-btn active" data-day="day1">Día 1 - Lunes 15</button>
            <button class="sch-tab-btn" data-day="day2">Día 2 - Martes 16</button>
          </div>
        </div>
        <p class="section-desc">Instrucciones, reglas, material requerido y sistemas de puntuación oficiales para cada juego olímpico.</p>

        <div class="schedule-panes">
          <!-- Actividades del Día 1 -->
          <div class="sch-pane active" id="sch-pane-day1">
            <div class="schedule-grid">
              
              <!-- Juego 1 - Día 1 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/aros.webp" alt="Puntería con la mano" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Puntería'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 1</span>
                    <h4>Puntería con la mano</h4>
                  </div>
                  <p class="game-text">Se colocarán 8 aros sobre los conos que queden sujetados horizontalmente y en diferentes 
                  distancias de la línea de tiro. Cada participante del equipo dispondrá de lanzamientos individuales por turnos. El total 
                  de puntos acumulados por todos los alumnos se sumará al marcador final del equipo.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> La posición cercana otorga <strong>1 punto</strong>, 
                    la posición media otorga <strong>2 puntos</strong> y la posición lejana otorga <strong>3 puntos</strong>.
                  </div>
                </div>
              </div>

              <!-- Juego 2 - Día 1 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/relevos.webp" alt="Carrera de Relevos" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Relevos'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 2</span>
                    <h4>Carrera de Relevos</h4>
                  </div>
                  <p class="game-text">Cada grupo se alineará en la línea de salida (Recomendación: colocar al alumnado por niveles). 
                  Cada corredor debe sprintar hasta el cono de retorno y volver para entregar el testigo al siguiente compañero 
                  hasta completar el ciclo.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> El equipo que gane la carrera conseguirá <strong>5 puntos</strong>. 
                    La prueba completa se disputará 3 veces de forma independiente.
                  </div>
                </div>
              </div>

              <!-- Juego 3 - Día 1 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/cubo.webp" alt="Baloncesto con cubos" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Baloncesto+con+cubos'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 3</span>
                    <h4>Baloncesto con cubos</h4>
                  </div>
                  <p class="game-text">Cada grupo estará dividido en parejas. Uno de la pareja tendrá un cubo y el otro tendrá una pelota. 
                  Habrá 3 distancias, cerca(1), media(2) y lejana(3). La persona que tenga la pelota tendrá que decir a que distancia querrá 
                  tirar la pelota. Si dice distancia cerca(1), la persona del cubo tendrá que ponerse en esa distancia y esperar a que tire la pelota estando de espaldas</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Encestar de espaldas en posición cercana vale <strong>1 punto</strong>, 
                    en posición media <strong>2 puntos</strong> y en posición lejana <strong>3 puntos</strong>.
                  </div>
                </div>
              </div>

              <!-- Juego 4 - Día 1 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/piesJuntos.webp" alt="Salto de longitud" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Salto+de+longitud'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 4</span>
                    <h4>Saltos pies juntos</h4>
                  </div>
                  <p class="game-text">Una prueba de salto de longitud encadenado a pies juntos. El primer participante del equipo realiza 
                un salto desde la línea de salida y se queda inmóvil en el punto exacto de su caída. El siguiente compañero se sitúa 
                inmediatamente al lado de la marca de sus talones y salta desde allí, repitiendo el proceso sucesivamente para todo 
                  el grupo.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> El equipo que consiga una distancia acumulada más larga ganará 
                    <strong>5 puntos</strong> en la ronda. Se realizará 3 veces.
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Actividades del Día 2 (Mostrados como Juego 1, 2, 3, 4) -->
          <div class="sch-pane" id="sch-pane-day2">
            <div class="schedule-grid">
              
              <!-- Juego 1 - Día 2 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/pasaAro.webp" alt="Pasa Aros" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Pasa+Aros'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 1</span>
                    <h4>El Pasa Aros</h4>
                  </div>
                  <p class="game-text">Todos los integrantes del grupo deben situarse como los niños que aparecen en la foto.
                  El objetivo es deslizar un aro desde el primer participante hasta el último haciendo pasar todo el cuerpo por dentro del aro, sin soltarse ni romper la cadena 
                  en ningún momento.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> El equipo más rápido en completar el recorrido del aro obtiene 
                    <strong>5 puntos</strong>. Se realizarán 3 carreras completas.
                  </div>
                </div>
              </div>

              <!-- Juego 2 - Día 2 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/pajita.webp" alt="Vaso pajita" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Vaso+pajita'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 2</span>
                    <h4>El vaso y la pajita</h4>
                  </div>
                  <p class="game-text"> Cada participante del equipo se coloca 
                  una pajita en la boca. Se inicia el recorrido con un vaso de plástico boca abajo insertado en la pajita del primer 
                  compañero. Deben pasarse el vaso uno a uno usando únicamente las pajitas, quedando prohibido tocar el vaso con las 
                  manos.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Se otorgarán <strong>10 puntos</strong> si el vaso recorre el grupo completo 
                    sin caer, y <strong>5 puntos</strong> si llega al menos a la mitad del trayecto.
                  </div>
                </div>
              </div>

              <!-- Juego 3 - Día 2 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/pañuelos.webp" alt="Roba pañuelos" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Roba+pañuelos'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 3</span>
                    <h4>Roba pañuelos</h4>
                  </div>
                  <p class="game-text">Un emocionante juego táctico de agilidad y evasión en zona delimitada. Cada participante se 
                  cuelga un pañuelo por detrás del pantalón (debe estar visible y bastante sacado). El objetivo es quitar los pañuelos 
                  del equipo rival mientras evitas que te quiten el tuyo. Si te quitan el pañuelo estás eliminado</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Gana <strong>5 puntos</strong> el equipo que logre capturar todos los 
                    pañuelos del equipo rival. Se jugarán 3 partidas completas.
                  </div>
                </div>
              </div>

              <!-- Juego 4 - Día 2 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/robaBalones.webp" alt="Roba Pelotas" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Roba+Pelotas'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 4</span>
                    <h4>Roba Pelotas</h4>
                  </div>
                  <p class="game-text">Duelo rápido de estrategia. Cada equipo cuenta con un aro que contiene pelotas de tenis en 
                  su interior. El juego consiste en correr y llevar las pelotas dentro del aro del equipo contrario sin que se salgan. 
                  Reglas estrictas: solo se permite transportar una sola pelota a la vez y no se permite empujar a los rivales.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Se disputarán 3 partidas rápidas y por cada 
                    victoria el equipo conseguirá <strong>5 puntos</strong>.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Controladores de eventos para cambiar entre las pestañas del cronograma
  const botonesPestañasCronograma = contenedorPrincipal.querySelectorAll(".sch-tab-btn");
  const panelesCronograma = contenedorPrincipal.querySelectorAll(".sch-pane");

  botonesPestañasCronograma.forEach(pestaña => {
    pestaña.addEventListener("click", () => {
      botonesPestañasCronograma.forEach(t => t.classList.remove("active"));
      panelesCronograma.forEach(p => p.classList.remove("active"));

      pestaña.classList.add("active");
      const panelActivo = contenedorPrincipal.querySelector(`#sch-pane-${pestaña.dataset.day}`);
      if (panelActivo) panelActivo.classList.add("active");
    });
  });

  // Controladores de eventos para cambiar entre las pestañas de profesores (Staff)
  const botonesPestañasStaff = contenedorPrincipal.querySelectorAll(".staff-tab-btn");
  const panelesStaff = contenedorPrincipal.querySelectorAll(".staff-pane");

  botonesPestañasStaff.forEach(pestaña => {
    pestaña.addEventListener("click", () => {
      botonesPestañasStaff.forEach(t => t.classList.remove("active"));
      panelesStaff.forEach(p => p.classList.remove("active"));

      pestaña.classList.add("active");
      const panelActivo = contenedorPrincipal.querySelector(`#staff-pane-${pestaña.dataset.staffDay}`);
      if (panelActivo) panelActivo.classList.add("active");
    });
  });

  // Vincular eventos de clics a las filas del Leaderboard y botones de carga
  const filasLeaderboard = contenedorPrincipal.querySelectorAll(".leaderboard-row");
  filasLeaderboard.forEach(fila => {
    const idEquipo = fila.dataset.teamId;
    fila.addEventListener("click", (evento) => {
      if (evento.target.tagName !== "BUTTON") {
        Team(idEquipo);
      }
    });
  });

  const botonesCarga = contenedorPrincipal.querySelectorAll(".btn-edit-scores");
  botonesCarga.forEach(boton => {
    boton.addEventListener("click", (evento) => {
      evento.stopPropagation();
      const idEquipo = boton.dataset.teamId;
      Team(idEquipo);
    });
  });
};
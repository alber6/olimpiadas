import "./Home.css";
import { cleanPage } from "../../utils/cleanPage";
import { db } from "../../firebase-config.js";
import { collection, query, where, getDocs } from "../../firebase-config.js";
import { Team } from "../Team/Team";

/**
 * Consulta y devuelve las puntuaciones de un equipo en Firestore
 * @param {string} teamName - Nombre del equipo (ej: "Team 1")
 * @returns {Array<number>} Array con 10 posiciones correspondientes a los juegos
 */
export async function getGameScores(teamName) {
  const scores = Array(10).fill(0); 
  const colRef = collection(db, "resultados");
  const q = query(colRef, where("equipo", "==", teamName));
  
  try {
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      const data = doc.data();
      const index = data.juegoNumero;
      if (typeof index === "number" && index >= 1 && index <= 10) {
        scores[index - 1] = data.puntos || 0;
      }
    });
  } catch (error) {
    console.error(`Error al obtener puntuación para ${teamName}:`, error);
  }
  return scores;
}

/**
 * Componente de la Página de Inicio (Dashboard Principal)
 */
export const HomeGames = async () => {
  const main = document.querySelector("main");
  cleanPage(main);

  // Estado de carga inicial de la página
  main.innerHTML = `
    <div class="home-loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando Clasificación en Tiempo Real...</p>
    </div>
  `;

  // Cargar puntuaciones de los 8 equipos en paralelo
  const teams = [];
  try {
    const fetchPromises = Array.from({ length: 8 }, (_, i) => {
      const teamId = i + 1;
      return getGameScores(`Team ${teamId}`).then(scores => {
        const total = scores.reduce((acc, val) => acc + val, 0);
        const completed = scores.filter(s => s > 0).length;
        teams.push({ id: teamId, scores, total, completed });
      });
    });
    
    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Error al cargar la información de los equipos:", error);
  }

  // Ordenar equipos de mayor a menor puntuación total
  teams.sort((a, b) => b.total - a.total);

  // Renderizar filas de la tabla de clasificación (Leaderboard)
  const leaderboardHTML = teams.map((team, index) => {
    let medal = "";
    let rankClass = "";
    if (index === 0) {
      medal = "🥇";
      rankClass = "rank-1";
    } else if (index === 1) {
      medal = "🥈";
      rankClass = "rank-2";
    } else if (index === 2) {
      medal = "🥉";
      rankClass = "rank-3";
    } else {
      medal = `<span class="rank-number">${index + 1}</span>`;
    }

    // Calcular porcentaje relativo al líder para la barra de progreso visual
    const maxScore = Math.max(...teams.map(t => t.total), 1);
    const progressPercent = Math.min(100, Math.round((team.total / maxScore) * 100));

    // Generar pequeños badges para cada uno de los 10 juegos
    const scoreBadges = team.scores.map((score, sIndex) => `
      <span class="score-badge-mini ${score > 0 ? 'active' : ''}" title="Juego ${sIndex + 1}: ${score} pts">
        ${score}
      </span>
    `).join("");

    return `
      <div class="leaderboard-row ${rankClass}" data-team-id="${team.id}">
        <div class="rank-col">${medal}</div>
        <div class="team-col">
          <span class="team-name">Equipo ${team.id}</span>
          <span class="team-details">Juegos registrados: ${team.completed}/10</span>
        </div>
        <div class="progress-col">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
          </div>
          <div class="mini-scores-container">${scoreBadges}</div>
        </div>
        <div class="points-col">
          <span class="points-value">${team.total}</span>
          <span class="points-label">pts</span>
        </div>
        <div class="action-col">
          <button class="btn-edit-scores" data-team-id="${team.id}">Cargar</button>
        </div>
      </div>
    `;
  }).join("");

  // Inserción de la estructura de Dashboard Stacked (Podio + Actividades detalladas abajo)
  main.innerHTML = `
    <div class="home-container">
      <!-- Sección Hero con el Reglamento del Evento -->
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
              <p><strong>Materiales asignados:</strong> 8 aros, pelotas de tenis, testigo de relevos, conos, 2 cubos, pelotas blandas, pañuelos, vasos, pajitas y globos de agua.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 1: Clasificación General (Ancho completo) -->
      <section class="leaderboard-section">
        <div class="section-header">
          <h3>🏆 Tabla de Clasificación</h3>
          <span class="live-indicator"><span class="pulse-dot"></span> EN VIVO</span>
        </div>
        <p class="section-desc">Selecciona un equipo de la tabla para ver su panel de control o registrar sus puntuaciones.</p>
        <div class="leaderboard-container">
          ${leaderboardHTML}
        </div>
      </section>

      <!-- SECCIÓN 2: Cronograma de Actividades Ampliado (Ancho completo) -->
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
              
              <!-- Juego 1 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/aros.webp" alt="Puntería con la mano" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Puntería'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 1</span>
                    <h4>Puntería con la mano</h4>
                  </div>
                  <p class="game-text">Consiste en poner a prueba la destreza y precisión del alumnado. Se colocarán 8 aros en el suelo a diferentes distancias de la línea de tiro. Cada participante del equipo dispondrá de lanzamientos individuales por turnos. El total de puntos acumulados por todos los alumnos se sumará al marcador final del equipo.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> La posición cercana otorga <strong>1 punto</strong>, la posición media otorga <strong>2 puntos</strong> y la posición lejana otorga <strong>3 puntos</strong>.
                  </div>
                </div>
              </div>

              <!-- Juego 2 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/relevos.webp" alt="Carrera de Relevos" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Relevos'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 2</span>
                    <h4>Carrera de Relevos</h4>
                  </div>
                  <p class="game-text">Una prueba de velocidad y coordinación en equipo. Cada grupo se alineará en la línea de salida (se recomienda ordenar a los participantes por niveles académicos similares para equilibrar la competencia). Cada corredor debe sprintar hasta el cono de retorno y volver para entregar el testigo al siguiente compañero hasta completar el ciclo.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> El equipo que gane la carrera conseguirá <strong>5 puntos</strong>. La prueba completa se disputará 3 veces de forma independiente.
                  </div>
                </div>
              </div>

              <!-- Juego 3 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/cubo.webp" alt="Baloncesto con cubos" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Baloncesto+con+cubos'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 3</span>
                    <h4>Baloncesto con cubos</h4>
                  </div>
                  <p class="game-text">Un reto divertido de complicidad y puntería por parejas. Un miembro de la pareja sostiene un cubo sobre su cabeza estando de espaldas al lanzador, mientras el otro sostiene la pelota. Antes del lanzamiento, el lanzador debe anunciar la distancia elegida. El receptor del cubo debe posicionarse rápidamente en esa marca e intentar atrapar la pelota sin mirar.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Encestar de espaldas en posición cercana vale <strong>1 punto</strong>, en posición media <strong>2 puntos</strong> y en posición lejana <strong>3 puntos</strong>.
                  </div>
                </div>
              </div>

              <!-- Juego 4 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/piesJuntos.webp" alt="Salto de longitud" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Salto+de+longitud'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 4</span>
                    <h4>Salto de longitud</h4>
                  </div>
                  <p class="game-text">Una prueba de salto de longitud encadenado a pies juntos. El primer participante del equipo realiza un salto desde la línea de salida y se queda inmóvil en el punto exacto de su caída. El siguiente compañero se sitúa inmediatamente al lado de la marca de sus talones y salta desde allí, repitiendo el proceso sucesivamente para todo el grupo.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> El equipo que consiga una distancia acumulada más larga ganará <strong>5 puntos</strong> en la ronda. Se realizará 3 veces.
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Actividades del Día 2 -->
          <div class="sch-pane" id="sch-pane-day2">
            <div class="schedule-grid">
              
              <!-- Juego 5 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/pasaAro.webp" alt="Pasa Aros" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Pasa+Aros'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 5</span>
                    <h4>El Pasa Aros</h4>
                  </div>
                  <p class="game-text">Prueba de flexibilidad, velocidad y trabajo en equipo. Todos los integrantes del grupo deben tomarse de las manos formando una cadena humana ininterrumpida. El objetivo es deslizar un aro desde el primer participante hasta el último haciendo pasar todo el cuerpo por dentro del aro, sin soltarse ni romper la cadena en ningún momento.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> El equipo más rápido en completar el recorrido del aro obtiene <strong>5 puntos</strong>. Se realizarán 3 carreras completas.
                  </div>
                </div>
              </div>

              <!-- Juego 6 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/pajita.webp" alt="Vaso pajita" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Vaso+pajita'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 6</span>
                    <h4>El vaso y la pajita</h4>
                  </div>
                  <p class="game-text">Una prueba de precisión y soplido/equilibrio por relevos. Cada participante del equipo se coloca una pajita en la boca. Se inicia el recorrido con un vaso de plástico boca abajo insertado en la pajita del primer compañero. Deben pasarse el vaso uno a uno usando únicamente las pajitas, quedando prohibido tocar el vaso con las manos.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Se otorgarán <strong>10 puntos</strong> si el vaso recorre el grupo completo sin caer, y <strong>5 puntos</strong> si llega al menos a la mitad del trayecto.
                  </div>
                </div>
              </div>

              <!-- Juego 7 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/pañuelos.webp" alt="Roba pañuelos" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Roba+pañuelos'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 7</span>
                    <h4>Roba pañuelos</h4>
                  </div>
                  <p class="game-text">Un emocionante juego táctico de agilidad y evasión en zona delimitada. Cada participante se cuelga un pañuelo por detrás del pantalón (debe estar visible y bastante sacado). El objetivo es quitar los pañuelos del equipo rival mientras evitas que te quiten el tuyo. Si te quitan el pañuelo pero tienes otro capturado, puedes colocártelo para seguir jugando.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Gana <strong>5 puntos</strong> el equipo que logre capturar todos los pañuelos del equipo rival. Se jugarán 3 partidas completas.
                  </div>
                </div>
              </div>

              <!-- Juego 8 -->
              <div class="game-item-card">
                <div class="game-img-wrapper">
                  <img src="/images/robaBalones.webp" alt="Roba Pelotas" onerror="this.src='https://placehold.co/400x250/111827/FFFFFF?text=Roba+Pelotas'">
                </div>
                <div class="game-info">
                  <div class="game-header-row">
                    <span class="game-number-badge">Juego 8</span>
                    <h4>Roba Pelotas</h4>
                  </div>
                  <p class="game-text">Duelo rápido de estrategia. Cada equipo cuenta con un aro que contiene pelotas de tenis en su interior. El juego consiste en correr y llevar las pelotas dentro del aro del equipo contrario sin que se salgan. Reglas estrictas: solo se permite transportar una sola pelota a la vez y no se permite empujar a los rivales.</p>
                  <div class="game-scoring-rule">
                    <strong>Sistema de Puntos:</strong> Se disputarán 3 partidas rápidas y por cada victoria el equipo conseguirá <strong>5 puntos</strong>.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Controladores de pestañas en la sección del Cronograma
  const schTabs = main.querySelectorAll(".sch-tab-btn");
  const schPanes = main.querySelectorAll(".sch-pane");
  
  schTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      schTabs.forEach(t => t.classList.remove("active"));
      schPanes.forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      const activePane = main.querySelector(`#sch-pane-${tab.dataset.day}`);
      if (activePane) activePane.classList.add("active");
    });
  });

  // Enlazar clics en las filas de la clasificación y botones de edición
  const leaderboardRows = main.querySelectorAll(".leaderboard-row");
  leaderboardRows.forEach(row => {
    const teamId = row.dataset.teamId;
    row.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        Team(teamId);
      }
    });
  });

  const editBtns = main.querySelectorAll(".btn-edit-scores");
  editBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const teamId = btn.dataset.teamId;
      Team(teamId);
    });
  });
};
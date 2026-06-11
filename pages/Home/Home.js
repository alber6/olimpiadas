import "./Home.css";
import { cleanPage } from "../../utils/cleanPage";
import { db } from "../../firebase-config.js";
import { collection, query, where, getDocs } from "../../firebase-config.js";
import { Team } from "../Team/Team";

// Fetch scores for a specific team from Firestore
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

export const HomeGames = async () => {
  const main = document.querySelector("main");
  cleanPage(main);

  // Loading state
  main.innerHTML = `
    <div class="home-loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando Clasificación en Tiempo Real...</p>
    </div>
  `;

  // Fetch all team scores in parallel
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

  // Sort teams by total points descending
  teams.sort((a, b) => b.total - a.total);

  // Render leaderboard rows
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

    // Calculate progress percentage based on highest score or max theoretical score
    const maxScore = Math.max(...teams.map(t => t.total), 1);
    const progressPercent = Math.min(100, Math.round((team.total / maxScore) * 100));

    // Compile compact score badges
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
          <span class="team-details">Juegos con puntos: ${team.completed}/10</span>
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

  main.innerHTML = `
    <div class="home-container">
      <!-- Welcome Hero -->
      <section class="hero-section">
        <div class="hero-content">
          <h2>Olimpiadas Liceo Ibérico 2026</h2>
          <p>Plataforma oficial de seguimiento y clasificación en tiempo real.</p>
        </div>
        <div class="rules-card">
          <div class="rules-header">
            <h3>📋 Reglamento General</h3>
          </div>
          <div class="rules-body">
            <div class="rule-item">
              <span class="rule-icon">⏳</span>
              <p>Cada juego durará aproximadamente <strong>15 minutos</strong>.</p>
            </div>
            <div class="rule-item">
              <span class="rule-icon">🛠️</span>
              <p><strong>Materiales:</strong> 8 aros, pelotas de tenis, testigo para relevos, conos, 2 cubos, pelotas blandas, pañuelos, vasos, pajitas y globos de agua.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Dashboard Layout -->
      <div class="dashboard-grid">
        <!-- Left Column: Leaderboard -->
        <section class="leaderboard-section">
          <div class="section-header">
            <h3>🏆 Tabla de Clasificación</h3>
            <span class="live-indicator"><span class="pulse-dot"></span> EN VIVO</span>
          </div>
          <div class="leaderboard-container">
            ${leaderboardHTML}
          </div>
        </section>

        <!-- Right Column: Games Schedule -->
        <section class="schedule-section">
          <div class="section-header">
            <h3>📅 Cronograma de Actividades</h3>
            <div class="schedule-tabs">
              <button class="sch-tab-btn active" data-day="day1">Día 1 - Lunes 15</button>
              <button class="sch-tab-btn" data-day="day2">Día 2 - Martes 16</button>
            </div>
          </div>

          <div class="schedule-panes">
            <!-- Day 1 Schedule -->
            <div class="sch-pane active" id="sch-pane-day1">
              <div class="schedule-grid">
                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/aros.webp" alt="Puntería" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Puntería'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 1</span>
                    <h4>Puntería con la mano</h4>
                    <p>Lanzamientos con pelotas hacia aros colocados a diferentes distancias. Cada alumno lanza por turnos.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> Cerca (1 pto), Media (2 ptos), Lejos (3 ptos).
                    </div>
                  </div>
                </div>

                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/relevos.webp" alt="Relevos" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Relevos'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 2</span>
                    <h4>Carrera de Relevos</h4>
                    <p>Carrera de velocidad hasta un punto y vuelta pasando el testigo. Ordenados por niveles académicos.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> 5 ptos para el ganador. Se realiza 3 veces.
                    </div>
                  </div>
                </div>

                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/cubo.webp" alt="Baloncesto cubos" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Cubos'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 3</span>
                    <h4>Baloncesto con cubos</h4>
                    <p>Por parejas: uno con cubo en la cabeza y espaldas, otro lanza pelotas indicando distancia antes de tirar.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> Cerca (1 pto), Media (2 ptos), Lejos (3 ptos).
                    </div>
                  </div>
                </div>

                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/piesJuntos.webp" alt="Saltos" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Saltos'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 4</span>
                    <h4>Salto de longitud</h4>
                    <p>Salto a pies juntos sucesivo. Cada uno salta desde la posición de caída del compañero.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> Mayor distancia total gana 5 ptos. 3 rondas.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Day 2 Schedule -->
            <div class="sch-pane" id="sch-pane-day2">
              <div class="schedule-grid">
                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/pasaAro.webp" alt="Pasa Aros" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Aros'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 5</span>
                    <h4>El Pasa Aros</h4>
                    <p>Pasar un aro por todo el grupo sin romper la cadena de manos dadas. Trabajo en equipo coordinado.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> 5 ptos para el ganador. Se realiza 3 veces.
                    </div>
                  </div>
                </div>

                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/pajita.webp" alt="Vaso pajita" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Pajita'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 6</span>
                    <h4>El vaso y la pajita</h4>
                    <p>Pasar un vaso de plástico boca abajo usando solo pajitas en la boca. Queda prohibido el uso de manos.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> 10 ptos si recorre el grupo completo, 5 ptos si llega a la mitad.
                    </div>
                  </div>
                </div>

                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/pañuelos.webp" alt="Pañuelos" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Pañuelos'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 7</span>
                    <h4>Roba pañuelos</h4>
                    <p>Evitar que te arrebaten el pañuelo colgado atrás e intentar coger el de tus rivales del otro equipo.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> Gana 5 ptos el equipo que capture todos. 3 rondas.
                    </div>
                  </div>
                </div>

                <div class="game-item-card">
                  <div class="game-img-wrapper">
                    <img src="/images/robaBalones.webp" alt="Roba Pelotas" onerror="this.src='https://placehold.co/300x150/111827/FFFFFF?text=Pelotas'">
                  </div>
                  <div class="game-info">
                    <span class="game-number-badge">Juego 8</span>
                    <h4>Roba Pelotas</h4>
                    <p>Llevar pelotas de tenis una a una desde el aro inicial hasta el aro del equipo contrario sin que se salgan.</p>
                    <div class="game-scoring-rule">
                      <strong>Puntos:</strong> 3 rondas. Cada victoria otorga 5 puntos.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  // Wire up schedule tabs
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

  // Wire up click handlers on Leaderboard rows & edit buttons to open Team page
  const leaderboardRows = main.querySelectorAll(".leaderboard-row");
  leaderboardRows.forEach(row => {
    const teamId = row.dataset.teamId;
    
    // Clicking anywhere on the row (except buttons that have their own listeners, though we handle both)
    row.addEventListener("click", (e) => {
      // Don't double trigger if clicking button
      if (e.target.tagName !== "BUTTON") {
        Team(teamId);
      }
    });
  });

  const editBtns = main.querySelectorAll(".btn-edit-scores");
  editBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop row click propagation
      const teamId = btn.dataset.teamId;
      Team(teamId);
    });
  });
};
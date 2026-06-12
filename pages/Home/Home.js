import "./Home.css";
import { cleanPage } from "../../utils/cleanPage";
import { db } from "../../firebase-config.js";
import { collection, query, where, getDocs } from "../../firebase-config.js";

export async function getGameScores(teamName) {
    // crea un array con 10 ceros para almacenar puntos que se inicializan en 0
  const scores = Array(10).fill(0); 
  //Referencia a la colección "resultados" en Firestore
  const colRef = collection(db, "resultados");
  // Consulta para filtrar solo documentos donde el campo 'equipo' es igual a teamName
  const q = query(colRef, where("equipo", "==", teamName));
  // Ejecuta la consulta y obtiene los documentos que coinciden
  const snapshot = await getDocs(q);

    // Recorre cada documento de la consulta
  snapshot.forEach(doc => {
    const data = doc.data();
    // Usa juegoNumero directamente para evitar parsing
    const index = data.juegoNumero;
    if (typeof index === "number" && index >= 1 && index <= 10) {
      scores[index - 1] = data.puntos || 0;
    }

  });

  return scores;
}

export const HomeGames = async () => {
    const main = document.querySelector("main");
    cleanPage(main);

    const teams = [];
    for (let i = 1; i <= 8; i++) {
        const teamId = `Team ${i}`;
        const scores = await getGameScores(teamId);
        const total = scores.reduce((acc, val) => acc + val, 0);
        teams.push({ id: i, scores, total });
            console.log(teams)
    }

    let teamHTML = teams.map(team => `
        <section>
            <h1>Equipo ${team.id}</h1>
            <p>Juegos: ${team.scores.join(" - ")}</p>
            <p>TOTAL: ${team.total} puntos</p>
        </section>
    `).join("");

    main.innerHTML = `
    <div class= gamedays>
        <article>
            <section>
                <p>REGLAS: ---> Cada juego durará apróximadamente 15 minutos. </p>
                <p>MATERIAL ---> 8 aros, pelotas de tenis, un testigo para los relevos, conos, dos cubos, pelotas blandas, pañuelos, vasos y pajitas. (globos de agua)</p>
            </section>
        <h2>Dia 1 -Lunes 15</h2>
            <section>
                <h1>Juego 1</h1>
                <p>PUNTERÍA CON LA MANO -- Lanzamientos con pelotas o pesos sobre aros o aros sobre conos. Se colocará a varias distancias, dependiendo de los cursos. Alumno por alumno (suma de puntos, cada posición puede valer 1, 2 o 3 puntos). <span>Material: 6 aros, 6 conos, 2 pelotas de gomaespuma o 2 pelotas de tenis.</span> </p>
            </section>
            <section>
                <h1>Juego 2</h1>
                <p>RELEVOS -- carrera clásica llegando hasta un punto determinado y volver pasando el testigo hasta que lo realice todo el grupo. (Recomendación: colocar al alumnado por niveles). Pueden puntuar por equipo ganador (10 puntos) o 1 cada vez que lleguen primero.<span>Material: Un testigo que puede ser una base de color.</span></p>
            </section>
            <section>
                <h1>Juego 3</h1>
                <p>PARACAÍDAS -- Todos los participantes se agarran alrededor del paracaídas y moviéndolo arriba y abajo intentan meter dentro del agujero del paracaídas la pelota. Pueden jugar 2 o 3 rondas cada equipo y el equipo que haya tardado menos conseguirá los 10 puntos. <span>Material: Paracaídas y 2 pelotas de gomaespuma.</span></p>
            </section>
            <section>
                <h1>Juego 4</h1>
                <p>SALTOS -- Salto de longitud a pies juntos. Gana el equipo que más distancia sume o se suma la distancia total de cada equipo y por cada 1 o 2 metros obtenidos se da un punto. <span>Material: Bases para marcar.</span></p>
            </section>
        </article>
        <article>
        <h2>Dia 2 - Martes 16</h2>
            <section>
                <h1>Juego 1</h1>
                <p>PUNTERÍA CON EL PIE -- Tiros sobre una portería hecha con bases y picas desde diferentes distancias. Alumno por alumno. (Suma de puntos, cada posición puede valer 1, 2 o 3 puntos) <span>Material: 2 pelotas de gomaespuma, 6 conos y 6 picas.</span></p>
            </section>
            <section>
                <h1>Juego 2</h1>
                <p>TRASLADOS -- Llevar de un punto a otro, una pelota de tenis con la cabeza entre 2 participantes. REGLAS: Si se les cae la pelota o la tocan con las manos vuelven a empezar desde los puntos de partida (podemos poner 3 bases, la primera es donde deberán llegar los de
                1º y 2º ciclo de Primaria, la segunda base para 3º, 4º, 5º y 6º y la última para Secundaria). Cada “ronda” ganada por la pareja, el equipo obtendrá 1 punto. <span>Material: Pelotas de tenis.</span></p>
            </section>
            <section>
                <h1>Juego 3</h1>
                <p>PAÑUELOS -- Los alumnos se cuelgan un pañuelo por detrás y deben evitar que se los quiten e intentar coger los pañuelos de los demás del equipo contrario. Cuando te han quitado el pañuelo que llevas colgado, puedes ponerte otro de los que hayas obtenido y que lleves en la mano. Si no tienes pañuelo quedas eliminado. REGLAS: Debe estar visible, bastante sacado y no pueden impedir que se los quiten con las manos o tapándose o sentándose. OPCIONES: Gana 10 puntos el equipo que coja todos los del equipo rival. Comienza un equipo y se cronometra, después el otro y el equipo que tarde menos gana los 10 puntos. <span>Material: Pañuelos.</span></p>
            </section>
            <section id= dia2juego4>
                <h1>Juego 4</h1>
                <p>CARRERA DE SACOS -- Carrera de sacos por relevos gana el grupo más rápido o se da un punto por cada pareja ganadora. <span>Material: Sacos.</span></p>
            </section>
        </article>
       <article id="teamsPuntos">
        <h2>PUNTUACIÓN FINAL</h2>
            ${teamHTML}
    </article>
    </div>
    `
}
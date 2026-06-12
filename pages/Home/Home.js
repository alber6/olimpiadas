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
                <img src="public/images/aros.webp"/>
                <p>PUNTERÍA CON LA MANO -- Lanzamientos con pelotas hacia aros que se encuentran en diferentes distancias. Cada alumno irá lanzando por turnos. <span>Suma de puntos; posición cercana vale 1 punto, posición media vale 2 puntos y posición lejana vale 3 puntos).</span></p>
            </section>
            <section>
                <h1>Juego 2</h1>
                <img src="public/images/relevos.webp" />
                <p>RELEVOS -- Carrera clásica llegando hasta un punto determinado y volver pasando el testigo hasta que lo realice todo el grupo. (Recomendación: colocar al alumnado por niveles). <span>El grupo que gane conseguirá 5 puntos. Se realizará 3 veces. </span></p>
            </section>
            <section>
                <h1>Juego 3</h1>
                <img src="public/images/cubo.webp" />
                <p>BALONCESTO CON CUBOS -- Cada grupo estará dividido en parejas. Uno de la pareja tendrá un cubo y el otro tendrá una pelota. Habrá 3 distancias, cerca(1), media(2) y lejana(3). La persona que tenga la pelota tendrá que decir a que distancia querrá tirar la pelota. Si dice distancia cerca(1), la persona del cubo tendrá que ponerse en esa distancia y esperar a que tire la pelota estando de espaldas<span>Suma de puntos; posición cercana vale 1 punto, posición media vale 2 puntos y posición lejana vale 3 puntos).</span></p>
            </section>
            <section>
                <h1>Juego 4</h1>
                <img src="public/images/piesJuntos.webp" />
                <p>SALTOS -- Salto de longitud a pies juntos. El primero del grupo salta con los pies juntos, salta y se queda parado para que el siguiente se ponga a su lado y salte con los pies juntos, y así sucesivamente hasta que lo haga todo el grupo. <span>El equipo que consiga una distancia más larga, gana 5 puntos. Se realizará 3 veces. </span></p>
            </section>
        </article>
        <article>
        <h2>Dia 2 - Martes 16</h2>
            <section>
                <h1>Juego 1</h1>
                <img src="public/images/pasaAro.webp" />
                <p>PASA AROS -- El grupo tiene que estar unido sin romperse, es decir, todos tienen que estar dándose la mano con el objetivo que el aro pase por todas las personas del grupo sin romper la cadena y sin soltarse las manos.<span> 5 puntos para el ganador y se realiza 3 veces.</span></p>
            </section>
            <section>
                <h1>Juego 2</h1>
                <img src="public/images/pajita.webp" />
                <p>VASO PAJITA --  Todo el grupo tendrá una pajita en la boca y tendrán que pasarse un vaso que se encuentra boca abajo. El objetivo es pasar el vaso con la pajita sin tocarlo con las manos y que pase por todo el grupo.<span>10 puntos si el vaso pasa por todo el grupo, si llega por la mitad 5 puntos.</span></p>
            </section>
            <section>
                <h1>Juego 3</h1>
                <img src="public/images/pañuelos.webp" />
                <p>PAÑUELOS -- Los alumnos se cuelgan un pañuelo por detrás y deben evitar que se los quiten e intentar coger los pañuelos de los demás del equipo contrario. Cuando te han quitado el pañuelo que llevas colgado, puedes ponerte otro de los que hayas obtenido y que lleves en la mano. Si no tienes pañuelo quedas eliminado. REGLAS: Debe estar visible, bastante sacado y no pueden impedir que se los quiten con las manos o tapándose o sentándose. OPCIONES: <span>Gana 5 puntos el equipo que coja todos los del equipo rival. 3 partidas</span></p>
            </section>
            <section id= dia2juego4>
                <h1>Juego 4</h1>
                <img src="public/images/robaBalones.webp" />
                <p>ROBA PELOTAS --  Un grupo contra otro. Cada grupo tendrá un aro y dentro habrá varias pelotas de tenis. El juego consiste en llevar las pelotas dentro del aro del otro equipo sin que se salga del aro. No se puede llevar varias pelotas a la vez, solo una. <span>Se realizará 3 partidas y cada victoria ganarán 5 puntos.</span></p>
            </section>
        </article>
       <article id="teamsPuntos">
        <h2>PUNTUACIÓN FINAL</h2>
            ${teamHTML}
    </article>
    </div>
    `
}
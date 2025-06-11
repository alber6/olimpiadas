import "./Home.css";
import { cleanPage } from "../../utils/cleanPage";

////se hace una funcion para acceder a las puntuaciones de cada juego que se encuentran guardadado en TEAM.JS
function getGameScores(prefix, count) {
    const scores = [];
    for (let i = 1; i <= count; i++) {
        //
        const score = parseFloat(localStorage.getItem(`${prefix}${i}`)) || 0;
        scores.push(score);
    }
    return scores;
}

export const HomeGames = () => {
    const main = document.querySelector("main");
    cleanPage(main);
    // se añade la variable scores con la funcion con un array del 1 al 4
    const team1scores = getGameScores("Team1Game", 8);
    const team2scores = getGameScores("Team2Game", 8);
    const team3scores = getGameScores("Team3Game", 8);
    const team4scores = getGameScores("Team4Game", 8);
    const team5scores = getGameScores("Team5Game", 8);
    const team6scores = getGameScores("Team6Game", 8);
    const team7scores = getGameScores("Team7Game", 8);
    const team8scores = getGameScores("Team8Game", 8);
    // uso del .reduce para sumar todos los valores del array scores. sum = 0, val= 1 y se suman, luego sum pasa a valer 1 y val es el siguiente numero del array, y se suma 1 con ese siguiente numero
    const team1Total = team1scores.reduce((acc, val) => acc + val, 0);
    const team2Total = team2scores.reduce((acc, val) => acc + val, 0);
    const team3Total = team3scores.reduce((acc, val) => acc + val, 0);
    const team4Total = team4scores.reduce((acc, val) => acc + val, 0);
    const team5Total = team5scores.reduce((acc, val) => acc + val, 0);
    const team6Total = team6scores.reduce((acc, val) => acc + val, 0);
    const team7Total = team7scores.reduce((acc, val) => acc + val, 0);
    const team8Total = team8scores.reduce((acc, val) => acc + val, 0);
    main.innerHTML = `
    <div class= gamedays>
        <article>
        <h2>Dia 1 - Jueves 12</h2>
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
                <p>PARACAÍDAS -- Todos los participantes se agarran alrededor del paracaídas y moviéndolo arriba y abajo intentan meter dentro del agujero del paracaídas la pelota. Pueden jugar 2 o 3 rondas cada equipo y el equipo que haya tardado menos conseguirá los 10 puntos. <span></span>Material: Paracaídas y 2 pelotas de gomaespuma.</p>
            </section>
            <section>
                <h1>Juego 4</h1>
                <p>SALTOS -- Salto de longitud a pies juntos. Gana el equipo que más distancia sume o se suma la distancia total de cada equipo y por cada 1 o 2 metros obtenidos se da un punto. <span>Material: Bases para marcar.</span></p>
            </section>
        </article>
        <article>
        <h2>Dia 2 - Viernes 13</h2>
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
            <section>
                <h1>Juego 4</h1>
                <p>CARRERA DE SACOS -- Carrera de sacos por relevos gana el grupo más rápido o se da un punto por cada pareja ganadora. <span>Material: Sacos.</span></p>
            </section>
        </article>
         <article id = teamsPuntos>
         <h2>PUNTUACIÓN FINAL</H2>
            <section>
                <h1>Equipo 1</h1>
                <p>Juegos: ${team1scores.join(" - ")}</p>
                <p>TOTAL: ${team1Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 2</h1>
                <p>Juegos: ${team2scores.join(" - ")}</p>
                <p>TOTAL: ${team2Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 3</h1>
                <p>Juegos: ${team3scores.join(" - ")}</p>
                <p>TOTAL: ${team3Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 4</h1>
                 <p>Juegos: ${team4scores.join(" - ")}</p>
                <p>TOTAL: ${team4Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 5</h1>
                 <p>Juegos: ${team5scores.join(" - ")}</p>
                <p>TOTAL: ${team5Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 6</h1>
                 <p>Juegos: ${team6scores.join(" - ")}</p>
                <p>TOTAL: ${team6Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 7</h1>
                 <p>Juegos: ${team7scores.join(" - ")}</p>
                <p>TOTAL: ${team7Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 8</h1>
                 <p>Juegos: ${team8scores.join(" - ")}</p>
                <p>TOTAL: ${team8Total} puntos</p>
            </section>
        </article>
    </div>
    `
    
}
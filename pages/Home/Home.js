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
                <p>-La puntación irá desde el 1 hasta el 5. Se comparará los puntos obtenidos de una prueba que ha realizado todos los grupos y el que menor puntuación haya obtenido, conseguirá 1 punto y el que más haya conseguido, 5.</p>
            </section>
            <section>
                <h1>Juego 2</h1>
                <p>La puntación irá desde el 1 hasta el 5. Se comparará los puntos obtenidos de una prueba que ha realizado todos los grupos y el que menor puntuación haya obtenido, conseguirá 1 punto y el que más haya conseguido, 5.La puntación irá desde el 1 hasta el 5. Se comparará los puntos obtenidos de una prueba que ha realizado todos los grupos y el que menor puntuación haya obtenido, conseguirá 1 punto y el que más haya conseguido, 5.</p>
            </section>
            <section>
                <h1>Juego 3</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Juego 4</h1>
                <p>Explicasao</p>
            </section>
        </article>
        <article>
        <h2>Dia 2 - Viernes 13</h2>
            <section>
                <h1>Juego 1</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Juego 2</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Juego 3</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Juego 4</h1>
                <p>Explicasao</p>
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
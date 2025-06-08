import "./Home.css";
import { cleanPage } from "../../utils/cleanpage/";

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
    const team2scores = getGameScores("Team2Game", 4);
    const team3scores = getGameScores("Team3Game", 4);
    const team4scores = getGameScores("Team4Game", 4);
    const team5scores = getGameScores("Team5Game", 4);
    const team6scores = getGameScores("Team6Game", 4);
    const team7scores = getGameScores("Team7Game", 4);
    const team8scores = getGameScores("Team8Game", 4);
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
                <p>${team1Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 2</h1>
                <p>Juegos: ${team2scores.join(" - ")}</p>
                <p>${team2Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 3</h1>
                <p>Juegos: ${team3scores.join(" - ")}</p>
                <p>${team3Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 4</h1>
                 <p>Juegos: ${team4scores.join(" - ")}</p>
                <p>${team4Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 5</h1>
                 <p>Juegos: ${team5scores.join(" - ")}</p>
                <p>${team5Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 6</h1>
                 <p>Juegos: ${team6scores.join(" - ")}</p>
                <p>${team6Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 7</h1>
                 <p>Juegos: ${team7scores.join(" - ")}</p>
                <p>${team7Total} puntos</p>
            </section>
            <section>
                <h1>Equipo 8</h1>
                 <p>Juegos: ${team8scores.join(" - ")}</p>
                <p>${team8Total} puntos</p>
            </section>
        </article>
    </div>
    `
    
}
import "./Home.css";
import { cleanPage } from "../../utils/cleanpage/";
import { Team1 } from  "../../pages/Team1/Team1";

export const HomeGames = () => {
    const savedValue = localStorage.getItem(`Game${num}`)
    const main = document.querySelector("main");
    cleanPage(main);
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
                <p>Juego1: ${savedValue} -------- Juego2: $ -------- Juego3: $ -------- Juego4: $ -------- Juego5: -----  Juego6: --------- Juego7: -----  Juego8: --------- Total puntos: $</p>
            </section>
            <section>
                <h1>Equipo 2</h1>
                <p>Juego 1: -----  Juego 2: --------- Juego 3: -----  Juego 4: --------- Juego 5: -----  Juego 6: --------- Juego 7: -----  Juego 8: --------- Total puntos: --------</p>
            </section>
            <section>
                <h1>Equipo 3</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Equipo 4</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Equipo 5</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Equipo 6</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Equipo 7</h1>
                <p>Explicasao</p>
            </section>
            <section>
                <h1>Equipo 8</h1>
                <p>Explicasao</p>
            </section>
        </article>
    </div>
    `
}
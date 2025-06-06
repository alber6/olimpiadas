import { cleanPage} from "../../utils/cleanPage/"
import "./team.css";

export function savePoints(gameNumber) {
    let input = parseFloat(document.getElementById(`num${gameNumber}`).value);
    const value = input || 0;

    localStorage.setItem(`Game${gameNumber}`, value);
    const resultDisplay = document.getElementById(`result${gameNumber}`);
    resultDisplay.textContent = `Resultado: ${value}`;
}

export const Team1 = () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div>
        <div class = grupos>
        <h2>Profesores --> ________________ </h2>
        <ul class = players>
            <li>Jugador 1 </li>
            <li>Jugador 2 </li>
            <li>Jugador 3 </li>
            <li>Jugador 4 </li>
            <li>Jugador 5 </li>
            <li>Jugador 6 </li>
            <li>Jugador 7 </li>
            <li>Jugador 8 </li>
            <li>Jugador 9 </li>
            <li>Jugador 10 </li>
            <li>Jugador 11 </li>
            <li>Jugador 12 </li>
            <li>Jugador 13 </li>
            <li>Jugador 14 </li>
            <li>Jugador 15 </li>
        </ul>
        </div>
        <div class = puntuacion>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="num1" placeholder="Juego 1" required>
            <button type="button" id="btnGame1" >Guardar</button>
            <p class="resultado" id="result1"></p>
            </div>
            <div>
            <input type="number" id="num2" placeholder="Juego 2" required>
            <button type="button" id="btnGame2" >Guardar</button>
            <p class="resultado" id="result2"></p>
            </div>
            <div>
            <input type="number" id="num3" placeholder="Juego 3" required>
            <button type="button" id="btnGame3" >Guardar</button>
            <p class="resultado" id="result3"></p>
            </div>
            <div>
            <input type="number" id="num4" placeholder="Juego 4" required>
            <button type="button" id="btnGame4" >Guardar</button>
            <p class="resultado" id="result4"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4];

    nums.forEach(num => {
    const savedValue = localStorage.getItem(`Game${num}`);
    document.getElementById(`num${num}`).value = savedValue;
    document.getElementById(`result${num}`).textContent = ` Resultado: ${savedValue}`;
    document.getElementById(`btnGame${num}`).addEventListener("click", () => savePoints(num));
    document.getElementById(`num${num}`).value = "";
    })
}




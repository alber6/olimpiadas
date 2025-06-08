import { cleanPage} from "../../utils/cleanPage/"


export const Team6= () => {
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
            <input type="number" id="team6num1" placeholder="Juego 1" required>
            <button type="button" id="team6btn1" >Guardar</button>
            <p class="resultado" id="team6result1"></p>
            </div>
            <div>
            <input type="number" id="team6num2" placeholder="Juego 2" required>
            <button type="button" id="team6btn2" >Guardar</button>
            <p class="resultado" id="team6result2"></p>
            </div>
            <div>
            <input type="number" id="team6num3" placeholder="Juego 3" required>
            <button type="button" id="team6btn3" >Guardar</button>
            <p class="resultado" id="team6result3"></p>
            </div>
            <div>
            <input type="number" id="team6num4" placeholder="Juego 4" required>
            <button type="button" id="team6btn4" >Guardar</button>
            <p class="resultado" id="team6result4"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4];

    nums.forEach(num => {
        const input = document.getElementById(`team6num${num}`);
        const result = document.getElementById(`team6result${num}`);
        const button = document.getElementById(`team6btn${num}`);

        const saved = localStorage.getItem(`Team6Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team6Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}



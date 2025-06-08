import { cleanPage} from "../../utils/cleanPage/"


export const Team5= () => {
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
            <input type="number" id="team5num1" placeholder="Juego 1" required>
            <button type="button" id="team5btn1" >Guardar</button>
            <p class="resultado" id="team5result1"></p>
            </div>
            <div>
            <input type="number" id="team5num2" placeholder="Juego 2" required>
            <button type="button" id="team5btn2" >Guardar</button>
            <p class="resultado" id="team5result2"></p>
            </div>
            <div>
            <input type="number" id="team5num3" placeholder="Juego 3" required>
            <button type="button" id="team5btn3" >Guardar</button>
            <p class="resultado" id="team5result3"></p>
            </div>
            <div>
            <input type="number" id="team5num4" placeholder="Juego 4" required>
            <button type="button" id="team5btn4" >Guardar</button>
            <p class="resultado" id="team5result4"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4];

    nums.forEach(num => {
        const input = document.getElementById(`team5num${num}`);
        const result = document.getElementById(`team5result${num}`);
        const button = document.getElementById(`team5btn${num}`);

        const saved = localStorage.getItem(`Team5Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team5Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}



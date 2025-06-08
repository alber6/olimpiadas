import { cleanPage} from "../../utils/cleanPage/"
import "./team7.css"

export const Team7= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos7>
        <div class = grupos7>
        <h2>Equipos 7 - Profesores --></h2>
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
        <div class = grupos7>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team7num1" placeholder="Juego 1" required>
            <button type="button" id="team7btn1" >Guardar</button>
            <p class="resultado" id="team7result1"></p>
            </div>
            <div>
            <input type="number" id="team7num2" placeholder="Juego 2" required>
            <button type="button" id="team7btn2" >Guardar</button>
            <p class="resultado" id="team7result2"></p>
            </div>
            <div>
            <input type="number" id="team7num3" placeholder="Juego 3" required>
            <button type="button" id="team7btn3" >Guardar</button>
            <p class="resultado" id="team7result3"></p>
            </div>
            <div>
            <input type="number" id="team7num4" placeholder="Juego 4" required>
            <button type="button" id="team7btn4" >Guardar</button>
            <p class="resultado" id="team7result4"></p>
            </div>
        </div>
        <div class = grupos7>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team7num5" placeholder="Juego 1" required>
            <button type="button" id="team7btn5" >Guardar</button>
            <p class="resultado" id="team7result5"></p>
            </div>
            <div>
            <input type="number" id="team7num6" placeholder="Juego 2" required>
            <button type="button" id="team7btn6" >Guardar</button>
            <p class="resultado" id="team7result6"></p>
            </div>
            <div>
            <input type="number" id="team7num7" placeholder="Juego 3" required>
            <button type="button" id="team7btn7" >Guardar</button>
            <p class="resultado" id="team7result7"></p>
            </div>
            <div>
            <input type="number" id="team7num8" placeholder="Juego 4" required>
            <button type="button" id="team7btn8" >Guardar</button>
            <p class="resultado" id="team7result8"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

    nums.forEach(num => {
        const input = document.getElementById(`team7num${num}`);
        const result = document.getElementById(`team7result${num}`);
        const button = document.getElementById(`team7btn${num}`);

        const saved = localStorage.getItem(`Team7Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team7Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}



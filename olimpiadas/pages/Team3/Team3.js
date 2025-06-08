import { cleanPage} from "../../utils/cleanPage/"
import "./team3.css"

export const Team3= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos3>
        <div class = grupos3>
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
        <div class = grupos3>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team3num1" placeholder="Juego 1" required>
            <button type="button" id="team3btn1" >Guardar</button>
            <p class="resultado" id="team3result1"></p>
            </div>
            <div>
            <input type="number" id="team3num2" placeholder="Juego 2" required>
            <button type="button" id="team3btn2" >Guardar</button>
            <p class="resultado" id="team3result2"></p>
            </div>
            <div>
            <input type="number" id="team3num3" placeholder="Juego 3" required>
            <button type="button" id="team3btn3" >Guardar</button>
            <p class="resultado" id="team3result3"></p>
            </div>
            <div>
            <input type="number" id="team3num4" placeholder="Juego 4" required>
            <button type="button" id="team3btn4" >Guardar</button>
            <p class="resultado" id="team3result4"></p>
            </div>
        </div>
        <div class = grupos3>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team3num5" placeholder="Juego 1" required>
            <button type="button" id="team3btn5" >Guardar</button>
            <p class="resultado" id="team3result5"></p>
            </div>
            <div>
            <input type="number" id="team3num6" placeholder="Juego 2" required>
            <button type="button" id="team3btn6" >Guardar</button>
            <p class="resultado" id="team3result6"></p>
            </div>
            <div>
            <input type="number" id="team3num7" placeholder="Juego 3" required>
            <button type="button" id="team3btn7" >Guardar</button>
            <p class="resultado" id="team3result7"></p>
            </div>
            <div>
            <input type="number" id="team3num8" placeholder="Juego 4" required>
            <button type="button" id="team3btn8" >Guardar</button>
            <p class="resultado" id="team3result8"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

    nums.forEach(num => {
        const input = document.getElementById(`team3num${num}`);
        const result = document.getElementById(`team3result${num}`);
        const button = document.getElementById(`team3btn${num}`);

        const saved = localStorage.getItem(`Team3Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team3Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}



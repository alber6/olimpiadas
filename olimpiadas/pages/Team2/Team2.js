import { cleanPage } from "../../utils/cleanPage/";
import "../Team1/team1.css"
import "./team2.css"

export const Team2 = () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos2>
        <div class="grupos2">
            <h2>Estudiantes --> ________________</h2>
            <ul class="players">
                <li>Jugador A</li>
                <li>Jugador B</li>
                <li>Jugador C</li>
                <li>Jugador D</li>
                <li>Jugador E</li>
                <li>Jugador F</li>
                <li>Jugador G</li>
                <li>Jugador H</li>
                <li>Jugador I</li>
            </ul>
        </div>
        <div class="grupos2">
            <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team2num1" placeholder="Juego 1" required>
            <button type="button" id="team2btn1">Guardar</button>
            <p class="resultado" id="team2result1"></p>
            </div>
            <div>
           <input type="number" id="team2num2" placeholder="Juego 2" required>
            <button type="button" id="team2btn2">Guardar</button>
            <p class="resultado" id="team2result2"></p>
            </div>
            <div>
            <input type="number" id="team2num3" placeholder="Juego 3" required>
            <button type="button" id="team2btn3">Guardar</button>
            <p class="resultado" id="team2result3"></p>
            </div>
            <div>
            <input type="number" id="team2num4" placeholder="Juego 4" required>
            <button type="button" id="team2btn4">Guardar</button>
            <p class="resultado" id="team2result4"></p>
            </div>
        </div>
         <div class="grupos2">
            <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team2num1" placeholder="Juego 1" required>
            <button type="button" id="team2btn1">Guardar</button>
            <p class="resultado" id="team2result1"></p>
            </div>
            <div>
           <input type="number" id="team2num2" placeholder="Juego 2" required>
            <button type="button" id="team2btn2">Guardar</button>
            <p class="resultado" id="team2result2"></p>
            </div>
            <div>
            <input type="number" id="team2num3" placeholder="Juego 3" required>
            <button type="button" id="team2btn3">Guardar</button>
            <p class="resultado" id="team2result3"></p>
            </div>
            <div>
            <input type="number" id="team2num4" placeholder="Juego 4" required>
            <button type="button" id="team2btn4">Guardar</button>
            <p class="resultado" id="team2result4"></p>
            </div>
        </div>
    </div>
    `;

    const nums = [1, 2, 3, 4];

    nums.forEach(num => {
        const input = document.getElementById(`team2num${num}`);
        const result = document.getElementById(`team2result${num}`);
        const button = document.getElementById(`team2btn${num}`);

        const saved = localStorage.getItem(`Team2Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team2Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
};

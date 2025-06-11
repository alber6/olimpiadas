import { cleanPage} from "../../utils/cleanPage/"
import "./team1.css"

export const Team1 = () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos1>
        <div class = grupos1>
        <h2>Equipos 1 - Laura y Ana --></h2>
        <ul class = players>
            <li>Aitana(6)</li>
            <li>Miguel(5)</li>
            <li>Thiago(2)</li>
            <li>Ainhoa(1)</li>
            <li>Eliané(1)</li>
            <li>Justo(4)</li>
            <li>Ainara(5)</li>
            <li>Ana Lucía(6)</li>
            <li>Carlota(2)</li>
            <li>Nathaniel(1)</li>
            <li>Valeria(4)</li>
            <li>Alonzo(1)</li>
            <li>Alex(3)</li>
        </ul>
        </div>
        <div class = grupos1>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team1num1" placeholder="Juego 1" required>
            <button type="button" id="team1btn1" >Guardar</button>
            <p class="resultado" id="team1result1"></p>
            </div>
            <div>
            <input type="number" id="team1num2" placeholder="Juego 2" required>
            <button type="button" id="team1btn2" >Guardar</button>
            <p class="resultado" id="team1result2"></p>
            </div>
            <div>
            <input type="number" id="team1num3" placeholder="Juego 3" required>
            <button type="button" id="team1btn3" >Guardar</button>
            <p class="resultado" id="team1result3"></p>
            </div>
            <div>
            <input type="number" id="team1num4" placeholder="Juego 4" required>
            <button type="button" id="team1btn4" >Guardar</button>
            <p class="resultado" id="team1result4"></p>
            </div>
        </div>
        <div class = grupos1>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team1num5" placeholder="Juego 1" required>
            <button type="button" id="team1btn5" >Guardar</button>
            <p class="resultado" id="team1result5"></p>
            </div>
            <div>
            <input type="number" id="team1num6" placeholder="Juego 2" required>
            <button type="button" id="team1btn6" >Guardar</button>
            <p class="resultado" id="team1result6"></p>
            </div>
            <div>
            <input type="number" id="team1num7" placeholder="Juego 3" required>
            <button type="button" id="team1btn7" >Guardar</button>
            <p class="resultado" id="team1result7"></p>
            </div>
            <div>
            <input type="number" id="team1num8" placeholder="Juego 4" required>
            <button type="button" id="team1btn8" >Guardar</button>
            <p class="resultado" id="team1result8"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

    nums.forEach(num => {
        const input = document.getElementById(`team1num${num}`);
        const result = document.getElementById(`team1result${num}`);
        const button = document.getElementById(`team1btn${num}`);

        const saved = localStorage.getItem(`Team1Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team1Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}




import { cleanPage} from "../../utils/cleanPage/"
import "./team4.css"

export const Team4= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos4>
        <div class = grupos4>
        <h2>Equipos 4 - Javier y Julia --></h2>
        <ul class = players>
            <li>Lidia(6)</li>
            <li>Dereck(5)</li>
            <li>Indara(3)</li>
            <li>Stefanía(3)</li>
            <li>Ramón(2)</li>
            <li>Sebastián(2)</li>
            <li>Asier(4)</li>
            <li>Zoey(5)</li>
            <li>Ariadna(6)</li>
            <li>Qiao Qiao(2)</li>
            <li>Izan(1)</li>
            <li>Álvaro(4)</li>
            <li>Nadia(4)</li>
            <li>Lía(6)</li>
            <li>Abril(3)</li>
        </ul>
        </div>
        <div class = grupos4>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team4num1" placeholder="Juego 1" required>
            <button type="button" id="team4btn1" >Guardar</button>
            <p class="resultado" id="team4result1"></p>
            </div>
            <div>
            <input type="number" id="team4num2" placeholder="Juego 2" required>
            <button type="button" id="team4btn2" >Guardar</button>
            <p class="resultado" id="team4result2"></p>
            </div>
            <div>
            <input type="number" id="team4num3" placeholder="Juego 3" required>
            <button type="button" id="team4btn3" >Guardar</button>
            <p class="resultado" id="team4result3"></p>
            </div>
            <div>
            <input type="number" id="team4num4" placeholder="Juego 4" required>
            <button type="button" id="team4btn4" >Guardar</button>
            <p class="resultado" id="team4result4"></p>
            </div>
        </div>
        <div class = grupos4>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team4num5" placeholder="Juego 1" required>
            <button type="button" id="team4btn5" >Guardar</button>
            <p class="resultado" id="team4result5"></p>
            </div>
            <div>
            <input type="number" id="team4num6" placeholder="Juego 2" required>
            <button type="button" id="team4btn6" >Guardar</button>
            <p class="resultado" id="team4result6"></p>
            </div>
            <div>
            <input type="number" id="team4num7" placeholder="Juego 3" required>
            <button type="button" id="team4btn7" >Guardar</button>
            <p class="resultado" id="team4result7"></p>
            </div>
            <div>
            <input type="number" id="team4num8" placeholder="Juego 4" required>
            <button type="button" id="team4btn8" >Guardar</button>
            <p class="resultado" id="team4result8"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

    nums.forEach(num => {
        const input = document.getElementById(`team4num${num}`);
        const result = document.getElementById(`team4result${num}`);
        const button = document.getElementById(`team4btn${num}`);

        const saved = localStorage.getItem(`Team4Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team4Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}



import { cleanPage} from "../../utils/cleanPage/"
import "./team8.css"

export const Team8= () => {
    const main = document.querySelector("main");
    cleanPage(main);

     main.innerHTML = `
    <div id = container-puntos8>
        <div class = grupos8>
        <h2>Equipos 8 - Víctor, Ángel/Alba</h2>
        <ul class = players>
            <li>Analía(6)</li>
            <li>Hans(6)</li>
            <li>Gabriel(5)</li>
            <li>Nicolás(3?)</li>
            <li>Gabriela(2)</li>
            <li>Carlos Javier(1)</li>
            <li>Angélica(4)</li>
            <li>Lucía(3)</li>
            <li>Nazim(6)</li>
            <li>Mar(6)</li>
            <li>Alisson(2)</li>
            <li>Nicolás(1)</li>
            <li>Ismael(4)</li>
            <li>Jazbell(2)</li>
            <li>Saifan(3)</li>
        </ul>
        </div>
        <div class = grupos8>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team8num1" placeholder="Juego 1" required>
            <button type="button" id="team8btn1" >Guardar</button>
            <p class="resultado" id="team8result1"></p>
            </div>
            <div>
            <input type="number" id="team8num2" placeholder="Juego 2" required>
            <button type="button" id="team8btn2" >Guardar</button>
            <p class="resultado" id="team8result2"></p>
            </div>
            <div>
            <input type="number" id="team8num3" placeholder="Juego 3" required>
            <button type="button" id="team8btn3" >Guardar</button>
            <p class="resultado" id="team8result3"></p>
            </div>
            <div>
            <input type="number" id="team8num4" placeholder="Juego 4" required>
            <button type="button" id="team8btn4" >Guardar</button>
            <p class="resultado" id="team8result4"></p>
            </div>
        </div>
        <div class = grupos8>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team8num5" placeholder="Juego 1" required>
            <button type="button" id="team8btn5" >Guardar</button>
            <p class="resultado" id="team8result5"></p>
            </div>
            <div>
            <input type="number" id="team8num6" placeholder="Juego 2" required>
            <button type="button" id="team8btn6" >Guardar</button>
            <p class="resultado" id="team8result6"></p>
            </div>
            <div>
            <input type="number" id="team8num7" placeholder="Juego 3" required>
            <button type="button" id="team8btn7" >Guardar</button>
            <p class="resultado" id="team8result7"></p>
            </div>
            <div>
            <input type="number" id="team8num8" placeholder="Juego 4" required>
            <button type="button" id="team8btn8" >Guardar</button>
            <p class="resultado" id="team8result8"></p>
            </div>
        </div>
        <div class = grupos8>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team8num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team8btn9" >Guardar</button>
            <p class="resultado" id="team8result9"></p>
            </div>
            <div>
            <input type="number" id="team8num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team8btn10" >Guardar</button>
            <p class="resultado" id="team8result10"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    nums.forEach(num => {
        const input = document.getElementById(`team8num${num}`);
        const result = document.getElementById(`team8result${num}`);
        const button = document.getElementById(`team8btn${num}`);

        const saved = localStorage.getItem(`Team8Game${num}`);
        input.value = saved || "";
        result.textContent = `Resultado: ${saved || 0}`;

        button.addEventListener("click", () => {
            const value = parseFloat(input.value) || 0;
            localStorage.setItem(`Team8Game${num}`, value);
            result.textContent = `Resultado: ${value}`;
            input.value = "";
        });
    });
}



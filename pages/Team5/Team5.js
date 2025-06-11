import { cleanPage} from "../../utils/cleanPage/"
import "./team5.css"

export const Team5= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos5>
        <div class = grupos5>
        <h2>Equipos 5 - Elena y Teresa--></h2>
        <ul class = players>
            <li>Luna(6)</li>
            <li>Lucía(5)</li>
            <li>Joshua(3)</li>
            <li>África(3)</li>
            <li>Wenzel(2)</li>
            <li>Nathan(1)</li>
            <li>Adriel(4)</li>
            <li>Zile(5)</li>
            <li>Izan(6)</li>
            <li>Guadalupe(2)</li>
            <li>Victoria(1)</li>
            <li>Lucía(4)</li>
            <li>Erick(4)</li>
            <li>Gustavo Adrián(6)</li>
            <li>Juan Pablo(4)</li>
        </ul>
        </div>
        <div class = grupos5>
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
        <div class = grupos5>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team5num5" placeholder="Juego 1" required>
            <button type="button" id="team5btn5" >Guardar</button>
            <p class="resultado" id="team5result5"></p>
            </div>
            <div>
            <input type="number" id="team5num6" placeholder="Juego 2" required>
            <button type="button" id="team5btn6" >Guardar</button>
            <p class="resultado" id="team5result6"></p>
            </div>
            <div>
            <input type="number" id="team5num7" placeholder="Juego 3" required>
            <button type="button" id="team5btn7" >Guardar</button>
            <p class="resultado" id="team5result7"></p>
            </div>
            <div>
            <input type="number" id="team5num8" placeholder="Juego 4" required>
            <button type="button" id="team5btn8" >Guardar</button>
            <p class="resultado" id="team5result8"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

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



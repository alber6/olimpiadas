import { cleanPage} from "../../utils/cleanPage/"
import "./team6.css"

export const Team6= () => {
    const main = document.querySelector("main");
    cleanPage(main);

   main.innerHTML = `
    <div id = container-puntos6>
        <div class = grupos6>
        <h2>Equipos 6 - Alberto y Raquel --></h2>
        <ul class = players>
            <li>David(6)</li>
            <li>Valeria(5)</li>
            <li>Almudena(3)</li>
            <li>Daniela(3)</li>
            <li>Óscar(2)</li>
            <li>Carmen(1)</li>
            <li>Cynthia(4)</li>
            <li>Azahara(3)</li>
            <li>Derek(6)</li>
            <li>Emmanuel(2)</li>
            <li>Yordi(1)</li>
            <li>Moly(4)</li>
            <li>Adrián(4)</li>
            <li>Luci(2)</li>
            <li>Hebrea(4)</li>
        </ul>
        </div>
        <div class = grupos6>
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
        <div class = grupos6>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team6num5" placeholder="Juego 1" required>
            <button type="button" id="team6btn5" >Guardar</button>
            <p class="resultado" id="team6result5"></p>
            </div>
            <div>
            <input type="number" id="team6num6" placeholder="Juego 2" required>
            <button type="button" id="team6btn6" >Guardar</button>
            <p class="resultado" id="team6result6"></p>
            </div>
            <div>
            <input type="number" id="team6num7" placeholder="Juego 3" required>
            <button type="button" id="team6btn7" >Guardar</button>
            <p class="resultado" id="team6result7"></p>
            </div>
            <div>
            <input type="number" id="team6num8" placeholder="Juego 4" required>
            <button type="button" id="team6btn8" >Guardar</button>
            <p class="resultado" id="team6result8"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

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



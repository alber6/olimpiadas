import { cleanPage} from "../../utils/cleanPage/"
import "./team6.css"

export const Team6= () => {
    const main = document.querySelector("main");
    cleanPage(main);

   main.innerHTML = `
    <div id = container-puntos6>
        <div class = grupos6>
        <h2>Equipos 6 - Alberto y Raquel</h2>
        <ul class = players>
            <li>David(6º)</li>
            <li>Valeria(5º)</li>
            <li>Almudena(3º)</li>
            <li>Daniela(3º)</li>
            <li>Óscar(2º)</li>
            <li>Carmen(1º)</li>
            <li>Cynthia(4º)</li>
            <li>Azahara(3º)</li>
            <li>Sofía(6º)</li>
            <li>Emmanuel(2º)</li>
            <li>Yordi(1º)</li>
            <li>Moly(4º)</li>
            <li>Adrián(4º)</li>
            <li>Luci(2º)</li>
            <li>Hebrea(4º)</li>15
            <li>Justin(1º ESO)</li>
            <li>Axel(2º ESO)</li>
            <li>Jesús(4º ESO)</li>
        </ul>
        <p>Orden de las pruebas: 3, 4, 1, 2</p>
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
        <div class = grupos6>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team6num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team6btn9" >Guardar</button>
            <p class="resultado" id="team6result9"></p>
            </div>
            <div>
            <input type="number" id="team6num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team6btn10" >Guardar</button>
            <p class="resultado" id="team6result10"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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



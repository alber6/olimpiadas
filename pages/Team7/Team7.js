import { cleanPage} from "../../utils/cleanPage/"
import "./team7.css"

export const Team7= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos7>
        <div class = grupos7>
        <h2>Equipos 7 - Esther y María</h2>
        <ul class = players>
            <li>Weiming(6)</li>
            <li>Alejo(5)</li>
            <li>Fran(5)</li>
            <li>Bohan(4)</li>
            <li>Saúl(2)</li>
            <li>Camila(4)</li>
            <li>Wesley(3)</li>
            <li>Kaylie(6)</li>
            <li>Óliver(2)</li>
            <li>Neizan(2)</li>
            <li>Alejandro(1)</li>
            <li>Jhadiel(4)</li>
            <li>Luciana(2)</li>
            <li>Renato(4)</li>14
            <li>Alan(1º ESO)</li>
            <li>Luis Ángel(1º ESO)</li>
            <li>Daniel F.C(2º ESO)</li>
        </ul>
        <p>Orden de las pruebas: 4, 1, 2, 3</p>
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
        <div class = grupos7>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team7num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team7btn9" >Guardar</button>
            <p class="resultado" id="team7result9"></p>
            </div>
            <div>
            <input type="number" id="team7num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team7btn10" >Guardar</button>
            <p class="resultado" id="team7result10"></p>
            </div>
        </div>
    </div>
    `
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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



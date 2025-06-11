import { cleanPage } from "../../utils/cleanPage/";
import "../Team1/team1.css"
import "./team2.css"

export const Team2 = () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos2>
        <div class="grupos2">
            <h2>Equipos 2 - Miguel Ángel y Jorge</h2>
            <ul class="players">
                <li>Fiorella(6º)</li>
                <li>Zichen(5º)</li>
                <li>Maykel(3º)</li>
                <li>Ismael(2º)</li>
                <li>Ángel Xu(2º)</li>
                <li>David(2º)</li>
                <li>Eva(4º)</li>
                <li>Martín(5º)</li>
                <li>Gabriela(6º)</li>
                <li>Alejandra(2º)</li>
                <li>Paolo(1º)</li>
                <li>Sanay(4º)</li>
                <li>Gabriela(1º)</li>
                <li>Martín(5º)</li>
                <li>Ruby(1º ESO)</li>
                <li>Xing Qiao(1º ESO)</li>
                <li>Alejandro(3º ESO)</li>17
            </ul>
            <p>Orden de las pruebas: 1, 2, 3, 4</p>
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
            <input type="number" id="team2num5" placeholder="Juego 1" required>
            <button type="button" id="team2btn5">Guardar</button>
            <p class="resultado" id="team2result5"></p>
            </div>
            <div>
           <input type="number" id="team2num6" placeholder="Juego 2" required>
            <button type="button" id="team2btn6">Guardar</button>
            <p class="resultado" id="team2result6"></p>
            </div>
            <div>
            <input type="number" id="team2num7" placeholder="Juego 3" required>
            <button type="button" id="team2btn7">Guardar</button>
            <p class="resultado" id="team2result7"></p>
            </div>
            <div>
            <input type="number" id="team2num8" placeholder="Juego 4" required>
            <button type="button" id="team2btn8">Guardar</button>
            <p class="resultado" id="team2result8"></p>
            </div>
        </div>
         <div class = grupos2>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team2num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team2btn9" >Guardar</button>
            <p class="resultado" id="team2result9"></p>
            </div>
            <div>
            <input type="number" id="team2num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team2btn10" >Guardar</button>
            <p class="resultado" id="team2result10"></p>
            </div>
        </div>
    </div>
    `;

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

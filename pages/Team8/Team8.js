import { cleanPage} from "../../utils/cleanPage/"
import "./team8.css"
import { db, setDoc, doc } from "../../firebase-config";

export const Team8= () => {
    const main = document.querySelector("main");
    cleanPage(main);

     main.innerHTML = `
    <div id = container-puntos8>
        <div class = grupos8>
        <h2>Equipos 8 - Víctor, Ángel/Alba</h2>
        <ul class = players>
            <li>Luna(6º)</li>
            <li>Lucía(5º)</li>
            <li>Joshua(3º)</li>
            <li>África(3º)</li>
            <li>Wenzel(2º)</li>
            <li>Nathan(1º)</li>
            <li>Adriel(4º)</li>
            <li>Zile(5º)</li>
            <li>Izan(6º)</li>
            <li>Guadalupe(2º)</li>
            <li>Victoria(1º)</li>
            <li>Lucía(4º)</li>
            <li>Erick(4º)</li>
            <li>Gustavo Adrián(6º)</li>
            <li>Juan Pablo(4º)</li>
            <li>Johan(1º ESO)</li>
            <li>Marco(2º ESO)</li>
            <li>Alejandro E.(4º ESO)</li>18
        </ul>
        <p>Orden de las pruebas: 4, 1, 2, 3</p>
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
      //array con los numeros de cada juego
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

nums.forEach(num => {
    // referencia a los elementos input, botón y párrafo para mostrar resultado
  const input = document.getElementById(`team8num${num}`);
  const result = document.getElementById(`team8result${num}`);
  const button = document.getElementById(`team8btn${num}`);

  // al hacer click en el botón de cada uno
  button.addEventListener("click", async () => {
    // se lee el valor númerico del input o 0 si está vacío
    const value = parseFloat(input.value) || 0;

    try {
         // Se crea una referencia al documento con ID fijo para cada juego
      const docId = `team8-juego${num}`;
      const docRef = doc(db, "resultados", docId); // referencia al documento con ID fijo
      // Guarda o actualiza los puntos en Firestore
      await setDoc(docRef, {
        equipo: "Team 8",
        juego: `Juego ${num}`,
        juegoNumero: num,
        puntos: value,
        dia: num <= 4 ? "Día 1" : num <= 8 ? "Día 2" : "Extra",
        fecha: new Date()
      });
      // Muestra el resultado guardado y limpia el input
      result.textContent = `Resultado: ${value}`;
      input.value = "";
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      result.textContent = `Error al guardar`;
    }
  });
});
}



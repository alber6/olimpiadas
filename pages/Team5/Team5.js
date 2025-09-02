import { cleanPage} from "../../utils/cleanPage/"
import "./team5.css"
import { db, setDoc, doc } from "../../firebase-config";

export const Team5= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos5>
        <div class = grupos5>
        <h2>Equipos 5 - Elena y Teresa</h2>
        <ul class = players>
            <li>Jugador1</li>
            <li>Jugador2</li>
            <li>Jugador3</li>
            <li>Jugador4</li>
            <li>Jugador5</li>
            <li>Jugador6</li>
            <li>Jugador7</li>
            <li>Jugador8</li>
            <li>Jugador9</li>
            <li>Jugador10</li>
        </ul>
        <p>Orden de las pruebas: 3, 4, 1, 2</p>
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
        <div class = grupos5>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team5num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team5btn9" >Guardar</button>
            <p class="resultado" id="team5result9"></p>
            </div>
            <div>
            <input type="number" id="team5num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team5btn10" >Guardar</button>
            <p class="resultado" id="team5result10"></p>
            </div>
        </div>
    </div>
    `
      //array con los numeros de cada juego
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

nums.forEach(num => {
    // referencia a los elementos input, botón y párrafo para mostrar resultado
  const input = document.getElementById(`team5num${num}`);
  const result = document.getElementById(`team5result${num}`);
  const button = document.getElementById(`team5btn${num}`);

  // al hacer click en el botón de cada uno
  button.addEventListener("click", async () => {
    // se lee el valor númerico del input o 0 si está vacío
    const value = parseFloat(input.value) || 0;

    try {
         // Se crea una referencia al documento con ID fijo para cada juego
      const docId = `team5-juego${num}`;
      const docRef = doc(db, "resultados", docId); // referencia al documento con ID fijo
      // Guarda o actualiza los puntos en Firestore
      await setDoc(docRef, {
        equipo: "Team 5",
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



import { cleanPage} from "../../utils/cleanPage/"
import "./team4.css"
import { db, setDoc, doc } from "../../firebase-config";

export const Team4= () => {
    const main = document.querySelector("main");
    cleanPage(main);

    main.innerHTML = `
    <div id = container-puntos4>
        <div class = grupos4>
        <h2>Equipo 4 - </h2>
        <p>Orden de las pruebas: 2, 4, 1, 3</p>
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
        <div class = grupos4>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team4num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team4btn9" >Guardar</button>
            <p class="resultado" id="team4result9"></p>
            </div>
            <div>
            <input type="number" id="team4num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team4btn10" >Guardar</button>
            <p class="resultado" id="team4result10"></p>
            </div>
        </div>
    </div>
    `
      //array con los numeros de cada juego
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

nums.forEach(num => {
    // referencia a los elementos input, botón y párrafo para mostrar resultado
  const input = document.getElementById(`team4num${num}`);
  const result = document.getElementById(`team4result${num}`);
  const button = document.getElementById(`team4btn${num}`);

  // al hacer click en el botón de cada uno
  button.addEventListener("click", async () => {
    // se lee el valor númerico del input o 0 si está vacío
    const value = parseFloat(input.value) || 0;

    try {
         // Se crea una referencia al documento con ID fijo para cada juego
      const docId = `team4-juego${num}`;
      const docRef = doc(db, "resultados", docId); // referencia al documento con ID fijo
      // Guarda o actualiza los puntos en Firestore
      await setDoc(docRef, {
        equipo: "Team 4",
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



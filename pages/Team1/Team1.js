import { cleanPage} from "../../utils/cleanPage/"
import "./team1.css"
import { db, setDoc, doc } from "../../firebase-config";


export const Team1 = () => {
    // selecciona el elemento main del html
    const main = document.querySelector("main");
    // limpia el contenido anterior del main
    cleanPage(main);

    // inserta el html con la lista de jugadores y inputs para puntos
    main.innerHTML = `
    <div id = container-puntos1>
        <div class = grupos1>
        <h2>Equipos 1 - Laura y Ana</h2>
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
        <p>Orden de las pruebas: 1, 2, 3, 4</p>
        </div>
        <div class = grupos1>
        <h2>Puntos Día 1</h2>
            <div>
            <input type="number" id="team1num1" placeholder="Juego 1" required>
            <button type="button" id="team1btn1" >Guardar</button>
            <p class="resultado" id="team1result1"></p>
            </div>
            <div>
            <input type="number" id="team1num2" placeholder="Juego 2" required>
            <button type="button" id="team1btn2" >Guardar</button>
            <p class="resultado" id="team1result2"></p>
            </div>
            <div>
            <input type="number" id="team1num3" placeholder="Juego 3" required>
            <button type="button" id="team1btn3" >Guardar</button>
            <p class="resultado" id="team1result3"></p>
            </div>
            <div>
            <input type="number" id="team1num4" placeholder="Juego 4" required>
            <button type="button" id="team1btn4" >Guardar</button>
            <p class="resultado" id="team1result4"></p>
            </div>
        </div>
        <div class = grupos1>
        <h2>Puntos Día 2</h2>
            <div>
            <input type="number" id="team1num5" placeholder="Juego 1" required>
            <button type="button" id="team1btn5" >Guardar</button>
            <p class="resultado" id="team1result5"></p>
            </div>
            <div>
            <input type="number" id="team1num6" placeholder="Juego 2" required>
            <button type="button" id="team1btn6" >Guardar</button>
            <p class="resultado" id="team1result6"></p>
            </div>
            <div>
            <input type="number" id="team1num7" placeholder="Juego 3" required>
            <button type="button" id="team1btn7" >Guardar</button>
            <p class="resultado" id="team1result7"></p>
            </div>
            <div>
            <input type="number" id="team1num8" placeholder="Juego 4" required>
            <button type="button" id="team1btn8" >Guardar</button>
            <p class="resultado" id="team1result8"></p>
            </div>
        </div>
        <div class = grupos1>
        <h2>Puntos JUEGOS EXTRA</h2>
            <div>
            <input type="number" id="team1num9" placeholder="Juego 1 EXTRA" required>
            <button type="button" id="team1btn9" >Guardar</button>
            <p class="resultado" id="team1result9"></p>
            </div>
            <div>
            <input type="number" id="team1num10" placeholder="Juego 2 EXTRA" required>
            <button type="button" id="team1btn10" >Guardar</button>
            <p class="resultado" id="team1result10"></p>
            </div>
        </div>
    </div>
    `
    //array con los numeros de cada juego
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

nums.forEach(num => {
    // referencia a los elementos input, botón y párrafo para mostrar resultado
  const input = document.getElementById(`team1num${num}`);
  const result = document.getElementById(`team1result${num}`);
  const button = document.getElementById(`team1btn${num}`);

  // al hacer click en el botón de cada uno
  button.addEventListener("click", async () => {
    // se lee el valor númerico del input o 0 si está vacío
    const value = parseFloat(input.value) || 0;

    try {
         // Se crea una referencia al documento con ID fijo para cada juego
      const docId = `team1-juego${num}`;
      const docRef = doc(db, "resultados", docId); // referencia al documento con ID fijo

      // console.log("Intentando guardar:", docId, value); // 🔥 AÑADIR ESTO

      // Guarda o actualiza los puntos en Firestore
      await setDoc(docRef, {
        equipo: "Team 1",
        juego: `Juego ${num}`,
        juegoNumero: num,
        puntos: value,
        dia: num <= 4 ? "Día 1" : num <= 8 ? "Día 2" : "Extra",
        fecha: new Date()
      });

      // console.log("Guardado exitoso"); // 🔥 AÑADIR ESTO

      // Muestra el resultado guardado y limpia el input
      result.textContent = `Resultado: ${value}`;
      input.value = "";
    } catch (error) {

    // console.error("Error completo:", error); // 🔥 CAMBIAR ESTO
    // console.error("Código de error:", error.code); // 🔥 AÑADIR ESTO
    // console.error("Mensaje:", error.message); // 🔥 AÑADIR ESTO
    // result.textContent = `Error: ${error.message}`; // 🔥 CAMBIAR ESTO


      console.error("Error al guardar en Firebase:", error);
      result.textContent = `Error al guardar`;
    }
  });
});

};
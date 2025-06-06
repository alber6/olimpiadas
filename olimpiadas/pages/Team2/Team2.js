import { cleanPage } from "../../utils/cleanPage/"

export const Team2 = () => {
    const main = document.querySelector("main");
    cleanPage(main);
    main.innerHTML = `
    <h2>somos el equipo 2</h2>`
}
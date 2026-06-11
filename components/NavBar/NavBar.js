import "./NavBar.css";

export const Navbar = () => {
    const header = document.querySelector("header");
    header.innerHTML =
    `<nav>
    <a href="https://www.liceoiberico.com/"><img src="/images/logo.png" alt=""></a>
    <h1>Olimpiadas 2026</h1>
    <ul>
        <li>
            <a href="#" id="homelink" class="enlace">Home</a>
        </li>
        <li>
            <a href="#" id="TeamLink1">Equipo 1</a>
        </li>
        <li>
            <a href="#" id="TeamLink2">Equipo 2</a>
        </li>
        <li>
            <a href="#" id="TeamLink3">Equipo 3</a>
        </li>
         <li>
            <a href="#" id="TeamLink4">Equipo 4</a>
        </li>
         <li>
            <a href="#" id="TeamLink5">Equipo 5</a>
        </li>
         <li>
            <a href="#" id="TeamLink6">Equipo 6</a>
        </li>
         <li>
            <a href="#" id="TeamLink7">Equipo 7</a>
        </li>
         <li>
            <a href="#" id="TeamLink8">Equipo 8</a>
        </li>
    </ul>
    </nav>`
};
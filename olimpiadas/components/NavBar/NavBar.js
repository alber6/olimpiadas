import "./NavBar.css";

export const Navbar = () => {
    const header = document.querySelector("header");
    header.innerHTML =
    `<nav>
    <h1>Olimpiadas 2025</h1>
    <a href="https://www.liceoiberico.com/"><img src="/public/images/logo.png" alt=""></a>
    <ul>
        <li>
            <a href="#" id="homelink">Home</a>
        </li>
        <li>
            <a href="#" id="TeamLink1">Equipo 1</a>
        </li>
        <li>
            <a href="#" id="TeamLink2">Equipo 2</a>
        </li>
    </ul>
    </nav>`
};
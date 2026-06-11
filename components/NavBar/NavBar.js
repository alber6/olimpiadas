import "./NavBar.css";

export const Navbar = () => {
  const header = document.querySelector("header");
  header.innerHTML = `
    <nav class="glass-nav">
      <div class="nav-brand">
        <a href="https://www.liceoiberico.com/" target="_blank" rel="noopener noreferrer" class="logo-link">
          <img src="/images/logo.png" alt="Liceo Ibérico" onerror="this.style.display='none'">
          <span class="logo-text">Liceo Ibérico</span>
        </a>
        <div class="nav-divider"></div>
        <h1 class="nav-title">Olimpiadas 2026</h1>
      </div>
      
      <ul class="nav-menu">
        <li>
          <a href="#" id="homelink" class="nav-link active">Inicio</a>
        </li>
        <li class="dropdown-item">
          <a href="#" class="nav-link dropdown-toggle" id="teamsDropdownToggle">
            Equipos <span class="arrow">▾</span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#" id="TeamLink1" class="dropdown-link">Equipo 1</a></li>
            <li><a href="#" id="TeamLink2" class="dropdown-link">Equipo 2</a></li>
            <li><a href="#" id="TeamLink3" class="dropdown-link">Equipo 3</a></li>
            <li><a href="#" id="TeamLink4" class="dropdown-link">Equipo 4</a></li>
            <li><a href="#" id="TeamLink5" class="dropdown-link">Equipo 5</a></li>
            <li><a href="#" id="TeamLink6" class="dropdown-link">Equipo 6</a></li>
            <li><a href="#" id="TeamLink7" class="dropdown-link">Equipo 7</a></li>
            <li><a href="#" id="TeamLink8" class="dropdown-link">Equipo 8</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  `;

  // Add click handling to active state highlighting
  const navLinks = header.querySelectorAll(".nav-link, .dropdown-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Don't mark dropdown toggle itself as active page link
      if (link.id === "teamsDropdownToggle") return;
      
      // Remove active from all
      navLinks.forEach(l => l.classList.remove("active"));
      
      // If click inside dropdown, mark the main toggle active
      if (link.classList.contains("dropdown-link")) {
        const toggle = header.querySelector("#teamsDropdownToggle");
        if (toggle) toggle.classList.add("active");
        link.classList.add("active");
      } else {
        link.classList.add("active");
      }
    });
  });
};
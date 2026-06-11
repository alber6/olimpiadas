import "./style.css";
import { linkPage } from "./utils/linkPage";
import { Navbar } from "./components/NavBar/NavBar";
import { HomeGames } from "./pages/Home/Home";
import { Team } from "./pages/Team/Team";

// Initialize layouts
Navbar();
HomeGames();

// Configure dynamic routing links
linkPage("#homelink", HomeGames);
linkPage("#TeamLink1", () => Team(1));
linkPage("#TeamLink2", () => Team(2));
linkPage("#TeamLink3", () => Team(3));
linkPage("#TeamLink4", () => Team(4));
linkPage("#TeamLink5", () => Team(5));
linkPage("#TeamLink6", () => Team(6));
linkPage("#TeamLink7", () => Team(7));
linkPage("#TeamLink8", () => Team(8));
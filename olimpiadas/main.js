import "./style.css";
import { linkPage } from "./utils/linkPage";
import { Navbar } from "./components/Navbar/Navbar";
import { HomeGames } from "./pages/Home/Home";
import { Team1 } from "./pages/Team1/Team1";
import { Team2 } from "./pages/Team2/Team2";

Navbar();
HomeGames();

linkPage("#homelink", HomeGames);
linkPage("#TeamLink1", Team1);
linkPage("#TeamLink2", Team2);
import "./style.css";
import { linkPage } from "./utils/linkPage";
import { Navbar } from "./components/NavBar/NavBar";
import { HomeGames } from "./pages/Home/Home";
import { Team1 } from "./pages/Team1/Team1";
import { Team2 } from "./pages/Team2/Team2";
import { Team3} from "./pages/Team3/Team3";
import { Team4 } from "./pages/Team4/Team4";
import { Team5 } from "./pages/Team5/Team5";
import { Team6 } from "./pages/Team6/Team6";
import { Team7 } from "./pages/Team7/Team7";
import { Team8 } from "./pages/Team8/Team8";


Navbar();
HomeGames();


linkPage("#homelink", HomeGames);
linkPage("#TeamLink1", Team1);
linkPage("#TeamLink2", Team2);
linkPage("#TeamLink3", Team3);
linkPage("#TeamLink4", Team4);
linkPage("#TeamLink5", Team5);
linkPage("#TeamLink6", Team6);
linkPage("#TeamLink7", Team7);
linkPage("#TeamLink8", Team8);
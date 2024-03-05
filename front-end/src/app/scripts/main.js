import { Router } from "./router.js";
import { WelcomeComponent } from "../components/welcome/welcome.component.js";
import { GameComponent } from "../components/game/game.component.js";
import { ScoreComponent } from "../components/score/score.component.js";
// TODO #import-css: use ES side-effect imports to import styles/style.css

import '/node_modules/bootstrap/dist/css/bootstrap.css';
import "../styles/style.css";

const outlet = document.querySelector("#content-outlet");
const router = new Router(outlet);
router
  .register("", {
    component: WelcomeComponent,
  })
  .register("welcome", {
    component: WelcomeComponent,
  })
  .register("game", {
    component: GameComponent,
  })
  .register("score", {
    component: ScoreComponent,
  });

import { Router } from "./router.js";
import { WelcomeComponent } from "../components/welcome/welcome.component.js";
import { GameComponent } from "../components/game/game.component.js";
import { ScoreComponent } from "../components/score/score.component.js";

import { NavbarComponent } from "../components/navbar/navbar.component.js";
import { FooterComponent } from "../components/footer/footer.compenent.js";

import '/node_modules/bootstrap/dist/css/bootstrap.css';
import "../styles/style.css";

customElements.define("my-navbar", NavbarComponent);
customElements.define("my-footer", FooterComponent);

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

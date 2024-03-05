import template from "../views/game.html";
import { Component } from "./component";

import { parseUrl } from "./utils.js";

import back from "/src/assets/cards/back.png";
import card0 from "/src/assets/cards/card-0.png";
import card1 from "/src/assets/cards/card-1.png";
import card2 from "/src/assets/cards/card-2.png";
import card3 from "/src/assets/cards/card-3.png";
import card4 from "/src/assets/cards/card-4.png";
import card5 from "/src/assets/cards/card-5.png";
import card6 from "/src/assets/cards/card-6.png";
import card7 from "/src/assets/cards/card-7.png";
import card8 from "/src/assets/cards/card-8.png";
import card9 from "/src/assets/cards/card-9.png";

const CARD_TEMPLATE = ""
  .concat('<main class="card-cmp">')
  .concat('  <div class="card-wrapper">')
  .concat('    <img class="card front-face" alt="card" />')
  .concat('    <img class="card back-face" alt="card" />')
  .concat("  </div>")
  .concat("</main>");

const environment = {
  api: {
    host: "http://localhost:8081",
  },
};

/* class GameComponent constructor */
export class GameComponent extends Component {
  constructor() {
    super(template)
    // gather parameters from URL
    const params = parseUrl();

    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  /* method GameComponent.init */
  async init() {
    // fetch the cards configuration from the server
    this._config = await this.fetchConfig();
    this._boardElement = document.querySelector(".cards");

    // create cards out of the config
    this._cards = this._config.ids.map((id) => new CardComponent(id));

    this._cards.forEach(card => {
      this._boardElement.appendChild(card.getElement());
      card.getElement().addEventListener(
        "click",
        () => {
          this._flipCard(card);
        }
      );
    });
    this.start();
  };

  /* method GameComponent.start */
  start() {
    this._startTime = Date.now();
    let seconds = 0;
    document.querySelector("nav .navbar-title").textContent =
      `Player: ${this._name}. Elapsed time: ${seconds++}`;

    this._timer = setInterval(
      () => {
        document.querySelector("nav .navbar-title").textContent =
          `Player: ${this._name}. Elapsed time: ${seconds++}`;
      },
      1000
    );
  };

  async fetchConfig() {
    const reponse = await fetch(`${environment.api.host}/board?size=${this._size}`, {
      method: 'GET'
    });
    console.log(reponse);
    if (reponse.status === 200) {
      return reponse.json();
    } else {
      throw new Error(reponse.status);
    }
  };

  /* method GameComponent.goToScore */
  goToScore() {
    const timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(() => {
      const scorePage = './#score';
      window.location = `${scorePage}?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
    },
      750
    );
  };

  /* method GameComponent._flipCard */
  _flipCard(card) {
    if (this._busy) {
      return;
    }

    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;

        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.goToScore();
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
          () => {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;

            // reset flipped card for the next turn.
            this._flippedCard = null;
          },
          500
        );
      }
    }
  };
}

// TODO #card-component: Change images location to /app/components/game/card/assets/***.png
const CARDS_IMAGE = [
  back,
  card0,
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
];

/* class CardComponent constructor */
class CardComponent extends Component {
  constructor(id) {
    super(CARD_TEMPLATE)
    // is this card flipped?
    this._flipped = false;

    // has the matching card has been discovered already?
    this.matched = false;

    this._elt = document.createElement("div");
    this._elt.innerHTML = this.template;
    this._elt = this._elt.firstElementChild;
    this._id = id;

    this._imageElt = this.getElement().querySelector(".card-wrapper");
    this._imageElt.querySelector("img.front-face").src =
      CARDS_IMAGE[this._id + 1];
    this._imageElt.querySelector("img.back-face").src = CARDS_IMAGE[0];
  }

  /* method CardComponent.getElement */
  getElement() {
    return this._elt;
  };

  /* method CardComponent.flip */
  flip() {
    this._imageElt.classList.toggle("flip");
    this._flipped = !this._flipped;
  };

  /* method CardComponent.equals */
  equals(card) {
    return card._id === this._id;
  };

  /* CardComponent.get flipped() */
  get flipped() {
    return this._flipped;
  }
}


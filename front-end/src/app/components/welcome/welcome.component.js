import template from "../welcome/welcome.component.html";
import "./welcome.component.scss";
import { Component } from "../../scripts/component.js";

export class WelcomeComponent extends Component {
  constructor() {
    super(template);
  }

  /* method WelcomeComponent.init */
  init() {
    const form = document.querySelector("form.form-signin");

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          const name = event.srcElement.querySelector("#nickname").value;
          const size = parseInt(event.srcElement.querySelector("#size").value);

          this._startGame(name, size);
        }
      },
      false
    );

    return this;
  };

  _startGame(name, size) {
    const gamePage = './#game';
    window.location = `${gamePage}?name=${name}&size=${size}`;
  }
}
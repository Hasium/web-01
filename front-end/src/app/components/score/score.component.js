import template from "../score/score.component.html";
import { Component } from "../../scripts/component.js";
import "./score.component.scss";
import { parseUrl } from "../../scripts/utils.js";

export class ScoreComponent extends Component {
  constructor() {
    super(template)
    const params = parseUrl();

    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }

  /* method ScoreComponent.init */
  init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  };
}


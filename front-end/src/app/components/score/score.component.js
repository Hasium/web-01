import template from "../score/score.component.html";
import { Component } from "../../scripts/component.js";
import "./score.component.scss";
import { parseUrl } from "../../scripts/utils.js";

const environment = {
  api: {
    host: "http://localhost:8081",
  },
};

export class ScoreComponent extends Component {
  constructor() {
    super(template)
    const params = parseUrl();

    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }

  /* method ScoreComponent.init */
  async init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
    let scores = await this._getScores();
    scores = scores.sort((a, b) => a.time - b.time);
    this._displayScores(scores);
  };

  async _getScores() {
    try {
      const response = await fetch(`${environment.api.host}/scores`);
      const data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  _displayScores(scores) {
    const table = document.getElementById("scores");
    let i = 1;
    scores.forEach((score) => {
      const row = document.createElement("thead");
      row.innerHTML = `<tr><td>${i}</td><td>${score.name}</td><td>${score.time.toFixed(2)}</td><td>${score.size.toFixed(2)}</td></tr>`;
      table.appendChild(row);
      i++;
    });
  }

}


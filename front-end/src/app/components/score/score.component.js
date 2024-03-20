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
    this.scores = [];
  }

  /* method ScoreComponent.init */
  async init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
    let scores_temp = await this._getScores();
    this.scores = scores_temp.sort((a, b) => a.time - b.time)
      .sort((a, b) => a.size - b.size)
    const sizes = [...new Set(this.scores.map(score => score.size))]
    this._displayScores(this.scores);

    const dropdown = document.getElementsByClassName("dropdown-menu")
    const option = document.createElement("div")
    option.classList.add("dropdown-element")
    option.innerText = `Toutes les paires`
    option.onclick = () => {
      this._displayScores(this.scores)
    }
    dropdown[0].appendChild(option)

    sizes.forEach(size => {
      const option = document.createElement("div")
      option.classList.add("dropdown-element")
      option.innerText = `${size} paires`
      option.onclick = () => {
        let scores = this.scores.filter(score => score.size === size).sort((a, b) => a.time - b.time)
        this._displayScores(scores)
      }
      dropdown[0].appendChild(option)
    })
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

    while (table.children[1]) {
      table.removeChild(table.children[1]);
    }

    let i = 1;
    scores.forEach((score) => {
      const row = document.createElement("thead");
      row.innerHTML = `<tr><td>${i}</td><td>${score.name}</td><td>${score.time.toFixed(2)}</td><td>${score.size}</td></tr>`;
      table.appendChild(row);
      i++;
    });
  }

}


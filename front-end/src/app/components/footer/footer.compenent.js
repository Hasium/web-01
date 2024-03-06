import template from './footer.component.html';

import "./footer.component.scss";

export class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = template;
    }
}
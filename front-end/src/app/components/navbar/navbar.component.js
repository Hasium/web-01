import template from './navbar.component.html';

import "./navbar.component.scss";

export class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = template;
    }
}
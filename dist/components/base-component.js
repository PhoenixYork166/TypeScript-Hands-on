// Component Base Class
// Similar to React, { Component } from 'react'
// abstract class Component<T extends whereToRender, U extends elementToRender>
export class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        // HTML Form Element
        this.element = importedNode.firstElementChild;
        // <section class="projects">
        // need a dynamic value for a number of lists of projects
        // to inject relevant css based on type of listed projects
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        // <ul></ul> is before end of </section>
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
    ;
}

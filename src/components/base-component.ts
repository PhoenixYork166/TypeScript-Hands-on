namespace App {
    // Component Base Class
    // Similar to React, { Component } from 'react'
    // abstract class Component<T extends whereToRender, U extends elementToRender>
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;

        constructor(
            templateId: string, 
            hostElementId: string, 
            insertAtStart: boolean,
            newElementId?: string
            ) {
            this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
            this.hostElement = <T>document.getElementById(hostElementId);

            const importedNode = document.importNode(this.templateElement.content, true);

            // HTML Form Element
            this.element = <U>importedNode.firstElementChild; 
            // <section class="projects">

            // need a dynamic value for a number of lists of projects
            // to inject relevant css based on type of listed projects
            if (newElementId) {
                this.element.id = newElementId;
            }    

            this.attach(insertAtStart);
        }

        private attach(insertAtBeginning: boolean) {
            // <ul></ul> is before end of </section>
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        };

        // concrete implementation is missing here
        // this forces any classes inheriting this abstract class Component
        // to forcibly inherit these configure() & renderContent() methods
        // to be defined after class newComponent extends Component
        abstract configure(): void;
        abstract renderContent(): void;
    }
}
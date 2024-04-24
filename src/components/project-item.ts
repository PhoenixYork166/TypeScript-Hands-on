import { Component } from './base-component';
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Autobinding } from '../decorators/autobinding';

// ProjectItem Class
// class ProjectItem extends Component<T extends whereToRender, U extends elementToRender>
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobinding
    dragStartHandler(event: DragEvent) {
        console.log(`Drag starts`);
        console.log(event);
        // to actually do dragging
        //event.dataTransfer!.setData(dataIdentifier, dataId);
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
        
    @Autobinding
    dragEndHandler(_: DragEvent) {
        console.log(`Drag ended`);
    }

    // each ProjectItem does NOT need to do 'submit' action
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
    /*
    <template id="single-project">
        <li>
            <h2><!-- Title of Project --></h2>
            <h3><!-- Number of People --></h3>
            <p><!-- Description --></p>
        </li>
    </template>
    */
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned to this project'; // typeof this.project.people = 'number'
    this.element.querySelector('p')!.textContent = this.project.description;
    }
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { ProjectStatus } from '../models/project.js';
import { Autobinding } from '../decorators/autobinding.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';
// ProjectList Class
// class ProjectList extends Component<T extends whereToRender, U extends elementToRender>
export class ProjectList extends Component {
    constructor(type) {
        //super(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string)
        // false = ProjectList are NOT rendered at start of list
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        // this will happen in the base class
        // this.attach();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            // to disable JavaScript/TypeScript default Drop event being prohibited
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            // add pink background: #ffe3ee when drag starts
            listEl.classList.add('droppable');
            console.log(`Drag Over has been detected!`);
        }
    }
    dropHandler(event) {
        console.log(`Drop detected!`);
        console.log(event);
        console.log(`\n`);
        console.log(`Attempting to retrieve:\nevent.dataTransfer!.getData('text/plain')`);
        console.log(event.dataTransfer.getData('text/plain'));
        // extracting projectId
        const projectId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        // remove pink background: #ffe3ee when drop completes
        listEl.classList.remove('droppable');
        console.log(`Drop area detected!`);
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        // to register a listener function
        projectState.addListener((projects) => {
            // true => keep item in newly created Project[]
            // then stored in relevantProjects 
            // false => drop the item from the new list
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            //this.assignedProjects = projects;
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        // fill blank spaces in template with some lives
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        // selecting <h2></h2>
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        // get rid of all listed items => re-render again
        // whenever we add render a new project
        // we clear all existing projects
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            /*
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            // To avoid unnecessary re-rendering &
            // check for rendered active projects before rendering
            listEl.appendChild(listItem);
            */
            new ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
}
__decorate([
    Autobinding
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobinding
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobinding
], ProjectList.prototype, "dragLeaveHandler", null);

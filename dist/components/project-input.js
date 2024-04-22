var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { validateInput } from '../util/validation.js';
import { Autobinding } from '../decorators/autobinding.js';
import { projectState } from '../state/project-state.js';
// Singleton design pattern
// class ProjectInput extends Component<T extends whereToRender, U extends elementToRender>
export class ProjectInput extends Component {
    constructor() {
        //super(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string)
        // true = ProjectList are rendered at start of list
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title'); // <input type="text" id="title" />
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        // this.element.addEventListener('submit', this.submitHandler.bind(this)); // binding to this of submitHandler()
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    // function type = tuple[string, string, number]
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        // passing each of enteredValue to create an Object
        // that extends interface Validatable
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10
        };
        if (!validateInput(titleValidatable) ||
            !validateInput(descriptionValidatable) ||
            !validateInput(peopleValidatable)) {
            alert('Invalid input, please try again!');
            //throw new Error('Invalid input, please try again!');
            return; // return void
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault(); // prevent default page refresh
        const userInput = this.gatherUserInput();
        //if (userInput instanceof Tuple) // we cannot check Tuple at runtime level
        // *** Tuple [string, string, number] = array
        if (Array.isArray(userInput)) {
            // destructuring here
            const [title, description, people] = userInput;
            console.log(`title:\n${title}\ndescription:\n${description}\npeople:${people}`);
            projectState.addProject(title, description, people);
            // clear userInputs after logging
            this.clearInputs();
        }
    }
}
__decorate([
    Autobinding // Autobinding() decorator 
    // binding this of submitHandler() to this of configure()
], ProjectInput.prototype, "submitHandler", null);

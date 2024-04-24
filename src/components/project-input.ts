import { Component } from './base-component';
import { Validatable, validateInput } from '../util/validation';
import { Autobinding } from '../decorators/autobinding';
import { projectState } from '../state/project-state';

// Singleton design pattern
// class ProjectInput extends Component<T extends whereToRender, U extends elementToRender>
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        //super(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string)
        // true = ProjectList are rendered at start of list
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title'); // <input type="text" id="title" />
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description'); 
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people'); 

        this.configure();
    }

    configure() {
        // this.element.addEventListener('submit', this.submitHandler.bind(this)); // binding to this of submitHandler()
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    // function type = tuple[string, string, number]
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // passing each of enteredValue to create an Object
        // that extends interface Validatable
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10
        };

        if (
        !validateInput(titleValidatable) ||
        !validateInput(descriptionValidatable) ||
        !validateInput(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            //throw new Error('Invalid input, please try again!');
            return; // return void
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @Autobinding // Autobinding() decorator 
    // binding this of submitHandler() to this of configure()
    private submitHandler(event: Event) {
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
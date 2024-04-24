import { Project, ProjectStatus } from "../models/project";

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = []; // array of Functions

    // used whenever project changes e.g. adding a new project
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// Project State Management similar to Redux for React || NgRx for Angular
export class ProjectState extends State<Project> {
    private projects: Project[] = []; // array of stored projects
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    // Limiting global scope to only has 1 instance of ProjectState
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(), 
            title, 
            description, 
            numOfPeople,
            ProjectStatus.Active
            )
        // const newProject = {
        //     id: Math.random().toString(),
        //     title: title,
        //     description: description,
        //     people: numOfPeople
        // };
        this.projects.push(newProject);
        this.updateListeners();
        }

    // projectId = map this.projects: Project[] Array => flip status
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);

        // check if project exists
        if (project && project.status !== newStatus) {
            // changing extracted project.status => newStatus
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            // only parse in a copy of this.projects
            // every listenerFn getting executed & 
            // gets our brand new copy of projects
            listenerFn(this.projects.slice()); 
        }
    }
}

// global only has 1 instance of ProjectState
// static getInstance()
export const projectState = ProjectState.getInstance();

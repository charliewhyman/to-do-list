import {createToDo, updateToDo, deleteToDo, getUniqueProjects, filterToDos} from './toDos';
import {getToDos, setToDos, overwriteToDosArray} from './storage';
import {createBaseElements, generateTaskList, addSideNavLinks, createModal, highlightProject} from './ui';

//import {resetPage} from './ui'

import './style.css';

//create array to store toDos
let toDos = [];

//testing
//create test toDos
let testToDo = createToDo('Finish website design','Web development project','Complete css styling for the website','2025-09-29','High', false);
let testToDo2 = createToDo('Sweep the floors','House maintenance','Sweep the downstairs floors','2027-01-12','Low', false);
let testToDo3 = createToDo('Clean the windows','House maintenance','Clean the upstairs windows','2023-03-06','Low', false);

//add the new toDos to the toDos array
toDos.push(testToDo);
toDos.push(testToDo2);
toDos.push(testToDo3);

//push the toDos array to localStorage
setToDos('toDos', toDos);

//DOM
//create base elements
createBaseElements();

let sideNav = document.getElementById('sideNav');

//add project links to sidebar
    //get an array of unique projects
let uniqueProjects = getUniqueProjects(toDos);

addSideNavLinks(uniqueProjects);

//get tasks based on selected project
let selectedProject = 'Web development project';

//select tasks from selected project
let selectedToDos = filterToDos(toDos, selectedProject);

generateTaskList(selectedToDos);

//create modal box for editing task properties
createModal();

//highlight the selected project in the sidebar
highlightProject(selectedProject);

//event listeners
//add event listeners to all topNav links
topNav.addEventListener('click', (event) => {
    const isLink = event.target.tagName.toLowerCase() === 'a';
    if (isLink && event.target.id === 'home') {
        console.log('home')
    } else if (isLink && event.target.id === 'projects') {
        console.log('projects')
    } else if (isLink && event.target.id === 'about') {
        console.log('about')
    };
});

//add event listener to tasks to open modal box
let modal = document.getElementById('modal');

let formSubmitDiv = document.getElementById('formSubmitDiv');
let formSubmitButton = document.getElementById('formSubmitButton');

let formAddTaskDiv = document.getElementById('formAddTaskDiv');
let formAddTaskButton = document.getElementById('formAddTaskButton');

let titleInput = document.getElementById('titleInput');
let descriptionInput = document.getElementById('descriptionInput');
let dueDateInput = document.getElementById('dueDateInput');
let priorityOptions = document.querySelectorAll ('.selectOption');

document.querySelectorAll('.listItem').forEach(item => {
    item.addEventListener('click', event => {
        
        //set default input values to task values
        titleInput.value = item.dataset.title;
        dueDateInput.value = item.dataset.dueDate;
        descriptionInput.value = item.dataset.description;

        //select task's priority in the modal box
        priorityOptions.forEach(option => {
            if (option.value == item.dataset.priority) {
                option.selected = true;
            }
        })

        modal.style.display = 'block';
    })
});
//create modal box listeners
const addModalEventListeners = function addModalEventListeners() {
    
    //add event listener to button to close modal box
    let closeButton = document.getElementById('close');
    
    closeButton.addEventListener('click', (event) => {
        modal.style.display = 'none';
    });

    //add event listener to close modal box when user clicks outside of popup
    modal.addEventListener('click', function(event) {
        if (event.target.id === 'modal') {
            modal.style.display = 'none';
        }
    });

    //add event listener to close modal box when user hits escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
        modal.style.display = 'none';
        };

    //create 'submit'/add task button listeners
    


    if (formSubmitButton.style.display !== 'none') {
        formSubmitButton.addEventListener('click', function(event) {
            let newToDo = createToDo('Example task', newProjectValue, 'Example description','01/01/2023','Low', false);
            overwriteToDosArray(toDos, 'toDos');
            toDos.push(newToDo);
            setToDos('toDos', toDos);
        })
    }

    });
};

addModalEventListeners();

//add event listeners to done checkboxes to toggle done 
const addDoneCheckboxListeners = function addDoneCheckboxListeners() {
    document.querySelectorAll('.doneCheckBox').forEach(box => {
        box.addEventListener('change', event => {
            console.log('test')
            if (box.checked == true) {
                //if done is checked, update the done in localstorage
                overwriteToDosArray(toDos, 'toDos');
                updateToDo(toDos, box.dataset.project, box.dataset.title, 'done', true);
                setToDos('toDos', toDos);

                //strike through the task in the list
                box.parentNode.style.textDecoration = 'line-through';

            } else {
                //if done is checked, update the done in localstorage
                overwriteToDosArray(toDos, 'toDos');
                updateToDo(toDos, box.dataset.project, box.dataset.title, 'done', false);
                setToDos('toDos', toDos);

                box.parentNode.style.textDecoration = 'none';
            }
            }
        )
    })
};

addDoneCheckboxListeners();

//add event listener to projects to filter tasks
sideNav.addEventListener('click', (event) => {
    const isLink = event.target.className === 'projectLink';
    if (isLink) {
        selectedProject = event.target.dataset.project;
        selectedToDos = filterToDos(toDos, selectedProject);
        generateTaskList(selectedToDos);
        highlightProject(selectedProject);

        addModalEventListeners();
        addDoneCheckboxListeners();
    };
});

//add event listener to add project button
let addProjectButton = document.getElementById('addProjectButton');
let newProjectInput = document.getElementById('newProjectInput');
let newProjectSubmitButton = document.getElementById('newProjectSubmitButton');

const addProjectButtonListener = function addProjectButtonListener() {
    addProjectButton.addEventListener('click', (event) => {
        if (newProjectInput.style.display == 'none') {

            newProjectInput.style.display = 'block';
            newProjectSubmitButton.style.display = 'block';
    
            addProjectButton.textContent = 'Cancel';
    
        } else {
            newProjectInput.style.display = 'none';
            newProjectSubmitButton.style.display = 'none';
    
            addProjectButton.textContent = 'Add project';
        }
    });
}

addProjectButtonListener();

//add event listener to project submit button
newProjectSubmitButton.addEventListener('click', (event) => {
    let newProjectValue = newProjectInput.value;
    let newProjectToDo = createToDo('Example task', newProjectValue, 'Example description','01/01/2023','Low', false);
    overwriteToDosArray(toDos, 'toDos');
    toDos.push(newProjectToDo);
    setToDos('toDos', toDos);

    //add new project to sidebar
    uniqueProjects = getUniqueProjects(toDos);
    addSideNavLinks(uniqueProjects);

    //filter task to show new project's tasks
    selectedToDos = filterToDos(toDos, newProjectValue);
    generateTaskList(selectedToDos);

    //highlight new project
    highlightProject(newProjectValue);

    //change add project button back
    addProjectButton.textContent = 'Add project';
    addProjectButtonListener();
});

//add event listener to add task button
let addTaskButton = document.getElementById('addTaskButton');

const addTaskButtonListener = function addTaskButtonListener() {
    addTaskButton.addEventListener('click', (event) => {
        //show modal box
        modal.style.display = 'block';

        //hide 'submit' button
        formSubmitDiv.style.display = 'none';
        formSubmitButton.style.display = 'none';

        //show 'add task button'
        formAddTaskDiv.style.display = 'block';
        formAddTaskButton.style.display = 'block';

        addModalEventListeners();
    })
};

addTaskButtonListener();
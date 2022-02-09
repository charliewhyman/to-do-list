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

//get tasks based on selected project
let selectedProject = 'Web development project';

//select tasks from selected project
let selectedToDos = filterToDos(toDos, selectedProject);

generateTaskList(selectedToDos);

//add project links to sidebar
    //get an array of unique projects
let uniqueProjects = getUniqueProjects(toDos);

addSideNavLinks(uniqueProjects);

//create modal box for editing task properties
createModal();

//highlight the selected project in the sidebar
highlightProject(selectedProject);

//event listeners
//add event listeners to all topNav links
topNav.addEventListener('click', (event) => {
    const isLink = event.target.tagName.toLowerCase() === 'a';
    if (isLink && event.target.id === 'home') {
        console.log('home');
    } else if (isLink && event.target.id === 'about') {
        console.log('about');
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

//add event listener to add task button
const addTaskButtonListener = function addTaskButtonListener() {
    let addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click', (event) => {
        
        //show modal box
        modal.style.display = 'block';

        //hide 'submit' button
        formSubmitDiv.style.display = 'none';
        formSubmitButton.style.display = 'none';

        //show 'add task button'
        formAddTaskDiv.style.display = 'block';
        formAddTaskButton.style.display = 'block';

        //clear default values
        titleInput.value = ''
        dueDateInput.value = '';
        descriptionInput.value = '';

        priorityOptions.forEach(option => {
                option.selected = false;
        })
    })
};

addTaskButtonListener();

//create task item listeners

const addTaskItemListeners = function addTaskItemListeners() {
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
}

addTaskItemListeners();

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
        }
    });

    //create 'submit'/add task button listeners
    //if form submit button is showing, create a new example todo
    if (formSubmitButton.style.display !== 'none') {
        formAddTaskButton.addEventListener('click', function(event) {
            //stop page refresh on submit
            event.preventDefault();

            //create a new to do and save to localstorage
            let selectedPriority  = document.getElementById('prioritySelect').value;
            let newToDo = createToDo(titleInput.value, selectedProject, descriptionInput.value, dueDateInput.value, selectedPriority, false);
            overwriteToDosArray(toDos, 'toDos');
            toDos.push(newToDo);
            
            setToDos('toDos', toDos);

            selectedToDos = filterToDos(toDos, selectedProject);
            generateTaskList(selectedToDos);

            //close modal box
            modal.style.display = 'none';

            addTaskButtonListener();
            addTaskItemListeners();
        })
    //else update the existing todo
    } else {
        formAddTaskButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('add task');
        })
    }
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
     
        addTaskItemListeners();
        addModalEventListeners();
        addDoneCheckboxListeners();
        addTaskButtonListener();
    };
});

//add event listener to add project button

const addProjectButtonListener = function addProjectButtonListener() {
    let addProjectButton = document.getElementById('addProjectButton');

    let newProjectInputDiv = document.getElementById('newProjectInputDiv');

    
    addProjectButton.addEventListener('click', (event) => {

        if (newProjectInputDiv.className == 'projectInputDivHide') {
            newProjectInputDiv.className = 'projectInputDivShow';
            addProjectButton.textContent = 'Cancel';     
        } else {
            newProjectInputDiv.className = 'projectInputDivHide';
            addProjectButton.textContent = 'Add project';   
            
            addProjectSubmitButtonListener();

        }
    });
}

addProjectButtonListener();

//add event listener to project submit button
const addProjectSubmitButtonListener = function addProjectSubmitButtonListener() {
    newProjectSubmitButton.addEventListener('click', (event) => {
        let newProjectInput = document.getElementById('newProjectInput');
        let newProjectValue = newProjectInput.value;

        //check if project value already exists
        overwriteToDosArray(toDos, 'toDos');

        let existingProjects = getUniqueProjects(toDos);
        console.log(existingProjects)
        console.log(newProjectValue)

        if (existingProjects.includes(newProjectValue)) {
            alert('Project already exists!');
        } else {
            let newProjectToDo = createToDo('Example task', newProjectValue, 'Example description','01/01/2023','Low', false);
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
        
            newProjectInputDiv.className = 'projectInputDivHide';
            addProjectButton.textContent = 'Add project'; 

            addProjectButtonListener();
            addTaskButtonListener();
        }
        
    });
}

addProjectSubmitButtonListener();
    

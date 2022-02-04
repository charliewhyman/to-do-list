import {createToDo, updateToDo, deleteToDo, getUniqueProjects, filterToDos} from './toDos';
import {getToDos, setToDos, overwriteToDosArray} from './storage';
import {createBaseElements, generateTaskList, addSideNavLinks, createModal, highlightProject} from './ui';

//import {resetPage} from './ui'

import './style.css';

//create array to store toDos
let toDos = [];

//testing
//create test toDos
let testToDo = createToDo('Finish website design','Web development project','Complete css styling for the website','29/09/2025','High', true);
let testToDo2 = createToDo('Sweep the floors','House maintenance','Sweep the downstairs floors','12/01/2027','Low', false);
let testToDo3 = createToDo('Clean the windows','House maintenance','Clean the upstairs windows','03/06/2023','Low', false);

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

//add event listener to projects to filter tasks
sideNav.addEventListener('click', (event) => {
    const isLink = event.target.className === 'projectLink';
    if (isLink) {
        selectedProject = event.target.id;
        selectedToDos = filterToDos(toDos, selectedProject);
        generateTaskList(selectedToDos);
        highlightProject(selectedProject);
    };
});

//add event listener to tasks to open modal box
let modal = document.getElementById('modal');

document.querySelectorAll('.taskItem').forEach(item => {
    item.addEventListener('click', event => {
        modal.style.display = 'block';
    })
  });

//add event listener to button to close modal box
let closeButton = document.getElementById('close');

closeButton.addEventListener('click', (event) => {
    document.getElementById('modal').style.display = 'none';
});

//add event listener to status checkboxes to toggle done status
document.querySelectorAll('.statusCheckBox').forEach(box => {
    box.addEventListener('change', event => {
        if (box.checked == true) {
            box.parentNode.style.textDecoration = 'line-through';

        } else {
            box.parentNode.style.textDecoration = 'none';
        }
        }
    )
})
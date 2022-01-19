import {createToDo, updateToDo, deleteToDo, getUniqueProjects, filterToDos} from './toDos';
import {getToDos, setToDos, overwriteToDosArray} from './storage';
import {createBaseElements, generateTaskList, addSideNavLinks} from './ui';

//import {resetPage} from './ui'

import "./style.css";

//create array to store toDos
let toDos = [];

//testing
//create two test toDos
let testToDo = createToDo('testTitle','testProject','testDescription','testDueDate','testPriority');
let testToDo2 = createToDo('testTitle2','testProject2222222222222222222222222222222','testDescription2','testDueDate2','testPriority2')

//add the new toDos to the toDos array
toDos.push(testToDo);
toDos.push(testToDo2);

//push the toDos array to localStorage
setToDos('toDos', toDos);

//retrieve the stringified toDos object from localStorage and print
let retrievedToDos = getToDos('toDos');

//overwrite the toDos array with the toDos in local storage
overwriteToDosArray(toDos);

//update toDo
updateToDo(toDos, 'testProject2222222222222222222222222222222','testTitle2','dueDate','01/01/2001');

//push the toDos array to localStorage
setToDos('toDos', toDos);

//overwrite the toDos array with the toDos in local storage
overwriteToDosArray(toDos);

//delete toDo
//deleteToDo(toDos, 'testProject', 'testTitle');

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
let selectedProject = 'testProject';

//select tasks from selected project
let selectedToDos = filterToDos(toDos, selectedProject);

generateTaskList(selectedToDos);

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
    };
});
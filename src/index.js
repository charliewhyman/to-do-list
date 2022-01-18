import {createToDo, updateToDo, deleteToDo, getUniqueProjects, filterToDos} from './toDos';
import {getToDos, setToDos, overwriteToDosArray} from './storage';
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

//create topNav element

var topNav = document.createElement('header');
topNav.id = 'topNav';
document.body.appendChild(topNav);

//create and add topNav children

//add website name
var title = document.createElement('a');
title.id = 'title';
title.className = 'topNavLink';
title.textContent = 'To Do List';
title.href = '/';

topNav.appendChild(title);

//create a function to add links to the topNav

var links = ['Home', 'Projects', 'About'];

function createTopNavLinks () {
    links.forEach(link=> {
        let anchor = document.createElement('a');
        anchor.id = link.toLowerCase();
        anchor.className = 'topNavLink';
        anchor.textContent = link;
    
        topNav.appendChild(anchor);    
    });
};

createTopNavLinks();

//create sideNav element
var sideNav = document.createElement('div');
sideNav.className = 'sideNav';
document.body.appendChild(sideNav);

var sideNavTitleDiv = document.createElement('div');
sideNavTitleDiv.id = 'sideNavTitleDiv';
sideNav.appendChild(sideNavTitleDiv);

var sideNavTitle = document.createElement('h2');
sideNavTitle.id = 'sideNavTitle';
sideNavTitle.textContent = 'Projects';
sideNavTitleDiv.appendChild(sideNavTitle);

//add project links to sidebar
    //get an array of unique projects
let uniqueProjects = getUniqueProjects(toDos);

uniqueProjects.forEach(project => {
    let projectLink = document.createElement('a');
    projectLink.className = 'projectLink';
    projectLink.id = project;
    projectLink.textContent = project;

    sideNav.appendChild(projectLink);
});

//create container element
var container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

//get tasks based on selected project
let selectedProject = 'testProject';


//add tasks as items in unordered list
const generateTaskList = function generateTaskList() {
    //select tasks from selected project
    let selectedToDos = filterToDos(toDos, selectedProject);
    console.log(selectedToDos)

    //clear container
    container.innerHTML = "";

    var projectList = document.createElement('ul');
    container.appendChild(projectList);
    
    selectedToDos.forEach(toDo => {
        let toDoListItem = document.createElement('li');
        projectList.appendChild(toDoListItem);
    
        //add check button to mark project complete
        let checkButtonDiv = document.createElement('div');
        toDoListItem.appendChild(checkButtonDiv);
    
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'checkBox';
    
        checkButtonDiv.appendChild(checkBox);
    
        // add task item div
        let taskItemDiv = document.createElement('div');
        taskItemDiv.className = 'taskItemDiv';
    
        toDoListItem.appendChild(taskItemDiv);
    
        //add task name to task item div
        let taskNameDiv = document.createElement('div');
        taskNameDiv.className = 'taskNameDiv';
        taskNameDiv.textContent = toDo.title;
    
        taskItemDiv.appendChild(taskNameDiv);
    
        //add task due date to task item div
        let taskDueDateDiv = document.createElement('div');
        taskDueDateDiv.className = 'taskDueDateDiv';
        taskDueDateDiv.textContent = '\uD83D\uDCC5' + ' ' + toDo.dueDate;
    
        taskItemDiv.appendChild(taskDueDateDiv);
    })

  };

generateTaskList();

//create footer element
var footer = document.createElement('footer');
footer.id = 'footer';
footer.textContent = 'This is a footer';
document.body.appendChild(footer);

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
        console.log(selectedProject)
        generateTaskList();
    };
});
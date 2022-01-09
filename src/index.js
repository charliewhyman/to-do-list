import {createToDo, updateToDo, deleteToDo} from './toDos';
import {getToDos, setToDos, overwriteToDosArray} from './storage';
//import {resetPage} from './ui'

import "./style.css";

//create array to store toDos
let toDos = [];

//testing
//create two test toDos
let testToDo = createToDo('testTitle','testProject','testDescription','testDueDate','testPriority');
let testToDo2 = createToDo('testTitle2','testProject2','testDescription2','testDueDate2','testPriority2')

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
updateToDo(toDos, 'testProject2', 'testTitle2','dueDate','01/01/2001');

//push the toDos array to localStorage
setToDos('toDos', toDos);

//overwrite the toDos array with the toDos in local storage
overwriteToDosArray(toDos);

//delete toDo
deleteToDo(toDos, 'testProject', 'testTitle');

//push the toDos array to localStorage
setToDos('toDos', toDos);

console.log(toDos);

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
        anchor.href = '#'+link;
    
        topNav.appendChild(anchor);    
    });
};

createTopNavLinks();

//create container element
var container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

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
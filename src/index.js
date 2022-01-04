import createToDo from "./toDos";
import {getToDos, setToDos} from "./storage";

//create array to store toDos
let toDos = [];

//create a test toDo and log
let testToDo = createToDo('testTitle','testDescription','dueDate','priority')
console.log(testToDo)

//add the new toDo to the toDos array
toDos.push(testToDo);

//push the toDos array to localStorage
setToDos('toDos', toDos);

//retrieve the stringified toDos object from localStorage and print
let retrievedToDos = getToDos('toDos');
console.log(retrievedToDos);
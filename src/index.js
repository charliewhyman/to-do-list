import {createToDo, updateToDo} from "./toDos";
import {getToDos, setToDos, overwriteToDosArray} from "./storage";

//create array to store toDos
let toDos = [];

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

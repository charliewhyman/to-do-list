//this module handles creating/modifying/removing to-do tasks (changes are made to the toDos object, which is then pushed to localStorage by the storage module)
//done is a boolean key (task complete = true, task incomplete = false)
const createToDo= (title, project, description, dueDate, priority, done) => {
    return { title, project, description, dueDate, priority, done};
  };

//this function allows the user to update a toDo property
const updateToDo = function updateToDo(array, projectName, toDoName, propertyName, newValue) {
  //find index of matching toDo, based on the project and toDo names
  let foundIndex = array.findIndex(toDo => toDo.title === toDoName && toDo.project === projectName)
  let foundObject = array[foundIndex];

  foundObject[propertyName] = newValue;
};

//this function allows the user to filter tasks based on the selected project
const filterToDos = function updateToDo(array, projectName) {
  let result = array.filter(obj => {
    return obj.project === projectName
  });
  return result;
};

//this function returns a toDo matching the project and task name
const returnToDo = function returnToDo(array, projectName, toDoName) {
  //find index of matching toDo, based on the project and toDo names
  let foundObjectIndex = array.findIndex((obj => (obj.project == projectName && obj.title == toDoName)));

  return array[foundObjectIndex];
};

//this function allows the user to delete a toDo
const deleteToDo = function deleteToDo(array, projectName, toDoName) {
  //find index of matching toDo, based on the project and toDo names
  let foundObjectIndex = array.findIndex((obj => (obj.project == projectName && obj.title == toDoName)));

  //remove object from array 
  if (foundObjectIndex > -1) {
    array.splice(foundObjectIndex, 1);
  }
};

const getUniqueProjects = function getUniqueProjects(array) {
  //get the unique project values from the array
  let uniqueProjects = [...new Set(array.map(item => item.project))];
  return uniqueProjects;
};

export {createToDo, updateToDo, returnToDo, deleteToDo, getUniqueProjects, filterToDos};
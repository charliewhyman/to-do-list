//this module handles creating/modifying/removing to-do tasks (changes are made to the toDos object, which is then pushed to localStorage by the storage module)
const createToDo= (title, project, description, dueDate, priority) => {
    return { title, project, description, dueDate, priority };
  };

//this function allows the user to update a toDo property
const updateToDo = function updateToDo(array, projectName, toDoName, propertyName, newValue) {
  //find index of matching toDo, based on the project and toDo names
  let foundObjectIndex = array.findIndex((obj => (obj.project == projectName && obj.title == toDoName)));

  //update object in array 
  array[foundObjectIndex].propertyName = newValue;
};

//this function allows the user to delete a toDo
const deleteToDo = function deleteToDo(array, projectName, toDoName) {
  //find index of matching toDo, based on the project and toDo names
  let foundObjectIndex = array.findIndex((obj => (obj.project == projectName && obj.title == toDoName)));

  //remove object from array 
  if (foundObjectIndex > -1) {
    array.splice(foundObjectIndex, 1);
  }};

export {createToDo, updateToDo, deleteToDo};
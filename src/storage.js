//this module handles the getting/setting of the toDos object in localStorage, using the Web Storage API

//this function attempts to retrieve the stringified object from local Storage
const getToDos = function getToDos(objectName) {
    //try retrieving stringified object
    return localStorage.getItem(objectName);
};

//this function updates the object stored in localStorage with the new stringified array
const setToDos = function setToDos(objectName, array) {
    localStorage.setItem(objectName, JSON.stringify(array));
};

//this functions saves the data from localStorage to the local toDo array
const overwriteToDosArray = function overwriteToDosArray(array, objectName) {
    let localStorageObject = getToDos(objectName);
    let parsedObject = JSON.parse(localStorageObject);

    //assign the parsed localStorage object to the destination object
    Object.assign(array, parsedObject);
};

export {getToDos, setToDos, overwriteToDosArray};

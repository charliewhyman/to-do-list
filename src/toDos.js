//this module handles creating/modifying/removing to-do tasks (changes are made to the toDos object, which is then pushed to localStorage by the storage module)

const createToDo= (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
  };
  
export default createToDo;
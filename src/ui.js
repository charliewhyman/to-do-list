const createBaseElements = function createBaseElements() {
    
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

    //create sideNav element
    var sideNav = document.createElement('div');
    sideNav.className = 'sideNav';
    sideNav.id = 'sideNav';
    document.body.appendChild(sideNav);

    var sideNavTitleDiv = document.createElement('div');
    sideNavTitleDiv.id = 'sideNavTitleDiv';
    sideNav.appendChild(sideNavTitleDiv);

    var sideNavTitle = document.createElement('h2');
    sideNavTitle.id = 'sideNavTitle';
    sideNavTitle.textContent = 'Projects';
    sideNavTitleDiv.appendChild(sideNavTitle);

    var sideNavContainer = document.createElement('div');
    sideNavContainer.id = 'sideNavContainer';
    sideNavContainer.className = 'container';
    sideNav.appendChild(sideNavContainer);

    var sideNavButtonDiv = document.createElement('div');
    sideNavButtonDiv.id = 'sideNavButtonDiv';
    sideNavTitleDiv.appendChild(sideNavButtonDiv);

    var addProjectButton = document.createElement('button');
    addProjectButton.id = 'addProjectButton';
    addProjectButton.textContent = 'Add project';
    sideNavButtonDiv.appendChild(addProjectButton);

    //create container element
    var taskContainer = document.createElement('div');
    taskContainer.id = 'taskContainer';
    document.body.appendChild(taskContainer);
};

//add tasks as items in unordered list
const generateTaskList = function generateTaskList(array) {

    //clear container
    taskContainer.innerHTML = '';

    //add 'add task' button
    var addTaskButton = document.createElement('button');
    addTaskButton.id = 'addTaskButton';
    addTaskButton.textContent = 'Add task';
    taskContainer.appendChild(addTaskButton);

    //add task list
    var projectList = document.createElement('ul');
    projectList.id = 'projectList';
    taskContainer.appendChild(projectList);
    
    array.forEach(toDo => {
        let toDoListItem = document.createElement('li');
        toDoListItem.id = 'listItem' + array.indexOf(toDo);
        toDoListItem.dataset.title = toDo.title;
        toDoListItem.dataset.description = toDo.description;
        toDoListItem.dataset.dueDate = toDo.dueDate;
        toDoListItem.dataset.priority = toDo.priority;
        toDoListItem.dataset.done = toDo.done;

        if (toDo.done === true) {
            toDoListItem.className = 'listItemStrikethrough';
        } else {
            toDoListItem.className = 'listItem';
        };

        projectList.appendChild(toDoListItem);
    
        //add check button to mark project complete  
        let checkBox = document.createElement('input');
        checkBox.type = 'checkBox';
        checkBox.className = 'doneCheckBox';
        checkBox.id = 'doneCheckBox'+array.indexOf(toDo);
        checkBox.dataset.project = toDo.project;
        checkBox.dataset.title = toDo.title;
        checkBox.checked = toDo.done;
    
        toDoListItem.appendChild(checkBox);

        //add task priority
        let taskPriorityDiv = document.createElement('div');
        taskPriorityDiv.className = 'taskItem';
        taskPriorityDiv.id = 'taskPriority';
        taskPriorityDiv.textContent = toDo.priority;
 
        toDoListItem.appendChild(taskPriorityDiv);

        //add task name
        let taskNameDiv = document.createElement('div');
        taskNameDiv.className = 'taskItem';
        taskNameDiv.id = 'taskName';
        taskNameDiv.textContent = toDo.title;
    
        toDoListItem.appendChild(taskNameDiv);

        //add task due date
        let taskDueDateDiv = document.createElement('div');
        taskDueDateDiv.className = 'taskItem';
        taskDueDateDiv.id = 'taskDueDate';
        taskDueDateDiv.textContent = toDo.dueDate;
    
        toDoListItem.appendChild(taskDueDateDiv);
    })
  };

//create a function to add project links to the sidebar
const addSideNavLinks = function addSideNavLinks(array) {

    //clear container
    sideNavContainer.innerHTML = '';

    array.forEach(project => {
        let projectLinkDiv = document.createElement('div');
        projectLinkDiv.className = 'projectLinkDiv';
        projectLinkDiv.id = 'projectLinkDiv'+array.indexOf(project);

        sideNavContainer.appendChild(projectLinkDiv);

        let projectLink = document.createElement('a');
        projectLink.className = 'projectLink';
        projectLink.id = 'projectLink'+array.indexOf(project);
        projectLink.dataset.project = project;
        projectLink.textContent = project;

        projectLinkDiv.appendChild(projectLink);
    });

    //create div for new project input
    let newProjectInputDiv = document.createElement('div');
    newProjectInputDiv.className = 'projectInputDivHide';
    newProjectInputDiv.id = 'newProjectInputDiv';

    sideNavContainer.appendChild(newProjectInputDiv);

    //create new project input
    let newProjectInput = document.createElement('input');
    newProjectInput.type = 'text';
    newProjectInput.className = 'projectLink';
    newProjectInput.id = 'newProjectInput';
    newProjectInput.defaultValue = 'New Project';

    newProjectInputDiv.appendChild(newProjectInput);

    //create new project submit button
    let newProjectSubmitDiv = document.createElement('div');
    newProjectSubmitDiv.id = 'newProjectSubmitDiv';

    let newProjectSubmitButton = document.createElement('input');
    newProjectSubmitButton.id = 'newProjectSubmitButton';
    newProjectSubmitButton.type = 'submit';
    newProjectSubmitButton.value = 'Submit';

    newProjectInputDiv.appendChild(newProjectSubmitDiv);
    newProjectSubmitDiv.appendChild(newProjectSubmitButton);
};

//create a function to generate the modal box form for editing task properties
const createModal = function createModal() {
    let modal = document.createElement('div');
    modal.id = 'modal';
    document.body.appendChild(modal);

    let modalContent = document.createElement('div');
    modalContent.id = 'modalContent';
    modal.appendChild(modalContent);

    let closeButton = document.createElement('span');
    closeButton.id = 'close';
    modalContent.appendChild(closeButton);

    let modalForm = document.createElement('form');
    modalForm.class = 'form';
    modalForm.id = 'modalForm';
    modalContent.appendChild(modalForm);

    let formHeading = document.createElement('h3');
    formHeading.id = 'formHeading';
    formHeading.textContent = 'Edit task';
    modalForm.appendChild(formHeading);
    
    let modalFormGrid = document.createElement('div');
    modalFormGrid.id = 'modalFormGrid'
    modalForm.appendChild(modalFormGrid);

    //create an array to store form labels and input pairs {label, input}
    let formOptions = [
        {label: 'Task name', input: 'title'},
        {label: 'Description', input: 'description'},
        {label: 'Due date', input: 'dueDate'},
    ];

    formOptions.forEach(option => {
        let formLabel = document.createElement('label');
        formLabel.className = 'formLabel';
        formLabel.id = option.input + 'Label';
        formLabel.textContent = option.label;

        let formInput = document.createElement('input');
        formInput.className = 'formInput';
        formInput.id = option.input + 'Input';
        formInput.textContent = option.input;
        formInput.required = true;

        modalFormGrid.appendChild(formLabel);
        modalFormGrid.appendChild(formInput);

    });

    //set due date input type as date picker
    let dueDateInput = document.getElementById('dueDateInput');
    dueDateInput.type = 'date';

    //create priority selector

        //create select label
    let prioritySelectLabel = document.createElement('label');
    prioritySelectLabel.htmlFor = 'prioritySelect';
    prioritySelectLabel.className = 'formLabel';
    prioritySelectLabel.id = 'prioritySelectLabel';
    prioritySelectLabel.textContent = 'Priority';

    modalFormGrid.appendChild(prioritySelectLabel);
    
    let prioritySelect = document.createElement('select');
    prioritySelect.className = 'select';
    prioritySelect.id = 'prioritySelect';

    modalFormGrid.appendChild(prioritySelect);

        //create array to store priority options
    let priorityOptions = ['Low', 'Medium', 'High'];
    priorityOptions.forEach(option => {
        let selectOption = document.createElement('option');
        selectOption.className = 'selectOption';
        selectOption.value = option;
        selectOption.textContent = option;

        prioritySelect.appendChild(selectOption);
    });

    //create submit/add task divs and buttons
    let formSubmitDiv = document.createElement('div');
    formSubmitDiv.id = 'formSubmitDiv';

    let formSubmitButton = document.createElement('input');
    formSubmitButton.id = 'formSubmitButton';
    formSubmitButton.type = 'submit';
    formSubmitButton.value = 'Save changes';

    modalForm.appendChild(formSubmitDiv);
    formSubmitDiv.appendChild(formSubmitButton);

    
    let formAddTaskDiv = document.createElement('div');
    formAddTaskDiv.id = 'formAddTaskDiv';
    //hide the element until the 'add task' button is pressed
    formAddTaskDiv.style.display = 'none';

    let formAddTaskButton = document.createElement('input');
    formAddTaskButton.id = 'formAddTaskButton';
    formAddTaskButton.type = 'submit';
    formAddTaskButton.value = 'Add task';

    //hide the element until the 'add task' button is pressed
    formAddTaskButton.style.display = 'none';
    
    modalForm.appendChild(formAddTaskDiv);
    formAddTaskDiv.appendChild(formAddTaskButton);
};

//create a function to highlight the selected project
const highlightProject = function highlightProject(selectedProject) {
    const projectLinks = document.querySelectorAll('.projectLink');

    projectLinks.forEach(function(projectLink) {
        projectLink.style.fontWeight = 'normal';
      if (projectLink.dataset.project === selectedProject) {
          projectLink.style.fontWeight = 'bold';
      }
    });
    
};

//create a function to strikethrough and check completed tasks

const checkCompletedProjects = function checkCompletedProjects() {
    document.querySelectorAll('.doneCheckBox').forEach(box => {
        if (box.parentElement.dataset.done === true) {
            box.checked == true;
        } else {
            box.checked == false;
        }
    })
};

export {createBaseElements, generateTaskList, addSideNavLinks, createModal, highlightProject, checkCompletedProjects};
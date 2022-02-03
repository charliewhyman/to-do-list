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

    //add links to the topNav

    var links = ['Home', 'About'];

    links.forEach(link=> {
        let anchor = document.createElement('a');
        anchor.id = link.toLowerCase();
        anchor.className = 'topNavLink';
        anchor.textContent = link;

        topNav.appendChild(anchor);    
    });

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

    //create container element
    var container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
};

//add tasks as items in unordered list
const generateTaskList = function generateTaskList(array) {

    //clear container
    container.innerHTML = "";

    var projectList = document.createElement('ul');
    container.appendChild(projectList);
    
    array.forEach(toDo => {
        let toDoListItem = document.createElement('li');
        toDoListItem.className = 'listItem';
        projectList.appendChild(toDoListItem);
    
        //add check button to mark project complete
        let checkBoxDiv = document.createElement('div');
        checkBoxDiv.id = 'checkBoxDiv'
        toDoListItem.appendChild(checkBoxDiv);
    
        let checkBox = document.createElement('input');
        checkBox.type = 'checkBox';
        checkBox.id = 'checkBox';
    
        checkBoxDiv.appendChild(checkBox);
    
        // add task item div
        let taskItemDiv = document.createElement('div');
        taskItemDiv.className = 'taskItemDiv';
    
        toDoListItem.appendChild(taskItemDiv);
    
        //add task name to task item div
        let taskNameDiv = document.createElement('div');
        taskNameDiv.className = 'taskItem';
        taskNameDiv.id = 'taskName';
        taskNameDiv.textContent = toDo.title;
    
        taskItemDiv.appendChild(taskNameDiv);
    
        //add task due date to task item div
        let taskDueDateDiv = document.createElement('div');
        taskDueDateDiv.className = 'taskItem';
        taskNameDiv.id = 'taskDueDate';
        taskDueDateDiv.textContent = '\uD83D\uDCC5' + ' ' + toDo.dueDate;
    
        taskItemDiv.appendChild(taskDueDateDiv);
    })

  };

//create a function to add project links to the sidebar
const addSideNavLinks = function addSideNavLinks(array) {

    array.forEach(project => {
        let projectLink = document.createElement('a');
        projectLink.className = 'projectLink';
        projectLink.id = project;
        projectLink.textContent = project;

        sideNav.appendChild(projectLink);
    })
};

//create a function to generate the modal box form for editing task properties
const createmodal = function createmodal() {
    let modal = document.createElement('div');
    modal.id = 'modal';
    document.body.appendChild(modal);

    let modalContent = document.createElement('div');
    modalContent.id = 'modalContent';
    modal.appendChild(modalContent);

    let closeButton = document.createElement('span');
    closeButton.id = 'close';
    closeButton.textContent = 'X';
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
        {label: 'Project', input: 'project'},
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

    //create submit div and button
    let formSubmitDiv = document.createElement('div');
    formSubmitDiv.id = 'formSubmitDiv';

    let formSubmitButton = document.createElement('input');
    formSubmitButton.id = 'formSubmitButton';
    formSubmitButton.type = 'submit';
    formSubmitButton.value = 'Submit';

    modalForm.appendChild(formSubmitDiv);
    formSubmitDiv.appendChild(formSubmitButton);
};

export {createBaseElements, generateTaskList, addSideNavLinks, createmodal};
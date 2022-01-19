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
    let popUpOverlay = document.createElement('div');
    popUpOverlay.id = 'popUpOverlay';
    document.body.appendChild(popUpOverlay);

    let popUpBox = document.createElement('div');
    popUpBox.id = 'popUpBox';
    document.body.appendChild(popUpBox);

    let box = document.createElement('div');
    box.id = 'box';
    popUpBox.appendChild(box);

    let closeModal = document.createElement('div');
    closeModal.id = 'closeModal';
    closeModal.textContent = 'Submit';
    closeModal.type = 'button';
    box.appendChild(closeModal);
};

export {createBaseElements, generateTaskList, addSideNavLinks, createmodal};
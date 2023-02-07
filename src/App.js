import './App.css';

function App() {
  return (
    <div className="App">
      <AppBody/>
    </div>
  );
}

function AppBody() {
  return ( 
      <div id='app_body'>
        <h1>TODO <span onClick={changeBrightness} id="brightness_icon" alt="sun icon"></span></h1>
        <div id='add_task_div'>
          <span id='add_task' onClick={addTask}><span className='check-icon' alt="check icon"  /></span>
          <input id="task_input" onKeyDown={addTask} name="task" type="text" placeholder='Enter a task...' />
        </div>

        <section id="tasks">
          <div id="task_list">
          </div>
        </section>
        <div id='task_menu'>
            <div>
              <span id='active-tasks'>0</span>
              <p>active task</p>
            </div>
            <p id='clear' onClick={clear}>clear all</p>
          </div>
      </div>
  );
}


// This code below let users type task and add it to the list
const taskArray = []; //the empty array to store tasks

const addTask = evt => {
  
  const taskInput    = document.querySelector("#task_input");
  const taskList     = document.querySelector("#task_list");  
  const activeTasks  = document.querySelector('#active-tasks');

  let enteredTask    = taskInput.value; //get the value of the text type in the task input field

  if (taskInput.value !== "" && evt.key === 'Enter') {
    taskArray.push(enteredTask);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    let storedTasks = JSON.parse(localStorage.getItem('tasks'));

    let taskP = document.createElement("p"); // creates a new p element
    for (let task of storedTasks) { 
      taskP.textContent = task; // Takes the entered task in the input field and adds it to the p element
    }
    taskList.appendChild(taskP); //appends the p tag to the tasklist div
    
    taskInput.value = ""; //clear task input value
    taskInput.placeholder = "Enter a task...";
    activeTasks.textContent = taskList.childElementCount;

  } else {
    taskInput.placeholder = "Type a task before adding to the list";
    taskInput.focus() //set the focus on the input field
  }
};

//function to change brightness and sun and moon icon
const changeBrightness = () => {
  const brightness  = document.querySelector("#brightness_icon");
  const app         = document.querySelector(".App");
  const tasksDiv    = document.querySelector("#add_task_div");
  const taskInput   = document.querySelector("#task_input");
  const taskSection = document.querySelector("#tasks");
  const taskMenu    = document.querySelector('#task_menu');
  
  brightness.classList.toggle('active'); // changes the brightness icon onlclick
  app.classList.toggle("light");  //changes brightness level on app div
  tasksDiv.classList.toggle("light"); //changes brightness on task div
  taskInput.classList.toggle("light"); //changes brightness on input field
  taskSection.classList.toggle("light"); //changes brightness on the task list section
  taskMenu.classList.toggle("light");
};


//clear tasks
const clear = () => {
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  const taskList     = document.querySelector("#task_list"); 

  if (storedTasks) {
    localStorage.removeItem('tasks');
  }

  //clear tasks from DOM
  for (let task of taskList.children) {
    task.remove();
    document.getElementById('active-tasks').textContent = 0;
  };
  
}


//functions to run on enter keydown
window.addEventListener('load', () => {
  // const taskInput = document.querySelector("#task_input");
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  const taskList     = document.querySelector("#task_list"); 


  if (storedTasks) {
    for (let task of storedTasks) {
      let pTag = document.createElement("p");
      pTag.textContent = task;
      taskList.appendChild(pTag)
    };
  };

  const activeTasks = document.querySelector('#active-tasks');
  let numberOfTasks = taskList.childElementCount;
  activeTasks.textContent = numberOfTasks;

})

export default App;

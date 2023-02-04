import './App.css';
import check_icon from './icon-check.svg';

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
          <span id='add_task' onClick={addTask}><img className='check-icon' src={check_icon} alt="check icon"/></span>
          <input id="task_input" name="task" type="text" placeholder='Enter a task...' />
        </div>

        <section id="tasks">
          <div id="task_list"></div>
        </section>
      </div>
  );
}

// This code below
// let users type task and add it to the list

const taskArray = []; //the empty array to store tasks

const addTask = () => {
  
  const taskInput    = document.querySelector("#task_input");
  const taskList     = document.querySelector("#task_list");  
  let enteredTask    = taskInput.value; //get the value of the text type in the task input field

  if (taskInput.value === "") {
    // taskInput.placeholder = "Please enter a task first";
    let promptValue = prompt('Please add a task to continue'); //promt the user to add a task
    taskInput.value = promptValue; //add the user's text from prompt to the input field
    taskInput.focus() //set the focus on the input field
  } else {
    taskArray.push(enteredTask);
    localStorage.setItem('tasks', JSON.stringify(taskArray))
    let storedTasks = JSON.parse(localStorage.getItem('tasks'));

    let taskP = document.createElement("p"); // creates a new p element
    for (let task of storedTasks) { 
      taskP.textContent = task; // Takes the entered task in the input field and adds it to the p element
    }
    taskList.appendChild(taskP); //appends the p tag to the tasklist div
    
    taskInput.value = ""; //clear task input value
    taskInput.placeholder = "Enter a task...";
  }
};

//function to change brightness and sun and moon icon
const changeBrightness = () => {
  const brightness   = document.querySelector("#brightness_icon");
  const app          = document.querySelector(".App");
  const tasksDiv     = document.querySelector("#add_task_div");
  const taskInput    = document.querySelector("#task_input");
  const taskSection  = document.querySelector("#tasks");
  
  brightness.classList.toggle('active'); // changes the brightness icon onlclick
  app.classList.toggle("light");  //changes brightness level on app div
  tasksDiv.classList.toggle("light"); //changes brightness on task div
  taskInput.classList.toggle("light"); //changes brightness on input field
  taskSection.classList.toggle("light"); //changes brightness on the task list section
};

window.addEventListener('load', () => {
  // const taskInput = document.querySelector("#task_input");
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  const taskList     = document.querySelector("#task_list"); 
  const taskContainer = document.querySelector('#tasks'); 

  if (storedTasks) {
    for (let task of storedTasks) {
      let pTag = document.createElement("p");
      pTag.textContent = task;
      taskList.appendChild(pTag)
    };
  };
})

export default App;

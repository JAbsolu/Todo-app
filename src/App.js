import './App.css';
import sun_icon from './icon-sun.svg';
import check_icon from './icon-check.svg';
import moon_icon from './icon-moon.svg';

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
        <h1>TODO <span><img src={sun_icon} onClick={changeBrightness} id="brightness_icon" alt="sun icon"/> </span></h1>
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

function addTask() {
  
  const taskInput    = document.querySelector("#task_input");
  const taskList     = document.querySelector("#task_list");  
  let enteredTask    = taskInput.value; //get the value of the text type in the task input field

  if (taskInput.value === "") {
    taskInput.placeholder = "Enter a task before adding to list";
    taskInput.focus()
  } else {
    let taskP = document.createElement("p");
    taskP.textContent = enteredTask;
    taskList.appendChild(taskP);

    let savedTasks = localStorage.TodoTasks || ""; // create a local storage for the tasks

    for (let task of taskList.children) {
      localStorage.TodoTasks = savedTasks.concat(task.textContent, "\n"); //add the task to the local storage
    }
    
    taskInput.value = ""; //clear task input value
    taskInput.placeholder = "Enter a task...";
  }

};

//function to change brightness and sun and moon icon
function changeBrightness() {
  const brightness   = document.querySelector("#brightness_icon");
  const app          = document.querySelector(".App");
  const tasksDiv     = document.querySelector("#add_task_div");
  const taskInput    = document.querySelector("#task_input");
  const taskSection  = document.querySelector("#tasks");
  
  
  if (brightness.src !== moon_icon) brightness.src = moon_icon
  else brightness.src = sun_icon;

  app.classList.toggle("light");
  tasksDiv.classList.toggle("light");
  taskInput.classList.toggle("light");
  taskSection.classList.toggle("light");

};



export default App;

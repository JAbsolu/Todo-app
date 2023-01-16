import './App.css';
import sun_icon from './icon-sun.svg';
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
        <h1>TODO <span><img src={sun_icon} alt="sun icon"/> </span></h1>
        <div id='add_task_div'>
          <span id='add_task' onClick={addTask}><img className='check-icon' src={check_icon} alt="check icon"/></span>
          <input id="task_input" name="task" type="text" placeholder='Enter a task' />
        </div>

        <section id="tasks">
          <div id="task_list"></div>
        </section>
      </div>
  );
}

function addTask() {
  
  const taskInput = document.querySelector("#task_input");
  const taskList  = document.querySelector("#task_list");

  if (taskInput.value !== "") {
    const newTask       = document.createElement("p"); //create a new p element
    newTask.textContent = taskInput.value; // add the inputed value to the p element
    const addedTask     = taskList.appendChild(newTask) // add the task to the list

    let saveTasks = localStorage.TodoTasks || ""; // create a local storage for the tasks
    localStorage.TodoTasks = saveTasks.concat(addedTask); //add the task to the local storage


    taskInput.value = "";
  } else {
    alert("please enter a task")
    taskInput.focus();
  }

};




export default App;

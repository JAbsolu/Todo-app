import React, { useRef } from "react";
import { Box, Typography, collapseClasses, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import Link from '@mui/material/Link';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import { themes, fontSizes } from "../../themes";
import desktopLight from '../../assets/bg-desktop-light.png';
import desktopDark from '../../assets/bg-desktop-dark.png';
import mobileLight from '../../assets/bg-mobile-light.jpg';
import mobileDark from '../../assets/bg-mobile-dark.jpg';
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const Body = () => {
    const [updatedTaskArray, setUpdatedTaskArray] = useState([]);
    const [completed, setCompletion] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false);
    const taskInputRef = useRef(null)
    const colordark = themes.dark;
    const colorwhite = themes.white;
    const lightGray = themes.lightGray;

     /**
     * Media quieries
     */
    const isWideScreen = useMediaQuery("(min-width:2000px)");
    const isMobileScreen = useMediaQuery("(max-width: 650px");
    const isDesktopScreen = useMediaQuery("(min-width:1000px)");

    useEffect(() => {
        // Fetch the tasks from local storage and update the state
        const storedTasks = JSON.parse(localStorage.getItem("Tasks"));
        if (storedTasks) {
            setUpdatedTaskArray(storedTasks);
        }
        //Focus on the task input filed
        taskInputRef.current.focus()

        //Get saved theme on local storage
        const is_dark = localStorage.getItem("Todo Dark Theme");
        if (is_dark === 'true') {
            setDarkTheme(true)
        }

    }, []); 

    /**
     * Add tasks functions
     */
    const add_task_on_enter = (evt) => {

        if (evt.key === 'Enter') {
            let newTask = evt.target.value;

            if (!localStorage.getItem("Tasks")) {
                // If it doesn't exist, create a new array and store it in localStorage
                const taskArray = [newTask];
                localStorage.setItem("Tasks", JSON.stringify(taskArray));
            } else {
                // If it exists, retrieve the array, push the new task, and update localStorage
                const taskArrayStr = localStorage.getItem("Tasks");
                const taskArray = JSON.parse(taskArrayStr);
                taskArray.push(newTask);
                localStorage.setItem("Tasks", JSON.stringify(taskArray));
            }
            window.location.reload();
        }
    }


    const add_task_by_click = () => {
        const taskInputVal = document.querySelector("#taskInput").value;

        // Check if "Tasks" key exists in localStorage
        if (!localStorage.getItem("Tasks")) {
            // If it doesn't exist, create a new array and store it in localStorage
            const taskArray = [taskInputVal];
            localStorage.setItem("Tasks", JSON.stringify(taskArray));
        } else {
            // If it exists, retrieve the array, push the new task, and update localStorage
            const taskArrayStr = localStorage.getItem("Tasks");
            const taskArray = JSON.parse(taskArrayStr);
            taskArray.push(taskInputVal);
            localStorage.setItem("Tasks", JSON.stringify(taskArray));
        }
        window.location.reload();
    }


    /**
     * Mark A task complete
     */

    const delete_task = (index) => {
        const updatedArray = [...updatedTaskArray];
        updatedArray.splice(index, 1);
        setUpdatedTaskArray(updatedArray);
        localStorage.setItem("Tasks", JSON.stringify(updatedArray))
    };

     /**
     * Clear all tasks function
     */

    const clear_all_tasks = () => {
        const updatedArray = [...updatedTaskArray]
        updatedArray.splice(0, updatedArray.length);
        setUpdatedTaskArray(updatedArray);
        localStorage.setItem("Tasks", JSON.stringify(updatedArray))
    }

    /**
     * Mark a task complete function
     */

    const markComplete = (index) => {
        // Get the current tasks array from localStorage
        const taskArrStr = localStorage.getItem("Tasks");
        const taskArr = JSON.parse(taskArrStr);
    };

    /**
     * Theme changing function
     */

    const toggle_theme = () => {
      if(darkTheme === false) {
        setDarkTheme(true)
        localStorage.setItem("Todo Dark Theme", true)
      } else {
        setDarkTheme(false)
        localStorage.setItem("Todo Dark Theme", false)
      }
    }


    return (
        <Box sx={{
            height: '100vh',
            maxWidth: '100vw',
            backgroundImage: darkTheme ? `url(${ isMobileScreen ? mobileDark : desktopDark })` : `url(${ isMobileScreen ? mobileLight : desktopLight })`,
            backgroundColor: darkTheme ? themes.darketst : null,
            backgroundRepeat: 'repeat-x',
            margin: '0',
            transition: '1.5s ease-in-out'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '0',
            }}>
                {/* THIS CONTAINER CONTAINS THE TITLE AND THE LIGHT/DARKMODE ICON */}
                <Box>
                    <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: isMobileScreen ? '92%' : isDesktopScreen ? '40rem' : '28rem',
                    margin: '4rem auto 1rem',
                }}>
                    <Typography variant='h2' sx={{ color: colorwhite, textAlign: 'center',fontSize: fontSizes.h2,fontWeight: 'bold',}}>
                        TODO 
                    </Typography>

                {/* CHANGE ICON BASE ON THEME MODE */}
                    <Box>
                        {darkTheme  === false ? (
                                <DarkModeIcon 
                                    onClick={() => toggle_theme(false)}
                                    sx={{
                                        color: colorwhite,
                                        fontSize: '2rem',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            transform: 'rotate(-2.5turn)',
                                            transition: '1s ease-in-out',
                                        }
                                    }}
                                />
                            ) : (
                                <LightModeIcon 
                                    onClick={() =>toggle_theme(true)}
                                    sx={{
                                        color: colorwhite,
                                        fontSize: '2rem',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            transform: 'rotate(1.5turn)',
                                            transition: '1s ease-in-out',
                                        }
                                    }}
                                />
                            )
                        }
                    </Box>
                {/* THEME ICONS CONTAINER CLOSED */}
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: isMobileScreen ? '92%' : isDesktopScreen ? '40rem' : '28rem',
                    margin: '2rem auto 1rem',
                    padding: '0.4rem ',
                    background: themes.dark,
                }}>
                    <input 
                        name='search' 
                        type="text" 
                        id='taskInput'
                        placeholder="Add task.."
                        ref={taskInputRef}
                        style={{
                            width: '95%',
                            margin: '0 auto',
                            fontSize: fontSizes.p,
                            padding: '0.5rem',
                            background: themes.dark,
                            color: lightGray,
                            border: 'none',
                        }}
                        sx={{ boxShadow: 2}}
                        onKeyDown={add_task_on_enter}
                    />  
                    <AddBoxIcon 
                        onClick={add_task_by_click}
                        sx={{
                            color: colorwhite, 
                            fontSize: '2rem',
                            '&:hover' : {
                                cursor: 'pointer'
                            }
                        }}
                    />
                </Box>
                    
                </Box>
                

                {/* THIS SECTION CONTAINS TASKS */}
                <Box sx={{
                    width: isMobileScreen ? '92%' : isDesktopScreen ? '40rem' : '28rem',
                    boxShadow: 1,
                    background: themes.dark,
                    minHeight: '10rem',
                    padding: '0.4rem',
                    margin: '0 auto',
                }}>
                    <ul style={{ margin: 0, padding: '0 0.25rem',}}>
                        {updatedTaskArray.map((task, index)=> (
                            <li id={index}
                                style={{
                                    color: colorwhite,
                                    listStyle: 'none',
                                    padding: '0.8rem .5rem',
                                    fontSize: '1.1rem',                                    
                                    margin: "0.4rem 0",
                                    background: '#2f3251',
                                    display: "flex",
                                    justifyContent: "space-between",
                                    textDecoration: completed ? 'line-through' : '',
                                }}
                            >
                                <CheckBoxIcon onClick={(() => markComplete(index)) }sx={{ marginRight: '0.3rem', "&:hover":{cursor: 'pointer'} }}/>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'start', width: '100%'}}>
                                    {task}
                                </Box>
                                <CloseIcon onClick={() => delete_task(index)} className="close-icon" sx={{ "&:hover":{cursor: 'pointer'}}}/>
                            </li>
                        ))}
                    </ul>

                    {/* Task area footer */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'end',
                            minWidth: '100%',
                            paddingBottom: '0',
                        }}
                    >
                        {   
                            updatedTaskArray.length > 1 ? (
                                <ul style={{
                                    listStyle: 'none',
                                    color: lightGray,
                                    display: 'inline-flex',
                                    paddingBottom: '0',
                                    margin: '0',
                                }}>
                                 <Typography
                                      sx={{
                                            color: lightGray,
                                            p: '0.8rem 0.2rem 0',
                                            textTransform: 'none',
                                            marginRight: '2rem',
                                        }}
                                    >
                                        Number of tasks: {updatedTaskArray.length}
                                    </Typography>
                                    <Link 
                                        href='#'
                                        onClick={clear_all_tasks}
                                        sx={{
                                            color: lightGray,
                                            p: '1rem 0.2rem 0',
                                            margin: '0',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Clear tasks
                                    </Link>
                                </ul>
                            ) : (
                                 null
                            )
                        }
                    </Box>
                    
                </Box>
            </Box>
            
           
            
        </Box>
    )
}

export default Body;
import React, { useRef } from "react";
import { Box, Typography, collapseClasses, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import { themes, fontSizes } from "../../themes";
import desktopDark from '../../assets/bg-desktop-light.png';
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
        taskInputRef.current.focus()
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

    const markComplete = (index) => {
        // Get the current tasks array from localStorage
        const taskArrStr = localStorage.getItem("Tasks");
        const taskArr = JSON.parse(taskArrStr);
      };
      
      


    const changeTheme = () => {
        setDarkTheme(true);
        alert()
    }


    return (
        <Box sx={{
            height: '100vh',
            maxWidth: '100vw',
            backgroundImage: `url(${desktopDark})`,
            backgroundRepeat: 'repeat-x',
            margin: '0',
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
                    <LightModeIcon 
                        onHover={changeTheme}
                        sx={{
                            color: colorwhite,
                            fontSize: '2rem',
                            '&:hover': {
                                cursor: 'pointer',
                                transform: 'rotate(180deg)',
                            }
                        }}
                    />
                    <DarkModeIcon 
                        onHover={changeTheme}
                        sx={{
                            color: colorwhite,
                            display: darkTheme ? 'block' : 'none',
                        }}
                    />
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
                            background: colordark,
                            color: lightGray,
                            border: 'none',
                        }}
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
                

                {/* THIS SECTION CONTAINS TASKS INPUT AND TASKS */}
                <Box sx={{
                    width: isMobileScreen ? '92%' : isDesktopScreen ? '40rem' : '28rem',
                    background: colordark,
                    minHeight: '10rem',
                    padding: '0.4rem',
                    margin: '0 auto',
                }}>
                    <ul style={{ margin: 0, padding: '0 0.25rem',}}>
                        {updatedTaskArray.slice().reverse().map((task, index)=> (
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
                </Box>
            </Box>
            
           
            
        </Box>
    )
}

export default Body;
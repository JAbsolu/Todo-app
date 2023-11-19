import React from "react";
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
    const [task, setTask] = useState('')
    const [complete, markComplete] = useState(false)
    const tasksList = {};
    const [darkTheme, setDarkTheme] = useState(false);
    const colordark = themes.dark;
    const colorwhite = themes.white;
    const lightGray = themes.lightGray;

     /**
     * Media quieries
     */
    const isWideScreen = useMediaQuery("(min-width:2000px)");

    /**
     * Function to add new task
     */
    const onEnter = (evt) => {
        if (evt.key === 'Enter' ) {
            let newTask = evt.target.value;
            alert(newTask)
        }
    }

    // const tasks = localStorage.setItem("Tasks", [])
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
     * Get the list of task from the local storage
     */
    const updatedTaskArrayStr = localStorage.getItem("Tasks");
    const updatedTaskArray = JSON.parse(updatedTaskArrayStr);

    /**
     * Mark A task complete
     */

    const markTaskComplete = (evt) => {
        alert('ckicked')
    }

    const changeTheme = () => {
        setDarkTheme(true);
        alert()
    }

    // useEffect(() => {
    //     // if (localStorage.getItem("todo theme")) {
    //     //     alert(localStorage.getItem("todo theme"))
    //     // }
    // })


    return (
         /**
            * Main Container
         */
        <Box sx={{
            height: '100vh',
            backgroundImage: `url(${desktopDark})`,
            backgroundRepeat: 'repeat-x',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                {/* THIS CONTAINER CONTAINS THE TITLE AND THE LIGHT/DARKMODE ICON */}
                <Box>
                    <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '28rem',
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
                    width: '28rem',
                    margin: '2rem auto 1rem',
                    padding: '0.4rem ',
                    background: themes.dark,
                }}>
                    <input 
                        name='search' 
                        type="text" 
                        id='taskInput'
                        placeholder="Add task.."
                        style={{
                            width: '97%',
                            margin: '0 auto',
                            fontSize: fontSizes.p,
                            padding: '0.5rem',
                            background: colordark,
                            color: lightGray,
                            border: 'none',
                        }}
                        onKeyDown={onEnter}
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
                    width: '28rem',
                    background: colordark,
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
                                }}
                            >
                                <CheckBoxIcon onClick={markComplete} sx={{ marginRight: '0.3rem', "&:hover":{cursor: 'pointer'} }}/>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'start', width: '100%'}}>
                                    {task}
                                </Box>
                                <CloseIcon sx={{ "&:hover":{cursor: 'pointer'}}}/>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
            
           
            
        </Box>
    )
}

export default Body;
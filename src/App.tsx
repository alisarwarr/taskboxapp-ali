import React, { useState } from 'react';
//BIT-DEV
import TaskBox from '@bit/alisarwarr.taskbox.task-box';
//MATERIAL-UI
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//SWEETALERT2
import Swal from 'sweetalert2';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectTask, doneTask, pinnedOrUnpinnedTask, deleteTask, addTask } from './toolkit/taskSlice';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
    const [ snackbar, setSnackbar ] = useState(false);
    const [ snackSeverity, setsnackSeverity ] = useState('');
    const [ snackValue, setsnackValue ] = useState('');
    

    const tasks = useSelector(selectTask);
    const dispatch = useDispatch();


    const alert = async() => {
        const { value } = await Swal.fire({
            title: '<p id="design">Task Title</p>',
            text: 'What title for Task?',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'ADD',
            cancelButtonText: 'CANCEL',
        })

        if(value === "") {
            Swal.fire({
                icon: 'warning',
                title: '<p id="design">Cancelled</p>',
                text: 'You need to give Title!',
                confirmButtonText: 'Retry'
            })
        }
        else if (value === undefined){
            Swal.fire({
                icon: 'error',
                title: '<p id="design">Cancelled</p>',
                text: 'regristration cancelled!',
                confirmButtonText: 'Close'
            })    
        }
        else if (value) {
            setSnackbar(true);
            setsnackSeverity('Success');
            setsnackValue('Task Added Successfully!');
            //update REDUX-TOOLKIT
            dispatch(addTask(value));
        }
    }
    
    const screen530 = useMediaQuery('(max-width:530px)');
    let ifAllTaskAreDone = tasks.every((item) => item.done === true);

    return (
        <div className="app">
            {
                (tasks.length > 0 && !ifAllTaskAreDone) ? (
                    <>
                        <Typography variant="h2" className="heading">
                            <span className="badge bg-dark text-light"> TASKBOX </span>
                        </Typography>
                        
                        
                        {/* BIT-DEV reuseable component */}
                        <TaskBox
                            width={!screen530 ? "40%" : "75%"}
                            tasks={tasks}
                            doneOnClick={(id) => {
                                setSnackbar(true);
                                setsnackSeverity('info');
                                setsnackValue('Task Done Successfully!');
                                //update REDUX-TOOLKIT
                                dispatch(doneTask(id));
                            }}
                            pinnedOnClick={(id) => {
                                //update REDUX-TOOLKIT
                                dispatch(pinnedOrUnpinnedTask(id));
                            }}
                            deleteOnClick={(id) => {
                                setSnackbar(true);
                                setsnackSeverity('warning');
                                setsnackValue('Task Deleted Successfully!');
                                //update REDUX-TOOLKIT
                                dispatch(deleteTask(id));
                            }}
                        />
                        {/* BIT-DEV reuseable component */}
                        
            
                        <button onClick={() => alert()} type="button" className="btn btn-light text-dark shadow-none button">
                            ADD TASK
                        </button> 
                    </>
                ) : (
                    <div className="jumbotron shadow bg-white">
                        <h1 className="display-4">
                            {ifAllTaskAreDone && tasks.length !== 0 && `all Tasks are done!`}
                            {tasks.length === 0 && `all Tasks are deleted!`}
                        </h1>
                        <hr className="my-4"/>
                        <div>
                            <p className="lead"> Wanna add more Task again? </p>
                            <button onClick={() => alert()} type="button" className="btn btn-lg btn-danger shadow-none">
                                <span> CLICK NOW </span> <SendIcon/>
                            </button>
                        </div>
                    </div>
                )
            }

            <Snackbar open={snackbar} autoHideDuration={2000} onClose={() => setSnackbar(false)}>
                <Alert onClose={() => setSnackbar(false)} severity={snackSeverity}>
                    {snackValue}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default App;
import { Container } from '@material-ui/core'
import { AddCircle, DeleteForever, EditOutlined, Edit } from '@material-ui/icons';
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router';
import { auth } from './constants';



const Home = _=> {
    let tempUser;
    const navigate = useNavigate();
     
    

    const users = JSON.parse(localStorage.getItem('users'));
    const me = useSelector(state => state.login.user) || users.filter(user => user.loggedIn)[0];


    const user = users.filter(u => u.username === me.username && u.password === me.password || u.loggedIn)[0];
    const idx = users.indexOf(user);

    //Date
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    const today = new Date();


    const [task, setTask] = useState('');
    const [myTasks, setMyTasks] = useState(user.tasks);
    const [isEdit, setIsEdit] = useState(false);
    const [editID, setEditID] = useState(0);
    const [done, setDone] = useState([]);
    const [doTrue, setDoTrue] = useState(false) //To do and undo task

    const handleTaskChange = e => setTask(e.target.value);

    const addTask = e => {
        e.preventDefault();

        
        //Check if input is empty
        if(task === '') {
            alert('Input cannot be empty!!!. Please enter a task');

            return;
        }


        tempUser = {...user};
        users.splice(idx, 1);
 

        //Edit task
        if(isEdit){

            tempUser['tasks'].splice(editID, 1, task);

            console.log(tempUser);
            
            users.push(tempUser);

            //Store task in localStorage
            localStorage.setItem('users', JSON.stringify(users));

            //Add task to myTasks state
            myTasks.splice(editID, 1, task);
            setMyTasks(myTasks);

            setTask('');

            setIsEdit(false);

            

            return;
        }

        //Add Task
        if(tempUser.tasks.map(task => task.toUpperCase()).includes(task.toUpperCase()) || myTasks.map(task => task.toUpperCase()).includes(task.toUpperCase())) {
            alert('Task already exist');
            return;
        }








        tempUser['tasks'].push(task);

        users.push(tempUser);

        //Store task in localStorage
        localStorage.setItem('users', JSON.stringify(users));

        //Add task to myTasks state
        setMyTasks([...myTasks, task]);
        setTask('');
    }



    //Task action handler
    const onTaskAction = (action, id) => {
        if(action === "edit"){
            setTask(user.tasks[id]);

            setEditID(id);
            setIsEdit(true);

            

            return;
        }

        //Delete Action
        tempUser = {...user};

        //Remove task from localStorage
        users.splice(idx, 1);
        tempUser['tasks'].splice(id, 1);

        users.push(tempUser);

        //Store task in localStorage
        localStorage.setItem('users', JSON.stringify(users));

        //Remove task from myTasks state
        const tempTask = myTasks;
        tempTask.splice(id, 1);

        //Add task to myTasks state
        setMyTasks([...tempTask]);
        console.log(myTasks);

    }


    const toggleTaskStatus = id => {
        if(done.includes(id)){
            setDone([...done.filter(task => task !== id)]);
        } else {
            setDone([...done, id]);
        }
    }


    const signOut = _=> {
        auth.signOut(()=> {
            const confirmSignout = window.confirm('U dey sure 🤔?');
            if(!confirmSignout) return;

            //Set user as loggedOut
            const signed_user = users.filter(user => user.loggedIn)[0];

            //Remove user from users
            users.splice(users.indexOf(signed_user), 1);

            //Set logged status to false
            signed_user['loggedIn'] = false;
            
            users.push(signed_user);

            //Store task in localStorage
            localStorage.setItem('users', JSON.stringify(users));

            navigate('/');
        })

    }

    return (
        <Container>
            <div>
                <button className = "btn-std floatr" onClick={signOut}>Sign-Out</button>
                <div className = "clr"></div>
                <p className = "welcomeNote">Howdy {me.username}, Welcome!!!</p>
            </div>

            <div className = "dateSection">
                <p>{today.toLocaleDateString('en-US', options)}</p>
                <p className = "taskNumber">
                    Today's task ({myTasks.length})
                </p>
            </div>

            <div className = "todo-container">
                <ul>
                    {
                        myTasks.map((task, id)=> (
                            <li key={id} className={done.includes(id) ? "done" : ""}>
                                <div className="todo-label">
                                    <span className={done.includes(id) ? "check checked" : "check"} onClick={()=> toggleTaskStatus(id)} />
                                    <span className="text">{task}</span>
                                </div>
                                <div className="controls">
                                    {done.includes(id) ? null : <Edit onClick={()=> onTaskAction("edit", id)} />}
                                    <DeleteForever onClick={()=> onTaskAction("delete", id)} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <form className="todo-form" onSubmit={addTask}>
                    <input className="input-task" value={task} onChange={handleTaskChange} placeholder="Add a Todo..." />
                    <button className="btn" name="text" type="submit">
                        <span className="plus">
                            {
                                isEdit ? <EditOutlined />
                                : <AddCircle />
                            }
                        </span>
                    </button>
                </form>
            
        </Container>
    )
}

export default Home

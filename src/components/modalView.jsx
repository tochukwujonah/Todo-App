import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../redux-store/actions';

import { useNavigate } from 'react-router-dom';
import { auth } from '../screens/constants';


const ModalView = (props) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    let users;


    const handleValueChange = (e) => {
        if(e.target.type === 'text'){
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        } 
        
    }


    const formSubmit = (e)=> {
        e.preventDefault();

        auth.signIn(()=> {
            users = {username, password, loggedIn: true, tasks: []};

        if(localStorage.getItem('users')) {
            const allUsers = JSON.parse(localStorage.getItem('users'));
            const tempUser = users;
            users = [tempUser, ...allUsers];

            const checkUserExist = allUsers.filter(user => user.username.toUpperCase() === username.toUpperCase() && user.password ===  password);

            if(checkUserExist.length === 0){
                localStorage.setItem('users', JSON.stringify(users));
            } else {
                //If user exist
                const signed_user = allUsers.filter(user => user.username.toUpperCase() === username.toUpperCase() && user.password ===  password)[0];

                //Remove user from users
                allUsers.splice(allUsers.indexOf(signed_user), 1);

                //Set logged status to true
                signed_user['loggedIn'] = true;
                
                allUsers.push(signed_user);

                //Store task in localStorage
                localStorage.setItem('users', JSON.stringify(allUsers));
            }

            
        } else {
            localStorage.setItem('users', JSON.stringify([users]));
        }

        
        //send-loggedin-user
        const loggedInUser = JSON.parse(localStorage.getItem('users')).filter(user => (user.username === username) && (user.password === password))[0];
        dispatch(loginAction(loggedInUser));

        //Route to new page
        navigate('todo');

        
       

        setUsername('');
        setPassword('');
        })
    }

    const closeModal = _=> props.setOpenModal(false);

    return (
        <div className = {props.show ? "modalContainer show-modal" : "modalContainer"}>
        <Container>
            <span className="close" onClick={closeModal}>&times;</span>
            
                <form onSubmit={formSubmit} className = "form-container">
                    <h1 className = "form-group">Login</h1>
                    <br />
                    <div className = "form-group">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder = "Enter Username..." value={username} onChange={handleValueChange} required />
                    </div>

                    <div className = "form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder = "Enter Password..." value={password} onChange={handleValueChange} required />

                    </div>

                    <div className = "form-group">
                        <button>Login</button>     
                    </div>
                    
                </form>




            </Container>
            </div>
    )
}

export default ModalView
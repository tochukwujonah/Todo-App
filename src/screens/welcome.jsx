import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Disorganized from '../assets/images/Tiredman.png'
import ModalView from '../components/modalView';

const Welcome = ()=> {

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const [openModal, setOpenModal] = useState(false);

    const handleGetStarted = _=> setOpenModal(true);


    useEffect(()=> {


        //If there is a logged in user
        users.map(user => {
            if(user.loggedIn) user.loggedIn = false;  
        });

        
        //Store task in localStorage
        localStorage.setItem('users', JSON.stringify(users));

    }, []);


    return (
        <>
        
            <Container>
                <div className = "wrapper">
                    
                    <img src= {Disorganized} alt="A fellow who is disorganized"  className = "illustration"/>
                    <h3>Hey There, Welcome!!!</h3>
                    <p>Tired of having disorganized and unproductive days? <br /> Let’s help you stay organized</p>
                    
                    <button onClick={handleGetStarted} className="btn-std">Get Started</button>
                </div>
            </Container>


            {/* Modal section */}
            <ModalView show={openModal ? true : false} setOpenModal={setOpenModal} />
        
        </>
    )
}

export default Welcome

import React from "react";
import ErrorPage from '../assets/images/ErrorPage.png'
const Error = _=> {
    return (
        <div className = "errorPage">
        
            <h1>Oops 😫</h1>
            <img src= {ErrorPage} alt="404 error image" className = "illustrationErr" />
            <h5>This page is somewhere in the internet blackhole... I guess 🤭!!!</h5>

        </div>
    )
}


export default Error;
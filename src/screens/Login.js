import React from 'react'
import pinterestlogo from '../assets/pinterestLogo.png'
import './Login.css';
import { auth, provider } from "../firebase"
import {useStateValue} from "../StateProvider"


function Login() {
    const [state,dispatch]=useStateValue()
    const signIn = () => {
        //SingIN with Google
        auth.signInWithPopup(provider)
            .then(result => {
                //
            })
            .catch(error=>alert(error.message))
    }
    return (
        <div className="login_page">
            <div className="login">
                <div className="login_logo">
                    <img src={pinterestlogo} alt="pinterestlogo"></img>
                </div>
                <div className="login_container">
                    <h3>Te damos la bienvenida a Pinterest</h3>
                <button className="login_button" onClick={signIn}>Ingresa con Google</button>
                </div>
               
            </div>
        </div>
        
    )
}

export default Login

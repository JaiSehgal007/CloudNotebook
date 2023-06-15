import React from 'react'
import { useState } from 'react';
// import Alert from './Alert';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate= useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        // console.log(json)
        if(json.success){
            // save the auth token and redirect
            // console.log(json.authToken)
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged in Successfully","success")
            navigate("/");
        }else{
            props.showAlert("Invalid Details","danger")
        }
    }
    const onChange= (e)=>{
        // note that the "..." represents the spread operator
        // now the following syntax means that the properties in the setnote will remain, 
        // but the properties written after that shold be added or overwrited
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div className='mt-3'>
            <h2 style={{marginBottom:'3px'}}>Login to continue to Cloud Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={credentials.email} onChange={onChange} type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={credentials.password} onChange={onChange} name='password' type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
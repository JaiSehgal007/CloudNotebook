import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (credentials.cpassword !== credentials.password) {
            props.showAlert("Password and Confirm Password do not match", "danger")
            e.preventDefault();
        } else {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json)
            if (json.success) {
                // save the auth token and redirect

                localStorage.setItem('token', json.authToken);
                props.showAlert("Account Created Successfully", "success");
                navigate("/");
            } else {
                props.showAlert("Invalid Credentials", "danger")
            }
        }
    }
    const onChange = (e) => {
        // note that the "..." represents the spread operator
        // now the following syntax means that the properties in the setnote will remain, 
        // but the properties written after that shold be added or overwrited
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-2'>
            <h2 style={{marginBottom:'3px'}}>Create an account for Cloud Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input minLength={2} required type="text" name='name' className="form-control" onChange={onChange} id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input required type="email" name='email' onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input minLength={5} required type="password" onChange={onChange} name='password' className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input minLength={5} required type="password" onChange={onChange} name='cpassword' className="form-control" id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
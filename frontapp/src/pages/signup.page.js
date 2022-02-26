import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/user.service'
import React, { Component } from 'react';

const SignupPage = (props) => {

    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

    const onSignup = async () => {
        if (userName.length === 0) {
            alert('please enter a unique username')
        }
        else if (userEmail.length === 0) {
            alert('please enter Email')
        } else if (userPassword.length === 0) {
            alert('please enter Password')
        } else {
            const result = await signup(userEmail, userPassword, userName)
            console.log(result)
            if (result) {
                navigate('/signin')
            }
        }
    }

    return (
        <div    >
            <h1 className="header">Signup</h1>
            <div className="form">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        onChange={(e) => {
                            setuserEmail(e.target.value)
                        }}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        onChange={(e) => {
                            setuserPassword(e.target.value)
                        }}
                        type="userPassword"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <div>
                        Already have an account ? Signin <Link to="/signin">here</Link>
                    </div>
                    <button onClick={onSignup} className="btn btn-success">
                        Signup
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage

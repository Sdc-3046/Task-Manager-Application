import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../services/user.service'
import React from 'react';

const SigninPage = (props) => {
    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')

    const navigate = useNavigate()

    const onSignin = async () => {
        if (userEmail.length === 0) {
            alert('set email')
        } else if (userPassword.length === 0) {
            alert('set password')
        } else {
            const result = await signin(userEmail, userPassword)
            //console.log(userEmail)
            if (result) {
                const { token } = result

                sessionStorage['token'] = token
                sessionStorage['userEmail'] = userEmail

                navigate('/task-list')
            }
        }
    }

    return (
        <div>
            <h1 className="header">Signin</h1>
            <div className="form">
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
                        type="password"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <div>
                        Don't have an account ? Signup <Link to="/signup">here</Link>
                    </div>
                    <button onClick={onSignin} className="btn btn-success">
                        Signin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SigninPage

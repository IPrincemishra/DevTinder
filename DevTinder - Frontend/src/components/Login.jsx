import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("simran@gmail.com")
    const [password, setPassword] = useState("Simran@123")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {


        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, {
                withCredentials: true
            })

            dispatch(addUser(res.data))

            return navigate("/")
        } catch (err) {
            setError(err?.response?.data)
        }

    }


    return (
        <div className='flex justify-center my-10'>
            <div className="card card-dash bg-base-200 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="email"
                                value={emailId}
                                className="input"
                                placeholder="Type here"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                value={password}
                                className="input"
                                placeholder="Type here"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
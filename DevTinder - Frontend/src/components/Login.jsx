import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("@gmail.com")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [isLogin, setIsLogin] = useState(true)

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

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password
            }, {
                withCredentials: true
            })

            dispatch(addUser(res?.data?.data))
            return navigate("/profile")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='h-[81vh] flex justify-center items-center'>
            <div className='flex justify-center my-10'>
                <div className="card card-dash bg-base-200 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">{isLogin ? "Login" : "Sign up"}</h2>
                        <div>
                            {!isLogin && <>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input"
                                        placeholder="Type here"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input"
                                        placeholder="Type here"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </>}
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
                            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "Login" : "Sign up"}</button>
                        </div>
                        <p className='text-center my-2 cursor-pointer'
                            onClick={() => setIsLogin(!isLogin)}
                        >{isLogin ? "New User? Signup here" : "Existing User? Login here"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {



    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age || "")
    const [gender, setGender] = useState(user.gender || "")
    const [about, setAbout] = useState(user.about || "")
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [toast, setToast] = useState(false)


    const dispatch = useDispatch()

    const [error, setError] = useState("")

    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about }, {
                withCredentials: true
            })

            dispatch(addUser(res?.data?.data))
            setToast(true)

            setTimeout(() => {
                setToast(false)
            }, 3000);
        } catch (err) {
            setError(err?.message)
        }
    }

    return (
        <div className='flex items-center justify-center gap-5'>

            <div className='flex justify-center my-7'>
                <div className="card card-dash bg-base-200 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name : </legend>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name : </legend>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo Url : </legend>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age : </legend>
                                <input
                                    type="text"
                                    value={age}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender :</legend>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select"
                                >
                                    <option value="Select Gender" disabled>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Other</option>
                                </select>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About : </legend>
                                <textarea className="textarea h-24" placeholder="Bio"
                                    type="text"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                ></textarea>
                            </fieldset>
                        </div>
                        <p className='text-red-500'>{error}</p>
                        <div className="card-actions justify-center">
                            <button onClick={saveProfile} className="btn btn-primary" >Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />

            {
                toast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Your profile updated!</span>
                    </div>
                </div>
            }
        </div >
    );
};

export default EditProfile;
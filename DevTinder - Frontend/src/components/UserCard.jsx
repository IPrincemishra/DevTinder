import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user = {} }) => {

    const { firstName, lastName, photoUrl, age, gender, about, _id } = user
    const dispatch = useDispatch()

    const handleSendRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, { status, _id }, { withCredentials: true })


            dispatch(removeUserFromFeed(_id))
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    }

    return (
        <div className="max-w-sm w-72 rounded-xl min-h-40 max-h-[450px] flex-wrap bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <figure className="relative h-56 w-full overflow-hidden">
                <img
                    src={photoUrl}
                    alt={`${firstName}'s profile`}
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-xs font-medium text-gray-800 shadow">
                    {age && gender && `${age}, ${gender}`}
                </div>
            </figure>
            <div className="p-5 flex flex-col justify-evenly">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                        <img
                            src={photoUrl}
                            alt={`${firstName} avatar`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{firstName} {lastName}</h2>
                </div>
                <p className="mb-1 text-gray-600 line-clamp-3">{about}</p>
                <div className="flex gap-2 mt-4 justify-evenly">
                    <button
                        className="btn btn-ghost border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => handleSendRequest("ignored", _id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-primary rounded-full px-6 shadow hover:shadow-md transition"
                        onClick={() => handleSendRequest("interested", user._id)}
                    >Send Request</button>
                </div>
            </div>
        </div >

    );
};

export default UserCard;
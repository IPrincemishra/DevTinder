import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {

    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests)
    const [loading, setLoading] = useState(true);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                {
                    withCredentials: true
                })
            dispatch(removeRequest(_id))
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true })

            // console.log(res?.data.data);
            dispatch(addRequest(res?.data?.data))
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])


    if (loading) return <div className='h-[69vh] flex my-10 items-center justify-center'><h1 className='text-2xl'>Loading requests...</h1></div>;

    if (!requests || requests.length === 0) return <div className='h-[69vh] flex my-10 items-center justify-center'><h1 className='text-2xl'>No Requests Found!</h1></div >;

    return (
        <div className='flex flex-col items-center min-h-screen my-6 gap-5'>
            <h1 className='text-2xl mb-4'>Requests</h1>
            <div className='flex flex-wrap justify-center gap-5 w-full'>
                {
                    requests.map(request => {
                        const { firstName, lastName, photoUrl, about, _id } = request.fromUserId;

                        return <div key={_id} className="w-8/12 card card-side bg-base-100 shadow-sm shadow-amber-50 overflow-hidden">
                            <div className='6/12'>
                                <img src={photoUrl} alt={`${firstName}'s photo`} className='w-[200px] h-[200px] object-cover object-center' />
                            </div>
                            <div className="card-body w-6/12">
                                <h2 className="card-title">{firstName + " " + lastName}</h2>
                                <p>{about}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        type="button"
                                        className="flex items-center cursor-pointer gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
                                        onClick={() => reviewRequest("rejected", request._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Reject
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
                                        onClick={() => reviewRequest("accepted", request._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Requests;
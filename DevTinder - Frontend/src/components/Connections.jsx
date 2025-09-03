import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import UserCard from './UserCard';

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector(store => store.connections)

    const [loading, setLoading] = useState(false);

    const fetchConnections = async () => {
        setLoading(true);
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(res?.data?.data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchConnections()
    }, [])

    if (loading) return <div className='h-[69vh] flex my-10 items-center justify-center'><h1 className='text-2xl'>Loading connections...</h1></div>;

    if (!connections || connections.length === 0) return <div className='h-[69vh] flex my-10 items-center justify-center'><h1 className='text-2xl'>No Connections Found!</h1></div >;

    return (
        <div className='flex flex-col items-center min-h-screen my-6 gap-5'>
            <h1 className='text-2xl mb-4'>Your Connections</h1>
            <div className='flex flex-wrap justify-center gap-5 w-full'>
                {
                    connections.map(connection => (
                        <div key={connection._id} className="w-8/12 card card-side bg-base-100 shadow-sm shadow-amber-50 overflow-hidden">
                            <div className='6/12'>
                                <img src={connection.photoUrl} alt={`${connection.firstName}'s photo`} className='w-[200px] h-[200px] object-cover object-center' />
                            </div>
                            <div className="card-body w-6/12">
                                <h2 className="card-title">{connection.firstName + " " + connection.lastName}</h2>
                                <p>{connection.about}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

};

export default Connections;
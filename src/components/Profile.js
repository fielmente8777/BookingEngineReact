import React, { useContext, useEffect } from 'react';
import { FaUserLarge } from "react-icons/fa6";
import AuthContext from '../context/AuthProvider';
import "../style/Profile.css";
const Profile = () => {
    const {FetchUsersInfo,userInfo} = useContext(AuthContext)
    useEffect(()=>{
        FetchUsersInfo()
    },[])
    return (
        <div className='profile_container'>
            <div className='procontent'>
                <div className='profileicon'>
                    <FaUserLarge color='white' size={100} />
                </div>
                <div className='mt-3'>{userInfo?.Number}</div>

            </div>
            <div className='fo'>
                <input type='text' value={userInfo.Name} name='lastname' />
                <input type='text' value={userInfo.Email} name='firstname' />
                <div className='butoon'>
                    <button>SAVE</button>
                    <button>RESET</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
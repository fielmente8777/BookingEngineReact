import React from 'react'
import "../style/Profile.css"
import { FaUserLarge } from "react-icons/fa6";
const Profile = () => {
    return (
        <div className='profile_container'>
            <div className='procontent'>
                <div className='profileicon'>
                    <FaUserLarge color='white' size={100} />
                </div>
                <div className='mt-3'>9645789243</div>

            </div>
            <div className='fo'>
                <input type='text' value={""} name='firstname' />
                <input type='text' value={""} name='lastname' />
                <input type='email' value={""} name='email' />
                <div className='butoon'>
                    <button>SAVE</button>
                    <button>RESET</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
import axios from 'axios';
import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatProvider';

const UserlistItem = ({ user }) => {
    const { setSelectedChat, searchsidebar, setSearchsidebar } = useContext(ChatContext);

    const createAccessChat = async (userId) => {
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
            const { data } = await axios.post(`http://localhost:5000/api/v1/accessChat`, { userId }, config);
            setSelectedChat(data.chat);
            setSearchsidebar(!searchsidebar)
            alert(data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <button className="flex items-center px-2 py-1 gap-2 border-t-[1px] border-black last:border-b-[1px] w-full" onClick={() => createAccessChat(user._id)}>
            <img src={user.profile && user.profile.url} alt="User Profile" className='w-[3rem] h-[2.8rem] rounded-[50%] ' />
            <div className="w-full flex flex-col items-start">
                <h2 className='text-xl font-semibold'>{user.name}</h2>
                <h4 className='text-sm'>Email : {user.email}</h4>
            </div>
        </button>
    )
}

export default UserlistItem
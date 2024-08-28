import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatProvider';

const ChatlistItem = ({ chat }) => {
    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
    console.log(user);
    console.log(chat.users);

    const getSender = (loggedUser, allusers) => {
        return allusers[0]._id === loggedUser._id ? allusers[1] : allusers[0];
    }
    return (
        <button onClick={() => setSelectedChat(chat)} className={selectedChat && selectedChat._id === chat._id ? "flex items-center px-2 py-1 gap-2 border-t-[1px] border-black last:border-b-[1px] w-full bg-slate-200" : "flex items-center px-2 py-1 gap-2 border-t-[1px] border-black last:border-b-[1px] w-full"}>
            <img src={chat.isGroupChat ? "/profile.jpeg" : user && getSender(user, chat.users).profile ? getSender(user, chat.users).profile.url : "/profile.jpeg"} alt="User Profile" className='w-[3rem] h-[2.8rem] rounded-[50%] ' />
            <div className="w-full flex flex-col items-start">
                <h2 className='text-xl font-semibold'>{chat.isGroupChat ? chat.name : user && getSender(user, chat.users) && getSender(user, chat.users).name}</h2>
                <h4 className='text-sm'>Email : pravinavhad020@gmail.com</h4>
            </div>
        </button>
    )
}

export default ChatlistItem
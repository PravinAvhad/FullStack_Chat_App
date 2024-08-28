import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { ChatContext } from '../../Context/ChatProvider';
import axios from 'axios';
import ChatlistItem from '../chatlistitem/ChatlistItem';
import Chatsloader from '../loader/Chatsloader';

const ChatsPage = () => {
  const { selectedChat, chats, setChats, token } = useContext(ChatContext);
  // console.log(selectedChat);
  const [loading, setLoading] = useState(false);

  const fetchchats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
      const { data } = await axios.get(`http://localhost:5000/api/v1/getallchats`, config);
      setChats(data.Chats);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  console.log(chats);

  useEffect(() => {
    if (token) {
      fetchchats();
    }
  }, [token, selectedChat]);

  return (
    <div className="w-full h-[92.3vh] p-4 flex gap-4">
      <div className="bg-white w-[25%] h-full p-4">

        <div className="flex justify-between items-center mb-4">
          <h2 className='text-2xl font-bold'>My Chats</h2>
          <button className='bg-slate-200 flex items-center justify-center py-2 px-4 gap-2 rounded-[5px] hover:bg-slate-400'>
            <FontAwesomeIcon icon={faPlus} className='text-xl' />
            <h3 className='text-lg font-semibold'>New Group</h3>
          </button>
        </div>

        {loading ? (
          <div className="w-full overflow-y-auto">
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
            <Chatsloader />
          </div>
        ) : (
          <div className="w-full overflow-y-auto">
            {chats.length > 0 && (
              chats.map((chat) => (
                <ChatlistItem key={chat._id} chat={chat} />
              ))
            )}
          </div>)}
      </div>

      <div className="bg-white w-[75%] h-full">
        {/* Add content for the right section here */}
      </div>
    </div >
  )
}

export default ChatsPage
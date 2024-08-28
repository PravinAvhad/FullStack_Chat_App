import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [searchsidebar, setSearchsidebar] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getuserdetails = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/v2/me/profile', { withCredentials: true });
                console.log(data);
                setUser(data.user);
            } catch (error) {
                console.log(error);
            }
        }
        if (!token) {
            navigate("/");
        }
        if (token) {
            getuserdetails();
            navigate("/chats");
        }
    }, [token, navigate]);
    // console.log("User : ", user);

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, searchsidebar, setSearchsidebar, token }}>
            {children}
        </ChatContext.Provider>
    )
}


export default ChatProvider;
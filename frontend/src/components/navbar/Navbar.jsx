import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faBell, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons"
import UserlistItem from '../userlistitem/UserlistItem';
import axios from 'axios';
import Chatsloader from '../loader/Chatsloader';
import { ChatContext } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchRes, setSearchRes] = useState([]);
    const [profileSidebar, setProfileSidebar] = useState(false);
    const { searchsidebar, setSearchsidebar, setUser } = useContext(ChatContext);
    const navigate = useNavigate();
    // console.log(profileSidebar);
    const searchusers = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
            const { data } = await axios.get(`http://localhost:5000/api/v2/getusers?name=${search}`, config);
            setSearchRes(data.users);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const logout = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v2/logout`, { withCredentials: true });
            // console.log(data);
            setProfileSidebar(!profileSidebar);
            localStorage.removeItem("token");
            setUser(null);
            alert(data.message);
            navigate("/");
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    // console.log(searchRes);
    return (
        <>
            <div className="min-h-[3.5rem] bg-white px-4 py-1">
                <div className="flex justify-between items-center ">

                    <button type="button" className='pl-6 pr-8 py-2 flex items-center justify-evenly gap-4 text-lg rounded-[5px] hover:bg-slate-200' onClick={() => setSearchsidebar(!searchsidebar)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <p>Search</p>
                    </button>

                    <div className="text-2xl font-bold font-serif">CHAT WEB APP</div>

                    <div className="flex items-center gap-6 px-4">
                        <button className='text-2xl' onClick={() => alert("Working")}><FontAwesomeIcon icon={faBell} /></button>
                        <button onClick={() => setProfileSidebar(!profileSidebar)}>
                            <img src={"/Profile.jpeg"} alt={"Profile"} className='h-[2.2rem] rounded-[50%] hover:cursor-pointer' />
                        </button>
                    </div>
                </div>
            </div>
            {profileSidebar && (
                <div className="w-[10rem] bg-white absolute right-2 top-16 flex flex-col gap-2 p-2" onMouseLeave={() => setProfileSidebar(!profileSidebar)} >
                    <input type="button" value="My Profile" className=' w-full p-2  text-xl font-semibold hover:bg-slate-200' onClick={() => setProfileSidebar(!profileSidebar)} />
                    <button className=' w-full p-2 text-xl font-semibold flex items-center justify-around hover:bg-slate-200' onClick={() => logout()}>
                        <p>Log Out</p>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            )}

            {searchsidebar && (
                <div className="bg-red-400 absolute w-[20rem] h-[100vh] top-0 left-0 flex flex-col px-4 pt-2 pb-4 gap-4">

                    <div className="flex justify-between items-center">
                        <img src={"/chatlogo.png"} alt="App Logo" className='h-[2.4rem] bg-inherit' />
                        <button onClick={() => setSearchsidebar(!searchsidebar)} className='p-[2px] rounded-[5px] hover:bg-slate-200 flex items-center'>
                            <FontAwesomeIcon icon={faXmark} className='h-[1.8rem] w-[1.8rem] hover:cursor-pointer' />
                        </button>
                    </div>
                    <div className="border-b-2 border-black "></div>

                    <form onSubmit={searchusers} className='bg-slate-200 px-2 py-1 rounded-[5px] flex items-center gap-2'>
                        <input type="text" placeholder='Search'
                            value={search} onChange={(e) => setSearch(e.target.value)} required className='bg-inherit text-lg px-2 py-1 rounded-[5px] w-[85%] border-black' />
                        <button type="submit" className='h-[2rem] w-[2rem] text-xl rounded-[5px] hover:bg-slate-400 hover:cursor-pointer' disabled={!search ? true : false}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>

                    <div className="w-full overflow-y-auto">
                        {loading ? (
                            <>
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
                            </>) :
                            (
                                <>
                                    {searchRes.length > 0 ? (
                                        searchRes.map((user) => (
                                            <UserlistItem key={user._id} user={user} />
                                        ))
                                    ) : (<></>)}
                                </>
                            )}
                    </div>

                </div >)
            }
        </>
    )
}

export default Navbar
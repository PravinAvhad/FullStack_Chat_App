import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { loginUser } from '../../Actions/userAction';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [logindetails, setLogindetails] = useState({
        email: "",
        password: ""
    });
    const [visible, setVisible] = useState(false);
    const loginDataChange = (e) => {
        setLogindetails({ ...logindetails, [e.target.name]: e.target.value });
    }
    const login = (e) => {
        e.preventDefault();
        loginUser(logindetails, navigate);
    }
    return (
        <div className="mt-[10px] p-4">
            <form onSubmit={login} className='min-h-[18rem] flex flex-col gap-8 items-center justify-center'>
                <input type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={logindetails.email}
                    onChange={loginDataChange}
                    required className='p-2 bg-slate-100 text-xl font-semibold rounded-[5px] max-w-[500px] w-full shadow-md'
                />
                <div className="relative max-w-[500px] w-full">
                    <input type={visible ? "text" : "password"}
                        name='password'
                        required
                        placeholder="Enter Password"
                        value={logindetails.password}
                        onChange={loginDataChange} className='p-2 bg-slate-100 text-xl font-semibold rounded-[5px] w-full shadow-md' />
                    {visible ? (
                        <FontAwesomeIcon icon={faEyeSlash} className='absolute top-3.5 right-4 text-lg' onClick={() => setVisible(!visible)} />) : (
                        <FontAwesomeIcon icon={faEye} className='absolute top-3.5 right-4 text-lg' onClick={() => setVisible(!visible)} />)}
                </div>
                <button type="submit" className='bg-blue-300 px-10 py-2 text-2xl font-bold rounded-[10px] hover:scale-90'>Log In</button>
            </form>
        </div>
    )
}

export default Login
// Working
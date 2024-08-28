import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { registerUser } from '../../Actions/userAction';

const SignUp = () => {
    const [registerdetails, setRegisterdetails] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [profile, setProfile] = useState();
    const [profilePreview, setProfilePreview] = useState("/Profile.jpeg");
    const [signupvisible, setVisible] = useState(false);

    const registerDataChange = (e) => {
        if (e.target.name === "profile") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfile(reader.result);
                    setProfilePreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setRegisterdetails({ ...registerdetails, [e.target.name]: e.target.value });
        }
    }
    const register = (e) => {
        e.preventDefault();
        const { name, password, email } = registerdetails;
        registerUser({ name, email, password, profile });
    }
    return (
        <div className="mt-[10px] p-4">
            <form onSubmit={register} className='min-h-[18rem] flex flex-col gap-4 items-center justify-center'>

                <input type="text"
                    name='name'
                    required
                    placeholder="Enter Name"
                    value={registerdetails.name}
                    onChange={registerDataChange}
                    className="p-2 bg-slate-100 text-xl font-semibold rounded-[5px] max-w-[500px] w-full shadow-md" />

                <input type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={registerdetails.email}
                    onChange={registerDataChange}
                    required className="p-2 bg-slate-100 text-xl font-semibold rounded-[5px] max-w-[500px] w-full shadow-md"
                />

                <div className="relative max-w-[500px] w-full">
                    <input type={signupvisible ? "text" : "password"}
                        name='password'
                        required
                        placeholder="Enter Password"
                        value={registerdetails.password}
                        onChange={registerDataChange} className='p-2 bg-slate-100 text-xl font-semibold rounded-[5px] w-full shadow-md' />
                    {signupvisible ? (
                        <FontAwesomeIcon icon={faEyeSlash} className='absolute top-3.5 right-4 text-lg' onClick={() => setVisible(!signupvisible)} />) : (
                        <FontAwesomeIcon icon={faEye} className='absolute top-3.5 right-4 text-lg' onClick={() => setVisible(!signupvisible)} />)}
                </div>

                <label className='max-w-[500px] text-center w-full text-xl font-semibold'>Upload Profile *</label>
                <div id="uploadimg">
                    <img src={profilePreview} alt="Profile" />
                    <input type="file" accept='image/*' name="profile" onChange={registerDataChange} required />
                </div>

                <button type="submit" className='bg-blue-300 px-10 py-2 text-2xl font-bold rounded-[10px] hover:scale-90'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
// Working
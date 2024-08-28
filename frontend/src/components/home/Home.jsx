import React, { useState } from "react";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";

const Home = () => {
  const [rightside, setRightside] = useState(false);
  const login = () => {
    setRightside(!rightside);
  }
  const register = () => {
    setRightside(!rightside);
  }
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-8">
      <div className="bg-white w-1/2 p-4 text-center text-3xl font-bold rounded-[5px] shadow-2xl max-[1535px]:w-[60%] max-[1280px]:w-[70%] max-[768px]:w-[80%] max-[639px]:w-full">
        CHAT WEB APP
      </div>
      <div className="bg-white w-1/2 p-4 rounded-[5px] flex flex-col shadow-2xl max-[1535px]:w-[60%] max-[1280px]:w-[70%] max-[768px]:w-[80%] max-[639px]:w-full">
        <div className="flex gap-1 text-2xl font-semibold">
          <button onClick={login} disabled={!rightside ? true : false} className=" w-1/2 p-2">Log In</button>
          <button onClick={register} disabled={rightside ? true : false} className=" w-1/2 p-2 rounded-[10px]" >Sign Up</button>
        </div>
        {!rightside ? (
          <div className="bg-red-400 h-[.5rem] w-1/2 rounded-[5px]"></div>
        ) : (
          <div className="bg-red-400 h-[.5rem] w-1/2 rounded-[5px] self-end"></div>
        )}
        {!rightside ? (
          <Login />
        ) : (
          <SignUp />
        )}
      </div>
    </div>
  );
};

export default Home;

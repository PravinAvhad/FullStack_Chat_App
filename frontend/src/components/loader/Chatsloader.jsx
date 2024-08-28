import React from 'react'

const Chatsloader = () => {
    return (
        <div className="animate-pulse flex items-center px-2 py-1 gap-2 border-t-[1px] border-black last:border-b-[1px]">
            <div className="w-[3rem] h-[2.8rem] rounded-[50%] bg-slate-300"></div>
            <div className="w-full flex flex-col items-start gap-4">
                <div className='w-1/2 h-2 rounded-[10px] bg-slate-300'></div>
                <div className='w-full h-2 rounded-[10px] bg-slate-300'></div>
            </div>
        </div>
    )
}

export default Chatsloader
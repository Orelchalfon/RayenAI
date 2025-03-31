"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useState } from "react";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}
const Agent: FC<AgentProps> = ({ userName, userId, type }) => {
    const isSpeaking = true;
    const [callStatus, SetCallStatus] = useState<CallStatus>(CallStatus.ACTIVE)

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image src={`/ai-avatar.png`} alt="vapi" width={100} height={100} className="object-cover" />
                        {callStatus === 'ACTIVE' && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>
                <div className="card-border">
                    <div className="card-content">
                        <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className="rounded-full object-cover size-[12rem]" />
                        <h3>{userName}</h3>
                        <p className="text-sm text-gray-500">{userId}</p>
                        <p className="text-sm text-gray-500">{type}</p>
                    </div>

                </div>
            </div>
            <div className="w-full flex justify-center">
                {callStatus !== 'ACTIVE' && (
                    <button
                        className="relative btn-call"
                        onClick={() => SetCallStatus(CallStatus.ACTIVE)}
                    >
                        <span className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== 'CONNECTING' && "hidden")} />
                        <span>
                            {
                                callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '. . .'
                            }
                        </span>
                    </button>) || (
                        <button onClick={() => SetCallStatus(CallStatus.FINISHED)} className="btn-disconnect">
                            End
                        </button>)}

            </div>
        </>
    )
};

export default Agent;

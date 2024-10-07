import React from 'react'
import { TextGenerateEffect } from './ui/text-effect';

function About() {

    const year = new Date().getFullYear();

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen pt-20 overflow-hidden ">
            <div className="flex flex-col w-11/12 gap-14">
                <div className="flex flex-col justify-end w-11/12 leading-none tracking-tighter">
                    <h1 className="text-[2rem] sm:text-[3rem] md:text-[7rem] font-medium">About</h1>
                    <h1 className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem] font-black">Apex MUN'{year}</h1>
                </div>
                <TextGenerateEffect words={"Apex Model United Nations (MUN) is a prestigious conference designed to encourage debate and discussion on pressing global issues. Bringing together students from schools and colleges across the Delhi Circuit, the event simulates the workings of the United Nations, providing a dynamic platform for youth to hone essential skills such as diplomacy, public speaking, negotiation, and consensus-building. This initiative within the Delhi MUN circuit aims to empower young minds, equipping them with the tools to become thoughtful leaders and effective communicators."} />
            </div>
        </div>
    )
}

export default About
import React from 'react'
import { TextGenerateEffect } from './ui/text-effect';
import SparklesText from './ui/sparkles-text';

function About() {

    const year = new Date().getFullYear();

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen pt-20 overflow-hidden text-gray-700 bg-gradient-to-b from-white via-green-50 to-white">
            <div className="flex flex-col w-11/12 gap-14">
                <div className="flex flex-col items-center justify-end leading-none tracking-tighter">
                    <h1 className="text-[2rem] sm:text-[3rem] font-medium">About</h1>
                    <SparklesText className="text-[4rem] text-center sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem] font-black" text={`Apex MUN'${year}`} />
                </div>
                <TextGenerateEffect words={"Apex Model United Nations (MUN) is a prestigious conference designed to encourage debate and discussion on pressing global issues. Bringing together students from schools and colleges across the Delhi Circuit, the event simulates the workings of the United Nations, providing a dynamic platform for youth to hone essential skills such as diplomacy, public speaking, negotiation, and consensus-building. This initiative within the Delhi MUN circuit aims to empower young minds, equipping them with the tools to become thoughtful leaders and effective communicators."} />
            </div>
        </div>
    )
}

export default About
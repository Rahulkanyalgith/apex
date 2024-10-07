"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    useEffect(() => {
        animate("span", {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
        }, {
            duration: duration ? duration : 100,
            delay: stagger(0.1),
        });
    }, [scope.current]);

    const renderWords = () => {
        return (
            (<motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        (<motion.span
                            key={word + idx}
                            className="text-black opacity-0 dark:text-white"
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}>
                            {word}{" "}
                        </motion.span>)
                    );
                })}
            </motion.div>)
        );
    };

    return (
        (<div className={cn("", className)}>
            <div className="mt-4">
                <div
                    className="text-lg font-medium text-black capitalize md:text-2xl">
                    {renderWords()}
                </div>
            </div>
        </div>)
    );
};
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children
}) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.7, 0.9] : [1.05, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
    const scale = useTransform(scrollYProgress, [0, 100], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        (<div
            className="h-[80rem] lg:h-[120rem] w-full flex items-center justify-center relative p-2 md:p-2"
            ref={containerRef}>
            <div
                className="relative w-full"
                style={{
                    perspective: "600px",
                }}>
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>)
    );
};

export const Header = ({
    translate,
    titleComponent
}) => {
    return (
        (<motion.div
            style={{
                translateY: translate,
            }}
            className="w-full mx-auto text-center max-w-7xl div">
            {titleComponent}
        </motion.div>)
    );
};

export const Card = ({
    rotate,
    scale,
    children
}) => {
    return (
        (<motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="mx-auto h-fit max-w-7xl w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl">
            <div
                className="w-full h-full p-4 overflow-hidden bg-gray-100 rounded-2xl dark:bg-zinc-900 md:rounded-2xl">
                {children}
            </div>
        </motion.div>)
    );
};
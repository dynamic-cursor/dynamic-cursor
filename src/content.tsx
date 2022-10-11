import { motion } from "framer-motion";
import React from "react";

export default function Content({ hovering, setHovering }: { hovering: boolean, setHovering: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [hover, setHover] = React.useState(false);

    return (
        <>
            <button
                style={{
                    background: "transparent",
                    color: hover ? "white" : "white",
                    border: "none",
                    position: "relative",
                    paddingBottom: "5px",
                    fontSize: "4rem",
                    isolation: "isolate"
                }}
                onMouseOver={() => {
                    setHover(true);
                    setHovering(true);
                }}
                onMouseOut={() => {
                    setHover(false);
                    setHovering(false);
                }}
            >
                Test
                {hover && (
                    <motion.div layout layoutId="cursor" style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: "5px",
                        width: "100%",
                        height: "5px",
                        background: "white",
                        color: "black",
                        zIndex: -1,
                        borderRadius: "2px"
                    }} 
                    transition={{
                        duration: 0.1,
                        damping: 100,
                        stiffness: 100
                    }}
                />
            )}
            </button>
        </>
    )
}
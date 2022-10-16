import { motion, MotionConfigProps } from "framer-motion";
import React from "react";
import { useDynamicHover } from "./Context";

export const Underline = ({ tag, children, transition, underlineColor, ...properties }: {
    tag: string;
    underlineColor?: string;
    transition?: MotionConfigProps["transition"];
    style?: React.CSSProperties;
    children?: React.ReactNode;

}) => {

    const { hover, props } = useDynamicHover();
    
    if (properties.style?.position === undefined || properties.style?.position === "static") {
        properties.style = {
            ...properties.style,
            position: "relative",
        }
    }

    console.log(properties)


    return (
        React.createElement(
            tag, { ...properties, ...props }, (
                <>
                    {children}
                    {hover && (
                        <motion.div 
                            layout layoutId="dynamic-cursor" transition={transition}
                            style={{ 
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "2px",
                                borderRadius: "2px",
                                background: underlineColor ?? "white",
                            }}
                        />
                    )}
                </>
            )
        )
    )

}

export const Box = ({ tag, children, transition, color, bgColor, ...properties }: {
    tag: string;
    color?: (hover: boolean) => string;
    bgColor?: string;
    transition?: MotionConfigProps["transition"];
    style?: React.CSSProperties;
    children?: React.ReactNode;

}) => {

    const { hover, props } = useDynamicHover();

    if (properties.style?.position === undefined || properties.style?.position === "static") {
        properties.style = {
            ...properties.style,
            position: "relative",
        }
    }

    properties.style = {
        ...properties.style,
        isolation: "isolate",
        color: color?.(hover) ?? (hover ? "black": "white")
    }

    return (
        React.createElement(
            tag, { ...properties, ...props }, (
                <>
                    {children}
                    {hover && (
                        <motion.div
                            layout layoutId="dynamic-cursor" transition={transition}
                            style={{ 
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "2px",
                                zIndex: -1,
                                background: bgColor ?? "white",
                            }}
                        />
                    )}
                </>
            )
        )
    )

}
import React from "react";

export default function Content() {

    const [hover, setHover] = React.useState(false);

    return (
        <>
            <button
                style={{
                    background: "transparent",
                    color: "white",
                    border: "none",
                    position: "relative",
                    isolation: "isolate"
                }}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                Test
                {/* {hover && (

                )} */}
            </button>
        </>
    )
}
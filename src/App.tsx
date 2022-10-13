import { AnimateSharedLayout, motion } from 'framer-motion';
import React, { useState } from 'react';
import Content from './content';
import { DynamicCursorProvider, useDynamicHover } from './Context';

function App() {

  const { hover, props } = useDynamicHover()

  return (
    <>
      <a
        className="interact"
        style={{ color: hover ? "white" : "white", position: "relative", isolation: "isolate" }}
        {...props}
      >
        Lorem ipsum dolor sit
        {hover && (
          <motion.div layout layoutId="cursor" style={{
            position: "absolute",
            bottom: 0,
            left: -1,
            width: "100%",
            height: "1px",
            background: "white",
            zIndex: -1,
          }} />
        )}
      </a>
    </>
  )

}

export default App

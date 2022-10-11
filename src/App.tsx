import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react'

function App() {

  const cr = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener(() => {
      
    })
  },[])

  return (
    <div>
      <motion.div
        ref={cr}
        id="cursor"
        layout layoutId='cursor'
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "9999999999px",
          background: "white",
        }}
      >
        
      </motion.div>
    </div>
  )
}

export default App

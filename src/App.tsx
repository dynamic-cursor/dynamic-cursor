import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDynamicHover } from './Context';

function App() {

  const { hover, props } = useDynamicHover();

  return (
    <>
      <div
        className="tooltip"
        {...props}
      >
        Hover please!
        {hover && (
          <div className='tip'>
            <motion.div
              layout layoutId='cursor'
              style={{
                borderRadius: "5px"
              }}
              transition={{ duration: 0.1 }}
            >
              Test
            </motion.div>
          </div>
        )}
      </div>    
    </>
  )

}

export default App

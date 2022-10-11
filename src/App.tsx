import { motion, transform } from 'framer-motion';
import React from 'react';
import Content from './content';

function App() {

  const cr = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {

    function onMouseMove(e: MouseEvent) {
      if (cr.current) {
        cr.current.animate([
          {
            transform: `translate(${e.clientX - cr.current.clientWidth / 2}px, ${e.clientY - cr.current.clientWidth / 2}px)`
          }
        ], {
          fill: "forwards",
          duration: 500,
          easing: "ease-in-out"
        })
      }
    }

    document.addEventListener("mousemove", onMouseMove)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }

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
          position: "fixed",
          zIndex: "1000000",
          background: "white",
          pointerEvents: "none"
        }}
      />

      <Content />

    </div>
  )
}

export default App

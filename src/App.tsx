import { AnimateSharedLayout, motion } from 'framer-motion';
import React, { useState } from 'react';
import Content from './content';
import { DynamicCursorProvider, useDyanmicCursor } from './Context';

function App() {

  // const cr = React.useRef<HTMLDivElement>(null);
  // const menuOptions = React.useRef<HTMLDivElement>(null);

  // const [hovering, setHovering] = React.useState(false);
  // const [menu, setMenu] = React.useState(false);
  // const [hoveringOn, setHoveringOn] = React.useState<null | "link" | "video" | "button">(null);
  // const [currentSelected, setCurrentSelected] = React.useState<string | null>(null);
  
  // const _menuRef = React.useRef<boolean>();
  // const mousePos = React.useRef<{x: number, y: number}>({ x: 0, y: 0 });

  // React.useEffect(() => {

  //   if (menu) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   if (!menu) {
  //     setCurrentSelected(null);
  //     document.body.style.overflow = "auto";
  //   }

  //   if (!menu && cr.current && mousePos?.current) {
  //     cr.current.animate(
  //       [{
  //         transform: `translate(${mousePos.current.x - cr.current.clientWidth / 2}px, ${mousePos.current.y - cr.current.clientWidth / 2}px)`
  //       }],
  //       {
  //         fill: "forwards",
  //         duration: 500,
  //         easing: "ease-in-out"
  //       }
  //     )
  //   }
  // }, [menu])

  // React.useEffect(() => { _menuRef.current = menu }, [menu]);

  // React.useEffect(() => {

  //   function onMouseMove(e: MouseEvent) {

  //     mousePos.current = { x: e.clientX, y: e.clientY };

  //     if (_menuRef.current) {
  //       const distance: { [key:string]: number } = {};

  //       if (menuOptions.current) {
  //         menuOptions.current.childNodes.forEach((ch) => {
  //           const child = ch.childNodes[0] as HTMLDivElement;
  //           const rect = child.getBoundingClientRect();
  //           const x = e.clientX - rect.x;
  //           const y = e.clientY - rect.y;
  //           const d = Math.sqrt(x * x + y * y);
  //           distance[child.id] = d;
  //         })

  //         let arr = Object.values(distance);
  //         let min = Math.min(...arr);
          
  //         setCurrentSelected(Object.keys(distance).find((key) => distance[key] === min)!);
  //       }
  //     }

  //     if (cr.current && !hovering && _menuRef.current === false) {
        
  //       cr.current.animate(
  //         [{
  //           transform: `translate(${e.clientX - cr.current.clientWidth / 2}px, ${e.clientY - cr.current.clientWidth / 2}px)`
  //         }],
  //         {
  //           fill: "forwards",
  //           duration: 500,
  //           easing: "ease-in-out"
  //         }
  //       )
        
  //       // @ts-ignore
  //       const interactable = e?.target?.closest(".interact");

  //       if (interactable == null) setHoveringOn(null);
  //       else if (interactable?.tagName == "A") setHoveringOn("link");
  //       else if (interactable?.tagName == "VIDEO") setHoveringOn("video");
  //       else if (interactable?.tagName == "BUTTON") setHoveringOn("button");
  //     }
  //   }

  //   function keyPress(e: KeyboardEvent) {
  //     if (e.ctrlKey && e.shiftKey) setMenu(true);
  //   }
  //   function keyRelease(e: KeyboardEvent) {
  //     if (!(e.ctrlKey && e.shiftKey)) setMenu(false);
  //   }

  //   document.addEventListener("mousemove", onMouseMove)
  //   document.addEventListener("keydown", keyPress)
  //   document.addEventListener("keyup", keyRelease)
    
  //   return () => {
  //     document.removeEventListener("mousemove", onMouseMove)
  //     document.removeEventListener("keydown", keyPress)
  //     document.removeEventListener("keyup", keyRelease)
  //   }

  // }, [])

  // return (
  //   <div>
  //     {menu && (
  //       <div style={{
  //         height: "100vh",
  //         width: "100vw",
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         zIndex: 100,
  //         background: "rgba(0, 0, 0, 0.5)"
  //       }} />
  //     )}
  //     <AnimateSharedLayout>

  //       {(!hovering || menu) && (
  //         <motion.div
  //           id="cursor"
  //           ref={cr}
  //           layout layoutId='cursor'
  //           style={{
  //             width: !(hoveringOn || menu) ? "20px" : "50px",
  //             height: !(hoveringOn || menu) ? "20px" : "50px",
  //             borderRadius: "50%",
  //             display: "flex", justifyContent: "center", alignItems: "center",
  //             position: "fixed",
  //             zIndex: "1000000",
  //             background: "white",
  //             pointerEvents: "none",
  //             // opacity: hoveringOn == null ? 1 : 0.9,
  //             transition: "all 0.2s ease-in-out",
  //           }}
  //         >
  //           {menu && (
  //             <>
  //               <motion.div
  //                 initial={{ scale: 0, rotate: -180 }}
  //                 animate={{ scale: 1, rotate: 0 }}
  //                 style={{ position: "absolute", pointerEvents: "all", width: "100%", height: "100%" }}
  //               >
  //                 <div ref={menuOptions} className='circle'>

  //                   <div
  //                     style={{
  //                       position: "absolute",
  //                       width: "100%",
  //                       height: "100%",
  //                       rotate: `${360 * 1/5}deg`,
  //                     }}
  //                     >
  //                     <div style={{
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                       color: "white",
  //                     }} 
  //                       id="h-1"
  //                       className={currentSelected === "h-1" ? "selected" : ""}
  //                     >
  //                       v
  //                     </div>
  //                   </div>
  //                   <div
  //                     style={{
  //                       position: "absolute",
  //                       width: "100%",
  //                       height: "100%",
  //                       rotate: `${360 * 2/5}deg`,
  //                     }}
  //                   >
  //                     <div style={{
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                       color: "white",
  //                     }} id="h-2"
  //                       className={currentSelected === "h-2" ? "selected" : ""}
  //                     >
  //                       e
  //                     </div>
  //                   </div>
  //                   <div
  //                     style={{
  //                       position: "absolute",
  //                       width: "100%",
  //                       height: "100%",
  //                       rotate: `${360 * 3/5}deg`,
  //                     }}
  //                   >
  //                     <div style={{
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                       color: "white"
  //                     }} id="h-3"
  //                       className={currentSelected === "h-3" ? "selected" : ""}
  //                     >
  //                       a
  //                     </div>
  //                   </div>
  //                   <div
  //                     style={{
  //                       position: "absolute",
  //                       width: "100%",
  //                       height: "100%",
  //                       rotate: `${360 * 4/5}deg`,
  //                     }}
  //                   >
  //                     <div style={{
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                       color: "white"
  //                     }} id="h-4"
  //                       className={currentSelected === "h-4" ? "selected" : ""}
  //                     >
  //                       c
  //                     </div>
  //                   </div>
  //                   <div
  //                     style={{
  //                       position: "absolute",
  //                       width: "100%",
  //                       height: "100%",
  //                       rotate: `${360 * 5/5}deg`,
  //                     }}
  //                   >
  //                     <div style={{
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                       color: "white"
  //                     }} id="h-5"
  //                       className={currentSelected === "h-5" ? "selected" : ""}
  //                     >
  //                       b
  //                     </div>
  //                   </div>
  //                 </div>
  //               </motion.div>
  //             </>
  //           )}
  //           {!menu && (
  //             <>
  //               {hoveringOn === "link" && (
  //                 <svg width="1.5em" height="1.5em" fill="black" viewBox="0 0 24 24">
  //                   <path fill="currentColor" d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1a1 1 0 0 0 1-1Z" />
  //                 </svg>
  //               )}
  //               {hoveringOn === "button" && (
  //                 <svg width="1.5em" height="1.5em" viewBox="0 0 32 32">
  //                   <path fill="currentColor" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688l-.25-.219a2.968 2.968 0 0 0-4.188 0a2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094l.062.031l.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3c-.426 0-.82.117-1.188.281C23.578 9.981 22.395 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1c.555 0 1 .445 1 1v4h2v-4c0-.555.445-1 1-1c.555 0 1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1c.554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.094-8c-.445-.445-.445-.93 0-1.375c.446-.445.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" />
  //                 </svg>
  //               )}
  //               {hoveringOn === "video" && (
  //                 <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
  //                   <path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
  //                 </svg>
  //               )}
  //             </>
  //           )}
  //         </motion.div>
  //       )}

  //       <div
  //         style={{
  //           padding: "0", width: "max-content"
  //         }}
  //         onMouseOver={() => {
  //           setHovering(true);
  //         }}
  //         onMouseOut={() => {
  //           setHovering(false);
  //         }}
  //       >
  //         <Content hovering={hovering} setHovering={setHovering} />
  //         <Content hovering={hovering} setHovering={setHovering} />
  //         <Content hovering={hovering} setHovering={setHovering} />
  //         <Content hovering={hovering} setHovering={setHovering} />
  //       </div>

  //       <a href="https://lol.com" style={{ fontSize: "40px", color: 'white' }} className="interact">test</a>
  //       <button className='interact'>test</button>
  //       <video className='interact' src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>
  //       <p style={{ color: "white" }}>{JSON.stringify(menu)}, {currentSelected}</p>
  //     </AnimateSharedLayout>

  //   </div>
  // )

  const { dynamicHover } = useDyanmicCursor();
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    <>
      <AnimateSharedLayout>
        
      </AnimateSharedLayout>
      <DynamicCursorProvider menuOptions={[
        { icon: <>+</>, onClick: () => console.log("clicked") },
        { icon: <>+</>, onClick: () => console.log("clicked1") },
        { icon: <>+</>, onClick: () => console.log("clicked3") },
        { icon: <>+</>, onClick: () => console.log("clicked4") },
      ]}>
        
        <a onMouseOver={() => { setHover(true); dynamicHover(true) }} onMouseOut={() => { setHover(false); dynamicHover(false) }} style={{ fontSize: "100px", color: hover ? "black": "white", isolation: "isolate", position: "relative", marginTop: "10px" , padding: "10px 20px" }}>
          hello

          {hover && (
            <motion.div
              layout layoutId="cursor"
              style={{
                position: "absolute",
                top: 0, left: 0, zIndex: -1,
                width: "100%", height: "100%",
                backgroundColor: "white",
                borderRadius: "10px"
              }}
              transition={{
                duration: 0.1,
                damping: 100,
                stiffness: 100
              }}
            />
          )}
        </a>
        <a onMouseOver={() => { setHover1(true); dynamicHover(true) }} onMouseOut={() => { setHover1(false); dynamicHover(false) }} style={{ fontSize: "100px", color: hover1 ? "black": "white", isolation: "isolate", position: "relative", marginTop: "10px" , padding: "10px 20px" }}>
          hello

          {hover1 && (
            <motion.div
              layout layoutId="cursor"
              style={{
                position: "absolute",
                top: 0, left: 0, zIndex: -1,
                width: "100%", height: "100%",
                backgroundColor: "white",
                borderRadius: "10px"
              }}
              transition={{
                duration: 0.1,
                damping: 100,
                stiffness: 100
              }}
            />
          )}
        </a>
        <a onMouseOver={() => { setHover2(true); dynamicHover(true) }} onMouseOut={() => { setHover2(false); dynamicHover(false) }} style={{ fontSize: "100px", color: hover2 ? "black": "white", isolation: "isolate", position: "relative", marginTop: "10px" , padding: "10px 20px" }}>
          hello

          {hover2 && (
            <motion.div
              layout layoutId="cursor"
              style={{
                position: "absolute",
                top: 0, left: 0, zIndex: -1,
                width: "100%", height: "100%",
                backgroundColor: "white",
                borderRadius: "10px"
              }}
              transition={{
                duration: 0.1,
                damping: 100,
                stiffness: 100
              }}
            />
          )}
        </a>

        wow quiz!

      </DynamicCursorProvider>
    </>
  )

}

export default App

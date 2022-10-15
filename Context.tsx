import { motion } from "framer-motion";
import React from "react";

interface DynamicCursorValue {
	menuOn: boolean;
	hoveringOn: null | "link" | "video" | "button";
	dynamicHovering: boolean;
	dynamicHover: (hover: boolean) => void;
}

const DynamicCursor = React.createContext<DynamicCursorValue>({
	menuOn: false,
	hoveringOn: null,
	dynamicHovering: false,
	dynamicHover: () => { },
});

interface Props {
	children: React.ReactNode;
	menuOptions?: Array<{
		icon: React.ReactNode;
		onClick: () => void;
	}>;
}

export const DynamicCursorProvider = ({ children, menuOptions: menuOpts = [] }: Props) => {

	const cr = React.useRef<HTMLDivElement>(null);
	const menuOptions = React.useRef<HTMLDivElement>(null);

	const [hovering, setHovering] = React.useState(false);
	const [menu, setMenu] = React.useState(false);
	const [hoveringOn, setHoveringOn] = React.useState<null | "link" | "video" | "button">(null);
	const [currentSelected, setCurrentSelected] = React.useState<number | null>(null);

	const mousePos = React.useRef<{ x: number, y: number }>({ x: 0, y: 0 });
	const _cs = React.useRef<number | null>(null);
	const _menuRef = React.useRef<boolean>();
	const menuOff = React.useRef<boolean>(false);

	React.useEffect(() => {

		if (menu) {
			document.body.style.overflow = "hidden";
			document.body.style.pointerEvents = "none";
			document.body.style.userSelect = "none";
		}
		if (!menu) {
			setCurrentSelected(null);
			document.body.style.overflow = "auto";
			document.body.style.pointerEvents = "all";
			document.body.style.userSelect = "text";
		}

		if (!menu && cr.current && mousePos?.current) {
			cr.current.animate(
				[{
					transform: `translate(${mousePos.current.x - cr.current.clientWidth / 2}px, ${mousePos.current.y - cr.current.clientWidth / 2}px)`
				}],
				{
					fill: "forwards",
					duration: 500,
					easing: "ease-in-out"
				}
			)
		}
	}, [menu])

	React.useEffect(() => { _menuRef.current = menu; _cs.current = currentSelected; }, [menu, currentSelected]);

	React.useEffect(() => {

		function onMouseMove(e: MouseEvent) {

			mousePos.current = { x: e.clientX, y: e.clientY };

			if (_menuRef.current) {
				const distance: { [key: number]: number } = {};

				if (menuOptions.current) {
					menuOptions.current.childNodes.forEach((ch) => {
						const child = ch.childNodes[0] as HTMLDivElement;
						const rect = child.getBoundingClientRect();
						const x = e.clientX - rect.x;
						const y = e.clientY - rect.y;
						const d = Math.sqrt(x * x + y * y);
						distance[child.dataset["key"] as unknown as number] = d;
					})
					let arr = Object.values(distance);
					let min = Math.min(...arr);

					let index = arr.indexOf(min) + 1;

					setCurrentSelected(index);
				}
			}

			if (cr.current && !hovering && _menuRef.current === false) {

				cr.current.animate(
					[{
						transform: `translate(${e.clientX - cr.current.clientWidth / 2}px, ${e.clientY - cr.current.clientWidth / 2}px)`
					}],
					{
						fill: "forwards",
						duration: 500,
						easing: "ease-in-out"
					}
				)

				// @ts-ignore
				const interactable = e?.target?.closest(".interact");

				if (interactable == null) setHoveringOn(null);
				else if (interactable?.tagName == "A") setHoveringOn("link");
				else if (interactable?.tagName == "VIDEO") setHoveringOn("video");
				else if (interactable?.tagName == "BUTTON") setHoveringOn("button");
			}
		}

		function keyPress(e: KeyboardEvent) {
			if (menuOff.current) return
			if (e.ctrlKey && e.shiftKey) setMenu(true);
		}
		function keyRelease(e: KeyboardEvent) {
			menuOff.current = false;
			if (!(e.ctrlKey && e.shiftKey)) setMenu(false);
		}

		function onMouseDown() {

			if (_menuRef.current === true && _cs.current !== null) {
				menuOff.current = true;
				setMenu(false);
				menuOpts[_cs.current - 1]?.onClick();
			}
		}

		document.addEventListener("mousedown", onMouseDown)
		document.addEventListener("mousemove", onMouseMove)
		document.addEventListener("keydown", keyPress)
		document.addEventListener("keyup", keyRelease)

		return () => {
			document.removeEventListener("mousedown", onMouseDown)
			document.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("keydown", keyPress)
			document.removeEventListener("keyup", keyRelease)
		}

	}, [])

	return (
		<DynamicCursor.Provider value={{
			menuOn: menu,
			hoveringOn,
			dynamicHovering: hovering,
			dynamicHover: setHovering
		}}>
			<style>{`
                .dynamic-cursor {
                    border-radius: 50%;
                    position: fixed;
                    z-index: 10000;
                    background: white;
                    pointer-events: none;
                    top: 0;
                    left: 0;
                    transition: all 0.2s ease-in-out;
                  }
                  
                  .dynamic-menu-overlay {
                    height: 100vh;
                    width: 100vw;
                    position: fixed;
                    top: 0;
                    left: 0;
                    zIndex: 1000;
                    background: rgba(0, 0, 0, 0.5);
                  }
                  
                  .dynamic-cursor-menu {
                    position: absolute;
                    width: 400%;
                    height: 400%;
                    top: 50%;
                    left: 50%;
                  
                    z-index: -1;
                    border-radius: 50%;
                  
                    transform: translate(-50%, -50%);
                  }
                  
                  .dynamic-cursor-menu-ring > div {
                    position: absolute;
                    top: 0;
                    left: 50%;
                  
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: rgb(256, 256, 256, 0.1);
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    transition: scale, background-color 200ms ease-in-out;
                  }
                  
                  .dynamic-cursor-menu-ring:after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 50%;
                    height: 50%;
                    
                    transform: translate(-50%, -50%);
                    border: dashed 1px rgb(256, 256, 256, 0.05);
                  }
                  
                  .dynamic-cursor-menu-ring {
                    position: relative;
                  }
                  
                  .dynamic-cursor-menu-ring > div.selected {
                  
                    scale: 1.2;
                    background-color: rgb(256, 256, 256, 0.3);
                  
                  }
            `}</style>
			{(menu) && (
				<div className="dynamic-menu-overlay" />
			)}

			{(!hovering || menu) && (
				<motion.div
					id="cursor"
					ref={cr}
					layout layoutId='cursor'
					style={{
						width: !(hoveringOn || menu) ? "20px" : "50px",
						height: !(hoveringOn || menu) ? "20px" : "50px",
						borderRadius: "50%",
					}}
					className="dynamic-cursor"
				>
					{menu && (
						<>
							<motion.div
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								style={{ position: "absolute", userSelect: "none", width: "100%", height: "100%" }}
							>
								<div ref={menuOptions} className='dynamic-cursor-menu'>

									{menuOpts.map((opt, index) => (
										<div
											style={{
												position: "absolute",
												width: "100%",
												height: "100%",
												rotate: `${360 * ((index + 1) / menuOpts.length)}deg`,
											}}
											key={index + 1}
											className="dynamic-cursor-menu-ring"
										>
											<div style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												color: "white",
											}}
												key={index + 1}
												data-key={index + 1}
												className={currentSelected === (index + 1) ? "selected" : ""}
											>
												{opt.icon}
											</div>
										</div>
									))}
								</div>
							</motion.div>
						</>
					)}
					{!menu && (
						<>
							{hoveringOn === "link" && (
								<svg width="1.5em" height="1.5em" fill="black" viewBox="0 0 24 24">
									<path fill="currentColor" d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1a1 1 0 0 0 1-1Z" />
								</svg>
							)}
							{hoveringOn === "button" && (
								<svg width="1.5em" height="1.5em" viewBox="0 0 32 32">
									<path fill="currentColor" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688l-.25-.219a2.968 2.968 0 0 0-4.188 0a2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094l.062.031l.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3c-.426 0-.82.117-1.188.281C23.578 9.981 22.395 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1c.555 0 1 .445 1 1v4h2v-4c0-.555.445-1 1-1c.555 0 1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1c.554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.094-8c-.445-.445-.445-.93 0-1.375c.446-.445.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" />
								</svg>
							)}
							{hoveringOn === "video" && (
								<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
									<path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
								</svg>
							)}
						</>
					)}
				</motion.div>
			)}

			{children}

		</DynamicCursor.Provider>
	)
}

export const useDynamicHover = () => {
	
	const [hover, setHover] = React.useState(false);
	const { dynamicHover } = useDynamicCursor();

	const onMouseEnter = () => {
		setHover(true);
		dynamicHover(true);
	}

	const onMouseLeave = () => {
		setHover(false);
		dynamicHover(false);
	}

	return {
		hover, props: { onMouseEnter, onMouseLeave }
	}

}

export const useDynamicCursor = () => React.useContext(DynamicCursor);

export default DynamicCursor;
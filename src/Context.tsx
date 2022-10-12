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
	const [rightMenu, setRightMenu] = React.useState(false);
	const [hoveringOn, setHoveringOn] = React.useState<null | "link" | "video" | "button">(null);
	const [currentSelected, setCurrentSelected] = React.useState<number | null>(null);

	const mousePos = React.useRef<{ x: number, y: number }>({ x: 0, y: 0 });
	const _cs = React.useRef<number | null>(null);
	const _menuRef = React.useRef<boolean>();
	const menuOff = React.useRef<boolean>(false);
	const rightMenuOff = React.useRef<boolean>(false);
	const justTurnedRightMenuOff = React.useRef<boolean>(false);
	const [rightClickedOn, setRightClickedOn] = React.useState<null | { tag: string; selected: boolean, selection: string }>(null);

	React.useEffect(() => {

		if (menu) {
			document.body.style.overflow = "hidden";
			document.body.style.userSelect = "none";
		}
		if (!menu) {
			setCurrentSelected(null);
			document.body.style.overflow = "auto";
			document.body.style.userSelect = "all";
		}

		if (!menu && cr.current && mousePos?.current && rightMenuOff?.current) {
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
	}, [menu, rightMenu])

	React.useEffect(() => { _menuRef.current = menu; _cs.current = currentSelected; rightMenuOff.current = rightMenu }, [menu, currentSelected, rightMenu]);

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

			if (cr.current && !hovering && _menuRef.current === false && rightMenuOff.current === false) {

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
				menuOpts[_cs.current]?.onClick();
				menuOff.current = true;
				setMenu(false);
			}
		}

		function contextMenu(e: MouseEvent) {
			e.preventDefault();

			if (justTurnedRightMenuOff.current) {
				justTurnedRightMenuOff.current = false;
				return;
			}

			const selection = document.getSelection();
			const trgt = e.target;
			if (trgt) {
				const tag = (trgt as HTMLElement).tagName;

				setRightClickedOn({
					tag, selected: selection !== null,
					selection: selection?.toString() ?? ""
				})
			}

			setRightMenu(true);
		}

		document.addEventListener("contextmenu", contextMenu)
		document.addEventListener("mousedown", onMouseDown)
		document.addEventListener("mousemove", onMouseMove)
		document.addEventListener("keydown", keyPress)
		document.addEventListener("keyup", keyRelease)

		return () => {
			document.removeEventListener("contextmenu", contextMenu)
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
			{(menu || rightMenu) && (
				<div
					style={{
						height: "100vh",
						width: "100vw",
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: 100,
						background: rightMenu ? "transparent" : "rgba(0, 0, 0, 0.5)"
					}}
					onMouseDown={(e: any) => { setRightMenu(false); justTurnedRightMenuOff.current = e.button === 2 }}
				/>
			)}

			{(!hovering || menu) && (
				<motion.div
					id="cursor"
					ref={cr}
					layout layoutId='cursor'
					style={{
						width: rightMenu ? "max-content" : (!(hoveringOn || menu) ? "20px" : "50px"),
						height: rightMenu ? "max-content" : (!(hoveringOn || menu) ? "20px" : "50px"),
						borderRadius: "50%",
						display: "flex", justifyContent: "center", alignItems: "center",
						position: "fixed",
						zIndex: "1000000",
						background: !rightMenu ? "white": "",
						pointerEvents: rightMenu ? "all" : "none",
						transition: "all 0.2s ease-in-out",
					}}
				>
					{rightMenu && (
						<motion.div
							initial={{ width: "20px", height: "20px", borderRadius: "50%" }}
							animate={{ width: "max-content", height: "max-content", borderRadius: "5px" }}
							transition={{
								duration: 0.1
							}}
							className="dynamic-context-menu"
						>
							{rightClickedOn?.selected && (
								<div className="dynamic-context-menu-top-toolbar">
									<button
										onClick={() => {
											navigator.clipboard.writeText(rightClickedOn?.selection ?? "");
										}}
									>
										<svg width="1em" height="1em" viewBox="0 0 24 24">
											<path fill="currentColor" d="M19 19H8q-.825 0-1.412-.587Q6 17.825 6 17V3q0-.825.588-1.413Q7.175 1 8 1h6.175q.4 0 .763.15q.362.15.637.425l4.85 4.85q.275.275.425.637q.15.363.15.763V17q0 .825-.587 1.413Q19.825 19 19 19ZM4 23q-.825 0-1.412-.587Q2 21.825 2 21V8q0-.425.288-.713Q2.575 7 3 7t.713.287Q4 7.575 4 8v13h10q.425 0 .713.288q.287.287.287.712t-.287.712Q14.425 23 14 23ZM15 8h4l-5-5v4q0 .425.288.713Q14.575 8 15 8Z" />
										</svg>
									</button>
									<button
										onClick={() => {
											navigator.clipboard.writeText(rightClickedOn?.selection ?? "");
										}}
									>
										<svg width="1em" height="1em" viewBox="0 0 24 24">
											<path d="M13.753 2c1.158 0 2.11.875 2.234 2h1.763a2.25 2.25 0 0 1 2.245 2.096L20 6.25v6a.75.75 0 0 1-1.493.102l-.007-.102v-6a.75.75 0 0 0-.648-.743L17.75 5.5h-2.132c-.403.6-1.088.993-1.865.993h-3.506A2.244 2.244 0 0 1 8.382 5.5H6.25a.75.75 0 0 0-.743.648L5.5 6.25v13.505c0 .38.282.693.648.743l.204.013a.75.75 0 0 1-.102 1.494a2.25 2.25 0 0 1-2.245-2.096L4 19.755V6.25a2.25 2.25 0 0 1 2.096-2.245L6.25 4h1.763a2.247 2.247 0 0 1 2.234-2h3.506zm3.497 12.5h1a3.75 3.75 0 0 1 .202 7.495l-.199.005l-1 .005a.75.75 0 0 1-.108-1.493l.102-.007l1.003-.005a2.25 2.25 0 0 0 .154-4.495L18.25 16h-1a.75.75 0 0 1-.102-1.493l.102-.007h1h-1zm-5 0h1a.75.75 0 0 1 .102 1.493L13.25 16h-1a2.25 2.25 0 0 0-.154 4.495l.154.005h1a.75.75 0 0 1 .102 1.493L13.25 22h-1a3.75 3.75 0 0 1-.2-7.495l.2-.005h1h-1zm0 3h6a.75.75 0 0 1 .102 1.493L18.25 19h-6a.75.75 0 0 1-.102-1.493l.102-.007h6h-6zm1.503-14h-3.506a.747.747 0 0 0 0 1.493h3.506a.747.747 0 1 0 0-1.493z" fill="currentColor" fillRule="nonzero" />
										</svg>
									</button>
								</div>
							)}
						</motion.div>
					)}
					{menu && (
						<>
							<motion.div
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								style={{ position: "absolute", userSelect: "none" , width: "100%", height: "100%" }}
							>
								<div ref={menuOptions} className='circle'>

									{menuOpts.map((opt, index) => (
										<div
											style={{
												position: "absolute",
												width: "100%",
												height: "100%",
												rotate: `${360 * ((index + 1) / menuOpts.length)}deg`,
											}}
											key={index + 1}
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

export const useDyanmicCursor = () => React.useContext(DynamicCursor);

export default DynamicCursor;
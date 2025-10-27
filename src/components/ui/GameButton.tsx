import { FONT_STYLES } from "../../constants/gameLayout";

interface GameButtonProps {
	onClick: () => void;
	children: React.ReactNode;
	padding?: string;
	fontSize?: string;
	borderRadius?: string;
	boxShadow?: string;
}

export function GameButton({
	onClick,
	children,
	padding = "20px 60px",
	fontSize = "32px",
	borderRadius = "10px",
	boxShadow = "6px 6px 0px black",
}: GameButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				padding,
				fontSize,
				fontFamily: FONT_STYLES.BOLD,
				fontWeight: FONT_STYLES.WEIGHT,
				cursor: "pointer",
				backgroundColor: "white",
				color: "black",
				border: "3px solid black",
				borderRadius,
				textShadow: "none",
				boxShadow,
				transition: "all 0.2s",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "#E63946";
				e.currentTarget.style.color = "white";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "white";
				e.currentTarget.style.color = "black";
			}}
		>
			{children}
		</button>
	);
}

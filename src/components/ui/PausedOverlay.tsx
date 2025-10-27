import { FONT_STYLES, TEXT_SHADOW } from "../../constants/gameLayout";

export function PausedOverlay() {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				fontSize: "120px",
				fontWeight: FONT_STYLES.WEIGHT,
				color: "white",
				textShadow: TEXT_SHADOW.LARGE,
				zIndex: 2000,
				pointerEvents: "none",
			}}
		>
			PAUSED
		</div>
	);
}


import { FONT_STYLES, TEXT_SHADOW } from "../../constants/gameLayout";

interface SpeedSliderProps {
	speedMultiplier: number;
	onChange: (value: number) => void;
}

export function SpeedSlider({ speedMultiplier, onChange }: SpeedSliderProps) {
	return (
		<div
			style={{
				position: "absolute",
				top: "60%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				zIndex: 2000,
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				padding: "20px 40px",
				borderRadius: "10px",
				border: "2px solid white",
			}}
		>
			<div
				style={{
					color: "white",
					fontSize: "24px",
					fontFamily: FONT_STYLES.BOLD,
					fontWeight: FONT_STYLES.WEIGHT,
					textShadow: TEXT_SHADOW.DEFAULT,
					marginBottom: "10px",
					textAlign: "center",
				}}
			>
				Speed: {speedMultiplier.toFixed(1)}x
			</div>
			<input
				type="range"
				min="0.1"
				max="3.0"
				step="0.1"
				value={speedMultiplier}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				style={{
					width: "300px",
					height: "8px",
					cursor: "pointer",
				}}
			/>
		</div>
	);
}


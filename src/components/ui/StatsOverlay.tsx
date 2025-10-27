import { FONT_STYLES, TEXT_SHADOW } from "../../constants/gameLayout";
import { formatTime, getTimeColor } from "../../utils/timeUtils";

interface StatsOverlayProps {
	level: number;
	timeRemaining: number;
	score: number;
}

export function StatsOverlay({ level, timeRemaining, score }: StatsOverlayProps) {
	return (
		<div
			style={{
				position: "absolute",
				top: 20,
				left: 20,
				color: "white",
				fontSize: "28px",
				fontFamily: FONT_STYLES.BOLD,
				fontWeight: FONT_STYLES.WEIGHT,
				textShadow: TEXT_SHADOW.DEFAULT,
				zIndex: 1000,
			}}
		>
			<div>Level: {level}</div>
			<div style={{ color: getTimeColor(timeRemaining) }}>
				Time: {formatTime(timeRemaining)}s
			</div>
			<div>Score: {score}</div>
		</div>
	);
}


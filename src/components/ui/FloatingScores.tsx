import { FONT_STYLES, TEXT_SHADOW } from "../../constants/gameLayout";
import type { FloatingScore, FloatingTimeBonus } from "../../types/game";

interface FloatingScoresProps {
	scores: FloatingScore[];
	timeBonuses: FloatingTimeBonus[];
}

export function FloatingScores({ scores, timeBonuses }: FloatingScoresProps) {
	return (
		<>
			{scores.map((score) => (
				<div
					key={score.id}
					style={{
						position: "absolute",
						left: score.x,
						top: score.y,
						fontSize: "32px",
						fontFamily: FONT_STYLES.BOLD,
						fontWeight: FONT_STYLES.WEIGHT,
						color: score.color,
						textShadow: TEXT_SHADOW.DEFAULT,
						zIndex: 1500,
						pointerEvents: "none",
						opacity: score.opacity,
						transform: "translate(-50%, -50%)",
						animation: "floatUp 1.2s ease-out forwards",
					}}
				>
					+{score.score}
				</div>
			))}
			{timeBonuses.map((bonus) => (
				<div
					key={bonus.id}
					style={{
						position: "absolute",
						left: bonus.x,
						top: bonus.y,
						fontSize: "28px",
						fontFamily: FONT_STYLES.BOLD,
						fontWeight: FONT_STYLES.WEIGHT,
						color: "white",
						textShadow: TEXT_SHADOW.DEFAULT,
						zIndex: 1500,
						pointerEvents: "none",
						opacity: bonus.opacity,
						transform: "translate(-50%, -50%)",
						animation: "floatUp 2s ease-out forwards",
					}}
				>
					+{bonus.timeBonus}s
				</div>
			))}
		</>
	);
}

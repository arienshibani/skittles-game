import { FONT_STYLES, TEXT_SHADOW } from "../../constants/gameLayout";
import { GameButton } from "./GameButton";

interface GameOverScreenProps {
	level: number;
	score: number;
	onRestart: () => void;
}

export function GameOverScreen({
	level,
	score,
	onRestart,
}: GameOverScreenProps) {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				padding: "40px",
				textAlign: "center",
				zIndex: 2000,
			}}
		>
			<h1
				style={{
					color: "white",
					marginBottom: "20px",
					fontSize: "32px",
					fontFamily: FONT_STYLES.BOLD,
					fontWeight: FONT_STYLES.WEIGHT,
					textShadow: TEXT_SHADOW.DEFAULT,
				}}
			>
				Game Over!
			</h1>
			<div
				style={{
					color: "white",
					fontSize: "28px",
					marginBottom: "20px",
					fontFamily: FONT_STYLES.BOLD,
					fontWeight: FONT_STYLES.WEIGHT,
					textShadow: TEXT_SHADOW.DEFAULT,
				}}
			>
				Level Reached: {level}
			</div>
			<div
				style={{
					color: "white",
					fontSize: "28px",
					marginBottom: "20px",
					fontFamily: FONT_STYLES.BOLD,
					fontWeight: FONT_STYLES.WEIGHT,
					textShadow: TEXT_SHADOW.DEFAULT,
				}}
			>
				Total Score: {score}
			</div>
			<GameButton
				onClick={onRestart}
				padding="15px 40px"
				fontSize="28px"
				borderRadius="8px"
				boxShadow="4px 4px 0px black"
			>
				Try Again
			</GameButton>
		</div>
	);
}

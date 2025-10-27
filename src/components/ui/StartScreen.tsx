import { FONT_STYLES, TEXT_SHADOW } from "../../constants/gameLayout";
import { GameButton } from "./GameButton";

interface StartScreenProps {
	onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				textAlign: "center",
				zIndex: 2500,
				maxWidth: "600px",
			}}
		>
			<p
				style={{
					color: "white",
					fontSize: "30px",
					fontFamily: FONT_STYLES.BOLD,
					fontWeight: FONT_STYLES.WEIGHT,
					textShadow: TEXT_SHADOW.DEFAULT,
					marginBottom: "40px",
					lineHeight: "1.5",
				}}
			>
				Click as many skittles as you can until the timer runs out.
			</p>

			<GameButton onClick={onStart}>START GAME</GameButton>
		</div>
	);
}

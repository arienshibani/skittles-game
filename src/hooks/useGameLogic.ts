import { useRef } from "react";
import type { FloatingScore, FloatingTimeBonus } from "../types/game";
import { TIME_BONUS_MS } from "../constants/game";

interface UseGameLogicProps {
	mousePosition: { x: number; y: number };
	gameState: ReturnType<typeof import("./useGameState").useGameState>;
}

export function useGameLogic({ mousePosition, gameState }: UseGameLogicProps) {
	const {
		clickedBoxes,
		setClickedBoxes,
		setTotalScore,
		setTimeRemaining,
		setFloatingScores,
		setFloatingTimeBonuses,
	} = gameState;

	// Auto-incrementing counter for unique IDs
	const idCounter = useRef(0);

	const handleSkittleClick = (index: number, score: number, color: string) => {
		if (clickedBoxes.has(index) || gameState.isPaused || gameState.gameOver) return;

		setClickedBoxes((prev) => new Set(prev).add(index));
		setTotalScore((prev) => prev + score);
		setTimeRemaining((prev) => prev + TIME_BONUS_MS);

		// Generate auto-incrementing unique IDs
		const uniqueId = ++idCounter.current;
		const uniqueId2 = ++idCounter.current;

		const newFloatingScore: FloatingScore = {
			id: uniqueId,
			score,
			color,
			x: mousePosition.x,
			y: mousePosition.y - 50,
			opacity: 1,
		};

		const newFloatingTimeBonus: FloatingTimeBonus = {
			id: uniqueId2,
			timeBonus: 0.5,
			x: 170,
			y: 60,
			opacity: 1,
		};

		setFloatingScores((prev) => [...prev, newFloatingScore]);
		setFloatingTimeBonuses((prev) => [...prev, newFloatingTimeBonus]);

		setTimeout(() => {
			setFloatingScores((prev) => prev.filter((fs) => fs.id !== newFloatingScore.id));
		}, 2000);

		setTimeout(() => {
			setFloatingTimeBonuses((prev) => prev.filter((ftb) => ftb.id !== newFloatingTimeBonus.id));
		}, 2000);
	};

	const restartGame = () => {
		gameState.setLevel(1);
		gameState.setClickedBoxes(new Set());
		gameState.setTimeRemaining(10000);
		gameState.setGameOver(false);
		gameState.setTotalScore(0);
		gameState.setIsPaused(false);
		gameState.setFloatingScores([]);
		gameState.setFloatingTimeBonuses([]);
	};

	return { handleSkittleClick, restartGame };
}


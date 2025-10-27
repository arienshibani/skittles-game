import { useEffect } from "react";

export function useGameTimer(
	gameOver: boolean,
	isPaused: boolean,
	setTimeRemaining: React.Dispatch<React.SetStateAction<number>>,
	setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
) {
	useEffect(() => {
		if (gameOver || isPaused) return;

		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 16) {
					setGameOver(true);
					return 0;
				}
				return prev - 16; // Decrease by ~16ms (60fps)
			});
		}, 16);

		return () => clearInterval(interval);
	}, [gameOver, isPaused, setTimeRemaining, setGameOver]);
}


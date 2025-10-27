import { useEffect, useRef } from "react";

export function usePauseControls(
	gameOver: boolean,
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
	setTimeRemaining: React.Dispatch<React.SetStateAction<number>>,
) {
	const lastUnpauseTime = useRef<number>(0);
	const RAPID_PAUSE_WINDOW_MS = 1000; // 1 second window for rapid pause detection
	const RAPID_PAUSE_PENALTY_MS = 500; // 0.5 seconds penalty

	// ESC key listener for pause/unpause
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Escape" && !gameOver) {
				setIsPaused((prev) => {
					// Check if this is a rapid pause (within 2 seconds of last unpause)
					const now = Date.now();
					const timeSinceUnpause = now - lastUnpauseTime.current;
					
					if (!prev && timeSinceUnpause < RAPID_PAUSE_WINDOW_MS && lastUnpauseTime.current > 0) {
						// Rapid pause detected - penalize player
						console.log("⚠️ Rapid pause detected! Subtracting 0.5 seconds...");
						setTimeRemaining((current) => Math.max(0, current - RAPID_PAUSE_PENALTY_MS));
					} else if (!prev) {
						// Just paused, record unpause time for next check
						lastUnpauseTime.current = 0;
					} else {
						// Unpausing, record the time
						lastUnpauseTime.current = Date.now();
					}
					
					return !prev;
				});
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [gameOver, setIsPaused, setTimeRemaining]);

	// Auto-pause when game over
	useEffect(() => {
		if (gameOver) {
			setIsPaused(true);
		}
	}, [gameOver, setIsPaused]);
}


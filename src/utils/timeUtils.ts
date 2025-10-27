import { STARTING_TIME_MS } from "../constants/game";

export function getTimeColor(timeRemaining: number): string {
	const timeInSeconds = timeRemaining / 1000;

	if (timeInSeconds <= 0) return "#FF0000"; // Pure red when game over

	const maxTime = STARTING_TIME_MS / 1000; // Starting time in seconds
	const normalizedTime = Math.max(0, Math.min(timeInSeconds / maxTime, 1));

	const red = 255;
	const green = Math.floor(255 * normalizedTime);
	const blue = Math.floor(255 * normalizedTime);

	return `rgb(${red}, ${green}, ${blue})`;
}

export function formatTime(ms: number): string {
	return (ms / 1000).toFixed(2);
}


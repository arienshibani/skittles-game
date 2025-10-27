import { useEffect } from "react";

export function useLevelProgression(
	clickedBoxes: Set<number>,
	skittlesPerLevel: number,
	gameOver: boolean,
	setLevel: React.Dispatch<React.SetStateAction<number>>,
	setClickedBoxes: React.Dispatch<React.SetStateAction<Set<number>>>,
) {
	useEffect(() => {
		if (clickedBoxes.size === skittlesPerLevel && !gameOver) {
			setLevel((prev) => prev + 1);
			setClickedBoxes(new Set());
		}
	}, [clickedBoxes, skittlesPerLevel, gameOver, setLevel, setClickedBoxes]);
}


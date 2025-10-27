import { useState, useRef } from "react";
import * as THREE from "three";
import type { FloatingScore, FloatingTimeBonus } from "../types/game";
import { STARTING_TIME_MS } from "../constants/game";

export function useGameState() {
	const [level, setLevel] = useState(1);
	const [clickedBoxes, setClickedBoxes] = useState<Set<number>>(new Set());
	const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME_MS);
	const [gameOver, setGameOver] = useState(false);
	const [totalScore, setTotalScore] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [speedMultiplier, setSpeedMultiplier] = useState(0.3);
	const [showSpeedSlider, setShowSpeedSlider] = useState(false);
	const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
	const [floatingTimeBonuses, setFloatingTimeBonuses] = useState<FloatingTimeBonus[]>([]);

	const skittlesPerLevel = 2 + (level - 1) * 2;
	const skittleRefs = useRef<Map<number, THREE.Group>>(new Map());

	return {
		level,
		setLevel,
		clickedBoxes,
		setClickedBoxes,
		timeRemaining,
		setTimeRemaining,
		gameOver,
		setGameOver,
		totalScore,
		setTotalScore,
		isPaused,
		setIsPaused,
		speedMultiplier,
		setSpeedMultiplier,
		showSpeedSlider,
		setShowSpeedSlider,
		floatingScores,
		setFloatingScores,
		floatingTimeBonuses,
		setFloatingTimeBonuses,
		skittlesPerLevel,
		skittleRefs,
	};
}


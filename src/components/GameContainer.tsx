import { Canvas } from "@react-three/fiber";
import { useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { SkittleWorld } from "./3d/SkittleWorld";
import { generateSkittlePositions } from "../utils/skittleUtils";

interface GameContainerProps {
	skittlesPerLevel: number;
	skittleRefs: React.MutableRefObject<Map<number, THREE.Group>>;
	onSkittleClick: (index: number, score: number, color: string) => void;
	clickedSkittles: Set<number>;
	isPaused: boolean;
	gameOver: boolean;
	speedMultiplier: number;
	isMobile: boolean;
	level: number;
	hasStarted: boolean;
}

export function GameContainer({
	skittlesPerLevel,
	skittleRefs,
	onSkittleClick,
	clickedSkittles,
	isPaused,
	gameOver,
	speedMultiplier,
	isMobile,
	level,
	hasStarted,
}: GameContainerProps) {
	const [shuffleKey, setShuffleKey] = useState(0);
	
	// Reshuffle positions when paused to prevent cheating
	useEffect(() => {
		if (isPaused && hasStarted) {
			// Generate new positions by incrementing the key
			setShuffleKey(prev => prev + 1);
		}
	}, [isPaused, hasStarted]);

	const skittles = useMemo(() => {
		return generateSkittlePositions(skittlesPerLevel, isMobile);
	}, [skittlesPerLevel, isMobile, shuffleKey]);

	return (
		<Canvas style={{ background: "linear-gradient(45deg, #000000, #1a0033, #0a0a2e, #000000)", backgroundSize: "400% 400%", animation: "cosmic-gradient 15s ease infinite alternate" }} camera={{ position: [0, 0, 15], fov: 60 }}>
			<SkittleWorld
				skittles={skittles}
				skittleRefs={skittleRefs}
				onSkittleClick={onSkittleClick}
				clickedSkittles={clickedSkittles}
				isPaused={isPaused}
				gameOver={gameOver}
				speedMultiplier={speedMultiplier}
				isMobile={isMobile}
				level={level}
				hasStarted={hasStarted}
			/>
			<ambientLight intensity={0.8} />
			<directionalLight position={[0, 0, 5]} intensity={1.5} />
			<directionalLight position={[5, 5, 5]} intensity={1} />
			<directionalLight position={[-5, -5, 5]} intensity={1} />
		</Canvas>
	);
}


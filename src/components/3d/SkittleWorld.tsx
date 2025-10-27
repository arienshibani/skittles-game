import { Skittle } from "./Skittle";
import type * as THREE from "three";

interface SkittleWorldProps {
	skittles: Array<{ position: [number, number, number] }>;
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

export function SkittleWorld({
	skittles,
	skittleRefs,
	onSkittleClick,
	clickedSkittles,
	isPaused,
	gameOver,
	speedMultiplier,
	isMobile,
	level,
	hasStarted,
}: SkittleWorldProps) {
	return (
		<>
			{skittles.map((skittle, index) => (
				<Skittle
					key={`skittle-${index}-${skittle.position[0]}-${skittle.position[1]}-${skittle.position[2]}`}
					position={skittle.position}
					index={index}
					skittleRefs={skittleRefs}
					onClick={onSkittleClick}
					isClicked={clickedSkittles.has(index)}
					isPaused={isPaused}
					gameOver={gameOver}
					speedMultiplier={speedMultiplier}
					isMobile={isMobile}
					level={level}
					hasStarted={hasStarted}
				/>
			))}
		</>
	);
}

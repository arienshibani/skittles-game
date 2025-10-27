import { useRef, useState, useEffect, useMemo, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { getSkittleProperties } from "../../constants/game";
import { getRandomColor } from "../../utils/skittleUtils";
import {
	BASE_ROTATION_SPEED,
	SPEED_BOOST_DECAY,
	COLLISION_BOOST,
	CLICK_BOOST,
	VELOCITY_LIMIT,
	BOUNDARY,
	SKITTLE_SIZE,
	SPHERE_SEGMENTS,
	ENABLE_SKITTLE_COLLISIONS,
} from "../../utils/constants";
import { Fragment } from "./Fragment";
import type { FragmentData } from "../../types/game";

interface SkittleProps {
	position: [number, number, number];
	index: number;
	skittleRefs: React.RefObject<Map<number, THREE.Group>>;
	onClick: (index: number, score: number, color: string) => void;
	isClicked: boolean;
	isPaused: boolean;
	gameOver: boolean;
	speedMultiplier: number;
	isMobile: boolean;
	level?: number;
	hasStarted: boolean;
}

export function Skittle({
	position,
	index,
	skittleRefs,
	onClick,
	isClicked,
	isPaused,
	gameOver,
	speedMultiplier,
	isMobile,
	level = 1,
	hasStarted,
}: SkittleProps) {
	const ref = useRef<THREE.Group>(null!);
	// Randomize rotation speed slightly for each skittle (variation of ±20%)
	const [rotationSpeed] = useState(
		() => BASE_ROTATION_SPEED * (0.8 + Math.random() * 0.4),
	);
	const [speedBoost, setSpeedBoost] = useState(0);
	const [isShattering, setIsShattering] = useState(false);
	const [color] = useState(() => getRandomColor(level));
	const skittleProps = useMemo(() => getSkittleProperties(color), [color]);

	// Level-based velocity scaling: slightly increase speed as level progresses
	// Formula: 1.0 + (level - 1) * 0.05 = 1.0 at level 1, 1.5 at level 11, 2.0 at level 21, etc.
	const levelVelocityMultiplier = useMemo(
		() => 1.0 + (level - 1) * 0.05,
		[level],
	);

	const [fragments, setFragments] = useState<FragmentData[]>([]);

	const velocityRef = useRef(
		new THREE.Vector3(
			(Math.random() - 0.5) * 0.03,
			(Math.random() - 0.5) * 0.03,
			(Math.random() - 0.5) * 0.03,
		),
	);

	useEffect(() => {
		if (ref.current) {
			skittleRefs.current.set(index, ref.current);
			ref.current.userData.velocityRef = velocityRef.current;
		}
		return () => {
			skittleRefs.current.delete(index);
		};
	}, [index, skittleRefs]);

	useEffect(() => {
		if (speedBoost > 0) {
			const interval = setInterval(() => {
				setSpeedBoost((prev) => Math.max(0, prev - SPEED_BOOST_DECAY));
			}, 16);
			return () => clearInterval(interval);
		}
	}, [speedBoost]);

	const scale = 1.0 * skittleProps.size * (isMobile ? 0.75 : 1.0);

	// Skittle shape: lentil/disk-like (wider than tall, static no animation)
	const skittleShape = { x: 1, y: 1, z: 0.75 }; // Z-axis flattened to 75% for lentil shape

	// Combined useFrame for better performance
	useFrame(() => {
		// Don't move skittles if clicked, or paused in-game (but allow on start screen)
		if (isClicked || (isPaused && hasStarted)) return;

		const group = ref.current;
		const currentSpeed =
			(rotationSpeed + speedBoost) *
			skittleProps.speed *
			speedMultiplier *
			levelVelocityMultiplier;

		// Rotation
		group.rotation.x += currentSpeed;
		group.rotation.y += currentSpeed;
		group.rotation.z += currentSpeed;

		// Position
		group.position.x +=
			velocityRef.current.x *
			skittleProps.speed *
			speedMultiplier *
			levelVelocityMultiplier;
		group.position.y +=
			velocityRef.current.y *
			skittleProps.speed *
			speedMultiplier *
			levelVelocityMultiplier;
		group.position.z +=
			velocityRef.current.z *
			skittleProps.speed *
			speedMultiplier *
			levelVelocityMultiplier;

		// Collision detection (can be disabled for performance)
		if (ENABLE_SKITTLE_COLLISIONS) {
			const collisionRadius = SKITTLE_SIZE * 2;
			skittleRefs.current.forEach((otherSkittle, otherIndex) => {
				if (otherIndex === index || !otherSkittle) return;

				const distance = group.position.distanceTo(otherSkittle.position);
				if (distance < collisionRadius) {
					setSpeedBoost((prev) => prev + COLLISION_BOOST);
					const boost = 0.01;
					velocityRef.current.x += (Math.random() - 0.5) * boost;
					velocityRef.current.y += (Math.random() - 0.5) * boost;
					velocityRef.current.z += (Math.random() - 0.5) * boost;

					if (velocityRef.current.length() > VELOCITY_LIMIT) {
						velocityRef.current.normalize().multiplyScalar(VELOCITY_LIMIT);
					}
				}
			});
		}

		// Boundary checking
		if (Math.abs(group.position.x) > BOUNDARY) velocityRef.current.x *= -1;
		if (Math.abs(group.position.y) > BOUNDARY) velocityRef.current.y *= -1;
		if (Math.abs(group.position.z) > BOUNDARY) velocityRef.current.z *= -1;
	});

	const handleClick = () => {
		if (!isClicked && !isShattering && !isPaused && !gameOver) {
			onClick(index, skittleProps.score, color);
			setSpeedBoost((prev) => prev + CLICK_BOOST);
			setIsShattering(true);

			// Adaptive fragment count based on level (less fragments = better performance)
			const fragmentCount = Math.max(6, 20 - level * 2); // Reduce fragments as levels increase

			const newFragments: FragmentData[] = Array.from(
				{ length: fragmentCount },
				(_, i) => {
					const angle = (i / fragmentCount) * Math.PI * 2;
					const horizontalSpeed = 0.1;
					return {
						id: i,
						position: [
							(Math.random() - 0.5) * 0.1,
							(Math.random() - 0.5) * 0.1,
							(Math.random() - 0.5) * 0.1,
						] as [number, number, number],
						velocity: [
							Math.cos(angle) * horizontalSpeed,
							(Math.random() - 0.5) * 0.1,
							Math.sin(angle) * horizontalSpeed,
						] as [number, number, number],
						rotation: [
							Math.random() * 0.5,
							Math.random() * 0.5,
							Math.random() * 0.5,
						],
						color,
					};
				},
			);
			setFragments(newFragments);

			// Cleanup fragments after animation
			setTimeout(() => {
				setFragments([]);
			}, 2000);
		}
	};

	if (isClicked && !isShattering) return null;
	if (isPaused && hasStarted) return null; // Hide skittles when paused in-game (not on start screen)

	return (
		<group ref={ref} position={position}>
			{!isShattering && (
				<SkittleMesh
					onClick={handleClick}
					scale={scale}
					skittleShape={skittleShape}
					color={color}
				/>
			)}
			{fragments.map((fragment) => (
				<Fragment
					key={fragment.id}
					initialData={fragment}
					skittleRefs={skittleRefs}
					scale={scale}
				/>
			))}
		</group>
	);
}

function SkittleMesh({
	onClick,
	scale,
	skittleShape,
	color,
}: {
	onClick: () => void;
	scale: number;
	skittleShape: { x: number; y: number; z: number };
	color: string;
}) {
	const groupRef = useRef<THREE.Group>(null!);

	useLayoutEffect(() => {
		if (groupRef.current) {
			groupRef.current.scale.set(
				scale * skittleShape.x,
				scale * skittleShape.y,
				scale * skittleShape.z,
			);
		}
	}, [scale, skittleShape]);

	return (
		<group ref={groupRef}>
			<mesh onPointerDown={onClick}>
				<sphereGeometry args={[0.6, SPHERE_SEGMENTS, SPHERE_SEGMENTS]} />
				<meshStandardMaterial color={color} metalness={0.05} roughness={0.6} />
			</mesh>
			<Text
				position={[0, 0, 0.6]}
				fontSize={0.4}
				color="white"
				anchorX="center"
				anchorY="middle"
				fontWeight="bold"
			>
				S
			</Text>
		</group>
	);
}

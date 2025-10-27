import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { FragmentData } from "../../types/game";
import { ENABLE_FRAGMENT_COLLISIONS } from "../../utils/constants";

interface FragmentProps {
	initialData: FragmentData;
	skittleRefs: React.MutableRefObject<Map<number, THREE.Group>>;
	scale: number;
}

export function Fragment({ initialData, skittleRefs, scale }: FragmentProps) {
	const ref = useRef<THREE.Mesh>(null!);
	const velocityRef = useRef(new THREE.Vector3(...initialData.velocity));
	const rotationSpeedRef = useRef(new THREE.Vector3(...initialData.rotation));

	useFrame(() => {
		const fragment = ref.current;

		velocityRef.current.y -= 0.01;

		fragment.position.x += velocityRef.current.x;
		fragment.position.y += velocityRef.current.y;
		fragment.position.z += velocityRef.current.z;

		fragment.rotation.x += rotationSpeedRef.current.x;
		fragment.rotation.y += rotationSpeedRef.current.y;
		fragment.rotation.z += rotationSpeedRef.current.z;

		// Collision checking disabled for performance boost
		if (ENABLE_FRAGMENT_COLLISIONS) {
			skittleRefs.current.forEach((skittle) => {
				if (!skittle) return;

				const distance = fragment.position.distanceTo(skittle.position);
				if (distance < 0.5) {
					const direction = new THREE.Vector3().subVectors(skittle.position, fragment.position).normalize();
					skittle.position.add(direction.multiplyScalar(0.02));
				}
			});
		}
	});

	return (
		<mesh ref={ref} position={initialData.position}>
			<sphereGeometry args={[0.03 * scale, 8, 8]} />
			<meshStandardMaterial color={initialData.color} metalness={0.3} roughness={0.1} />
		</mesh>
	);
}


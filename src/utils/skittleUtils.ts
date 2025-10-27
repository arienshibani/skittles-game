import { SKITTLE_COLORS } from "../constants/game";
import { SKITTLE_SPAWN_RANGE } from "../utils/constants";

export function getRandomColor(level: number = 1) {
	const PURPLE_COLOR = "#6A2C91";

	// If level < 5, exclude purple from available colors
	let availableColors: string[] = [...SKITTLE_COLORS];
	if (level < 5) {
		availableColors = SKITTLE_COLORS.filter(color => color !== PURPLE_COLOR);
	} else {
		// After level 5, purple can spawn
		// After level 10, purple spawns more often (add it to the pool multiple times)
		if (level >= 10) {
			// Double the chance of purple appearing
			const colorsWithBonusPurple = [...SKITTLE_COLORS, PURPLE_COLOR];
			availableColors = colorsWithBonusPurple;
		}
	}

	return availableColors[Math.floor(Math.random() * availableColors.length)];
}

export function generateSkittlePositions(
	count: number,
	isMobile: boolean,
): Array<{ position: [number, number, number] }> {
	const spawnRange = isMobile ? 7 : SKITTLE_SPAWN_RANGE;
	return Array.from({ length: count }, () => ({
		position: [
			(Math.random() - 0.5) * spawnRange,
			(Math.random() - 0.5) * spawnRange,
			(Math.random() - 0.5) * spawnRange,
		] as [number, number, number],
	}));
}


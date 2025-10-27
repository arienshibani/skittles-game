export const INITIAL_TIME_MS = 10000; // 30 seconds
export const STARTING_TIME_MS = 10000; // 10 seconds (for restart)
export const TIME_BONUS_MS = 200; // 0.5 seconds bonus per click
export const FRAME_UPDATE_INTERVAL_MS = 2; // ~120fps

export const SKITTLE_COLORS = [
	"#D61F2C", // Red - baseline
	"#F47721", // Orange - faster
	"#F7D51D", // Yellow - faster and smaller
	"#52B03D", // Green - larger and faster than yellow
	"#1474BB", // Blue - faster than green, same size as baseline
	"#6A2C91", // Purple - faster than green, smaller than yellow
] as const;

export const SKITTLE_PROPERTIES: Record<string, { speed: number; size: number; score: number }> = {
	"#D61F2C": { speed: 1.0, size: 0.8, score: 5 }, // Red - baseline
	"#F47721": { speed: 1.3, size: 0.8, score: 6 }, // Orange - faster
	"#F7D51D": { speed: 1.6, size: 0.7, score: 7 }, // Yellow - faster and smaller
	"#52B03D": { speed: 1.8, size: 0.7, score: 7 }, // Green - larger and faster than yellow
	"#1474BB": { speed: 2.0, size: 0.8, score: 8 }, // Blue - faster than green, same size as baseline
	"#6A2C91": { speed: 2.2, size: 0.6, score: 9 }, // Purple - faster than green, smaller than yellow
};

export function getSkittleProperties(color: string) {
	return SKITTLE_PROPERTIES[color] || { speed: 1.0, size: 1.0, score: 5 };
}


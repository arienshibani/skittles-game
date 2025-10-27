export interface FloatingScore {
	id: number;
	score: number;
	color: string;
	x: number;
	y: number;
	opacity: number;
}

export interface FloatingTimeBonus {
	id: number;
	timeBonus: number;
	x: number;
	y: number;
	opacity: number;
}

export interface SkittleProperties {
	speed: number;
	size: number;
	score: number;
}

export interface FragmentData {
	id: number;
	position: [number, number, number];
	velocity: [number, number, number];
	rotation: [number, number, number];
	color: string;
}

export interface GameState {
	level: number;
	clickedBoxes: Set<number>;
	timeRemaining: number;
	gameOver: boolean;
	totalScore: number;
	isPaused: boolean;
	speedMultiplier: number;
	showSpeedSlider: boolean;
	floatingScores: FloatingScore[];
	floatingTimeBonuses: FloatingTimeBonus[];
}


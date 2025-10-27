import { useState } from "react";
import { useGameState } from "./hooks/useGameState";
import { useDeviceDetection } from "./hooks/useDeviceDetection";
import { useMousePosition } from "./hooks/useMousePosition";
import { useGameTimer } from "./hooks/useGameTimer";
import { useBackgroundEffect } from "./hooks/useBackgroundEffect";
import { useLevelProgression } from "./hooks/useLevelProgression";
import { usePauseControls } from "./hooks/usePauseControls";
import { useSpeedSliderToggle } from "./hooks/useSpeedSliderToggle";
import { useGameLogic } from "./hooks/useGameLogic";
import { useDebugPanel } from "./hooks/useDebugPanel";
import { GameContainer } from "./components/GameContainer";
import { SkittlesLogo } from "./components/ui/SkittlesLogo";
import { StatsOverlay } from "./components/ui/StatsOverlay";
import { PausedOverlay } from "./components/ui/PausedOverlay";
import { SpeedSlider } from "./components/ui/SpeedSlider";
import { FloatingScores } from "./components/ui/FloatingScores";
import { GameOverScreen } from "./components/ui/GameOverScreen";
import { StartScreen } from "./components/ui/StartScreen";

export default function Game() {
	const gameState = useGameState();
	const isMobile = useDeviceDetection();
	const mousePosition = useMousePosition();
	const [hasStarted, setHasStarted] = useState(false);

	// Only run game logic if started
	useGameTimer(
		!hasStarted || gameState.gameOver,
		!hasStarted || gameState.isPaused,
		gameState.setTimeRemaining,
		gameState.setGameOver,
	);
	useBackgroundEffect();
	useLevelProgression(
		gameState.clickedBoxes,
		gameState.skittlesPerLevel,
		gameState.gameOver,
		gameState.setLevel,
		gameState.setClickedBoxes,
	);
	usePauseControls(
		gameState.gameOver,
		gameState.setIsPaused,
		gameState.setTimeRemaining,
	);
	useSpeedSliderToggle(gameState.showSpeedSlider, gameState.setShowSpeedSlider);
	useDebugPanel(
		gameState.setShowSpeedSlider,
		gameState.speedMultiplier,
		gameState.setSpeedMultiplier,
	);

	const { handleSkittleClick, restartGame } = useGameLogic({
		mousePosition,
		gameState,
	});

	const handleStart = () => {
		setHasStarted(true);
		gameState.setIsPaused(false);
	};

	const handleRestart = () => {
		restartGame();
		setHasStarted(true);
	};

	return (
		<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
			<style>
				{`
				@keyframes floatUp {
					0% {
						opacity: 1;
						transform: translate(-50%, -50%) translateY(0);
					}
					100% {
						opacity: 0;
						transform: translate(-50%, -50%) translateY(-100px);
					}
				}

				@keyframes cosmic-gradient {
					0% {
						background-position: 0% 50%;
					}
					100% {
						background-position: 100% 50%;
					}
				}

				.cosmic-background {
					width: 100vw;
					height: 100vh;
					background: linear-gradient(
						45deg,
						#000000,
						#1a0033,
						#0a0a2e,
						#000000
					);
					background-size: 400% 400%;
					animation: cosmic-gradient 15s ease infinite alternate;
				}
			`}
			</style>

			<SkittlesLogo />
			{hasStarted && (
				<StatsOverlay
					level={gameState.level}
					timeRemaining={gameState.timeRemaining}
					score={gameState.totalScore}
				/>
			)}

			{!hasStarted && <StartScreen onStart={handleStart} />}

			{hasStarted && gameState.isPaused && !gameState.gameOver && (
				<PausedOverlay />
			)}
			{gameState.isPaused &&
				!gameState.gameOver &&
				gameState.showSpeedSlider && (
					<SpeedSlider
						speedMultiplier={gameState.speedMultiplier}
						onChange={gameState.setSpeedMultiplier}
					/>
				)}

			<FloatingScores
				scores={gameState.floatingScores}
				timeBonuses={gameState.floatingTimeBonuses}
			/>

			{hasStarted && gameState.gameOver && (
				<GameOverScreen
					level={gameState.level}
					score={gameState.totalScore}
					onRestart={handleRestart}
				/>
			)}

			<GameContainer
				skittlesPerLevel={
					hasStarted && !gameState.gameOver ? gameState.skittlesPerLevel : 10
				}
				skittleRefs={gameState.skittleRefs}
				onSkittleClick={handleSkittleClick}
				clickedSkittles={
					hasStarted && !gameState.gameOver ? gameState.clickedBoxes : new Set()
				}
				isPaused={(!hasStarted || gameState.isPaused) && !gameState.gameOver}
				gameOver={gameState.gameOver}
				speedMultiplier={gameState.speedMultiplier}
				isMobile={isMobile}
				level={hasStarted && !gameState.gameOver ? gameState.level : 5}
				hasStarted={hasStarted}
			/>
		</div>
	);
}

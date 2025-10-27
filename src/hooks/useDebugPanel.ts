import { useEffect } from "react";
import * as dat from "dat.gui";

interface DebugControls {
	speedSlider: boolean;
	speedMultiplier: number;
}

export function useDebugPanel(setShowSpeedSlider: React.Dispatch<React.SetStateAction<boolean>>, speedMultiplier: number, setSpeedMultiplier: React.Dispatch<React.SetStateAction<number>>) {
	useEffect(() => {
		// Only enable debug panel in development
		const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
		
		if (!isDevelopment) {
			return; // Exit early in production
		}

		let gui: dat.GUI | null = null;
		let controls: DebugControls | null = null;
		
		// Function to initialize/update the GUI
		const initGUI = () => {
			if (gui) {
				gui.destroy();
			}

			gui = new dat.GUI();
			gui.domElement.style.zIndex = "10000";
			gui.domElement.style.position = "fixed";
			gui.domElement.style.left = "50%";
			gui.domElement.style.top = "10px";
			gui.domElement.style.transform = "translateX(-50%)";
			gui.domElement.style.display = "none"; // Hide by default

			controls = {
				speedSlider: false,
				speedMultiplier: speedMultiplier,
			};

			// Speed slider toggle
			const speedSliderToggle = gui.add(controls, "speedSlider").name("Show Speed Slider");
			speedSliderToggle.onChange((value: boolean) => {
				setShowSpeedSlider(value);
			});

			// Speed multiplier
			const speedControl = gui.add(controls, "speedMultiplier", 0.1, 3.0, 0.1).name("Speed Multiplier");
			speedControl.onChange((value: number) => {
				setSpeedMultiplier(value);
			});
			speedControl.setValue(speedMultiplier);

			// Physical constants folder
			const physicsFolder = gui.addFolder("Physics");
			physicsFolder.add({ collisionBoost: 0.01 }, "collisionBoost", 0, 0.1, 0.001).name("Collision Boost").onChange((val: number) => {
				(window as any).gameConfig = { ...(window as any).gameConfig, COLLISION_BOOST: val };
			});
			physicsFolder.add({ clickBoost: 0.02 }, "clickBoost", 0, 0.2, 0.001).name("Click Boost").onChange((val: number) => {
				(window as any).gameConfig = { ...(window as any).gameConfig, CLICK_BOOST: val };
			});
			physicsFolder.add({ velocityLimit: 0.15 }, "velocityLimit", 0, 0.5, 0.01).name("Velocity Limit").onChange((val: number) => {
				(window as any).gameConfig = { ...(window as any).gameConfig, VELOCITY_LIMIT: val };
			});
			physicsFolder.open();

			// Visual settings folder
			const visualFolder = gui.addFolder("Visual");
			visualFolder.add({ sphereSegments: 32 }, "sphereSegments", 8, 128, 8).name("Sphere Quality").onChange((val: number) => {
				(window as any).gameConfig = { ...(window as any).gameConfig, SPHERE_SEGMENTS: val };
				console.log("⚠️ Sphere quality changed. Refresh page to apply.");
			});
			visualFolder.open();

			// Performance settings folder
			const perfFolder = gui.addFolder("Performance");
			perfFolder.add({ enableFragmentCollisions: false }, "enableFragmentCollisions").name("Fragment Collisions").onChange((val: boolean) => {
				(window as any).gameConfig = { ...(window as any).gameConfig, ENABLE_FRAGMENT_COLLISIONS: val };
			});
			perfFolder.add({ enableSkittleCollisions: false }, "enableSkittleCollisions").name("Skittle Collisions").onChange((val: boolean) => {
				(window as any).gameConfig = { ...(window as any).gameConfig, ENABLE_SKITTLE_COLLISIONS: val };
				console.log("⚠️ Restart game to apply skittle collision changes");
			});

			console.log("✅ Debug panel initialized! Use dat.GUI controls to tweak settings in real-time.");
			console.log("💡 Changes to constants like sphere segments require a page refresh to apply.");
		};

		// Initialize GUI
		initGUI();

		// Expose configuration function to window
		(window as any).configureGame = () => {
			console.log("🎮 Game Configuration:");
			console.log("Speed Multiplier:", speedMultiplier);
			console.log("Configure more settings using the dat.GUI panel!");
			if (gui) {
				gui.domElement.style.display = "block";
				gui.open();
			}
		};

		// Expose debug panel toggle to window
		(window as any).debugPanel = () => {
			if (gui) {
				const isVisible = gui.domElement.style.display !== "none";
				if (isVisible) {
					gui.domElement.style.display = "none";
					console.log("🔇 Debug panel hidden");
				} else {
					gui.domElement.style.display = "block";
					gui.open();
					console.log("🔊 Debug panel opened!");
				}
			}
		};

		return () => {
			if (gui) {
				gui.destroy();
			}
		};
	}, [setShowSpeedSlider, speedMultiplier, setSpeedMultiplier]);
}


import { useEffect } from "react";
import { SKITTLE_COLORS } from "../constants/game";

// Convert the skittle color constant from hex to rgb
function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
		: "0, 0, 0";
}

export function useBackgroundEffect() {
	useEffect(() => {
		const updateBackground = () => {
			const canvas = document.querySelector("canvas")?.parentElement;
			if (canvas) {
				// Use the skittle colors for the gradient
				const colors = SKITTLE_COLORS.map((color) => `rgb(${hexToRgb(color)})`).join(",");
				canvas.style.background = `linear-gradient(45deg,${colors})`;
				canvas.style.backgroundSize = "400% 400%";
				canvas.style.animation = "cosmic-gradient 15s ease infinite alternate";
			}
		};

		updateBackground();
		const interval = setInterval(updateBackground, 1000);
		return () => clearInterval(interval);
	}, []);
}


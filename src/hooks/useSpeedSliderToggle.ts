import { useEffect } from "react";

export function useSpeedSliderToggle(
	showSpeedSlider: boolean,
	setShowSpeedSlider: React.Dispatch<React.SetStateAction<boolean>>,
) {
	useEffect(() => {
		(window as any).toggleSpeedSlider = () => {
			setShowSpeedSlider((prev) => !prev);
			console.log(`Speed slider ${!showSpeedSlider ? "enabled" : "disabled"}`);
		};

		return () => {
			delete (window as any).toggleSpeedSlider;
		};
	}, [showSpeedSlider, setShowSpeedSlider]);
}


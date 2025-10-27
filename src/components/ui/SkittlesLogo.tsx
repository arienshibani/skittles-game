export function SkittlesLogo() {
	return (
		<div
			style={{
				position: "absolute",
				top: 20,
				right: 20,
				zIndex: 1000,
			}}
		>
			<img
				src="/skittles.png"
				alt="Skittles Logo"
				style={{
					height: "120px",
					width: "auto",
					backgroundColor: "transparent",
					mixBlendMode: "multiply",
				}}
			/>
		</div>
	);
}


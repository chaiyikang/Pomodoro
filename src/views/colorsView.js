class ColorsView {
	openColorSquares = Array.from(document.querySelectorAll(".square"));
	selectColorSquare = Array.from(document.querySelectorAll(".choose-color-square"));
	colorPickerModal = document.querySelector(".color-picker-modal");
	settingsDiv = document.querySelector(".settings");
	colorPickerTitle = document.querySelector(".color-picker-title");
	overlay = document.querySelector(".overlay");

	addHandlerOpenColorPickerModal(getSettings) {
		const handler = (square) => {
			const selectedType = square.dataset.intervalType;
			const spacedString = selectedType.replace(/([A-Z])/g, " $1");
			const displayType = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

			const settings = getSettings();
			this.selectColorSquare.forEach((color) => {
				console.log("color:", color);
				if (color.style.backgroundColor === settings[`${selectedType}Color`]) {
					color.classList.add("active");
				} else {
					color.classList.remove("active");
				}
			});

			this.colorPickerTitle.textContent = displayType;
			this.settingsDiv.classList.add("hidden");
			this.colorPickerModal.classList.remove("hidden");
		};
		this.openColorSquares.forEach((square) => {
			square.addEventListener("click", () => {
				handler(square);
			});
		});
	}

	addHandlerCloseColorPickerModalWithOverlay() {
		this.overlay.addEventListener("click", () => {
			const otherModalOpen = this.colorPickerModal.classList.contains("hidden");
			if (otherModalOpen) return;
			this.colorPickerModal.classList.add("hidden");
			this.settingsDiv.classList.remove("hidden");
		});
	}

	addHandlerSubmitColor(handler) {
		this.selectColorSquare.forEach((color) =>
			color.addEventListener("click", () => {
				this.colorPickerModal.classList.add("hidden");
				this.settingsDiv.classList.remove("hidden");
			})
		);
	}
}

export default new ColorsView();

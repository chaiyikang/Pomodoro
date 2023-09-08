import helper from "../helpers";

class ColorsView {
	openColorSquares = Array.from(document.querySelectorAll(".square"));
	selectColorSquare = Array.from(document.querySelectorAll(".choose-color-square"));
	colorPickerModal = document.querySelector(".color-picker-modal");
	settingsDiv = document.querySelector(".settings");
	colorPickerTitle = document.querySelector(".color-picker-title");
	overlay = document.querySelector(".overlay");
	pomodoroSquare = document.querySelector(".pomodoro-square");
	shortBreakSquare = document.querySelector(".short-break-square");
	longBreakSquare = document.querySelector(".long-break-square");

	addHandlerOpenColorPickerModal(getSettings) {
		const handler = (square) => {
			const selectedType = square.dataset.intervalType;
			const displayType = helper.formatIntervalString(selectedType);

			const settings = getSettings();
			this.selectColorSquare.forEach((color) => {
				const currentColor = window
					.getComputedStyle(color)
					.getPropertyValue("background-color");

				if (currentColor === settings[`${selectedType}Color`]) {
					color.classList.add("active");
				} else {
					color.classList.remove("active");
				}
			});

			this.colorPickerTitle.textContent = "Choose Color For " + displayType;
			this.colorPickerTitle.dataset.type = selectedType;
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

	addHandlerSubmitColor(handlerUpdateState, getSettings) {
		const handler = (selectedColor) => {
			const currType = this.colorPickerTitle.dataset.type;
			const invalidData =
				!CSS.supports("color", selectedColor) ||
				!["pomodoro", "shortBreak", "longBreak"].includes(currType);
			if (invalidData) return;

			handlerUpdateState(this.colorPickerTitle.dataset.type, selectedColor);

			// re-initialise active color settings in view
			const { pomodoroColor, shortBreakColor, longBreakColor } = getSettings();
			this.pomodoroSquare.style.backgroundColor = pomodoroColor;
			this.shortBreakSquare.style.backgroundColor = shortBreakColor;
			this.longBreakSquare.style.backgroundColor = longBreakColor;

			this.colorPickerModal.classList.add("hidden");
			this.settingsDiv.classList.remove("hidden");
		};
		this.selectColorSquare.forEach((color) => {
			const selectedColor = window
				.getComputedStyle(color)
				.getPropertyValue("background-color");

			color.addEventListener("click", () => {
				handler(selectedColor);
			});
		});
	}
}

export default new ColorsView();

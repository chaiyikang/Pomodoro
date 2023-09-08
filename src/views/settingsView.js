class SettingsView {
	settingsForm = document.querySelector(".settings-form");
	settingsDiv = document.querySelector(".settings");
	overlay = document.querySelector(".overlay");
	closeBtn = document.querySelector(".close-btn-settings");
	settingsBtn = document.querySelector(".open-settings");
	pomodoroInput = document.querySelector(".pomodoro-input");
	shortBreakInput = document.querySelector(".shortBreak-input");
	longBreakInput = document.querySelector(".longBreak-input");
	autoPomodoroInput = document.querySelector(".start-pomodoro");
	autoBreaksInput = document.querySelector(".start-breaks");
	longBreakInterval = document.querySelector(".long-break-interval-input");
	focusedTimeDisplay = document.querySelector(".display-hours");
	pomodoroSquare = document.querySelector(".pomodoro-square");
	shortBreakSquare = document.querySelector(".short-break-square");
	longBreakSquare = document.querySelector(".long-break-square");

	addHandlerSettingsModal(getSettings) {
		this.settingsBtn.addEventListener("click", () => {
			this.initSettingsValues(getSettings());
			this.settingsDiv.classList.remove("hidden");
			this.overlay.classList.remove("hidden");
		});
	}

	initSettingsValues({
		pomodoroLengthSec,
		shortBreakLengthSec,
		longBreakLengthSec,
		toggleStartBreaks,
		toggleStartPomodoro,
		longBreakInterval,
		pomodoroColor,
		shortBreakColor,
		longBreakColor,
	}) {
		this.pomodoroInput.value = pomodoroLengthSec / 60;
		this.shortBreakInput.value = shortBreakLengthSec / 60;
		this.longBreakInput.value = longBreakLengthSec / 60;
		this.autoBreaksInput.checked = toggleStartBreaks;
		this.autoPomodoroInput.checked = toggleStartPomodoro;
		this.longBreakInterval.value = longBreakInterval;
		this.pomodoroSquare.style.backgroundColor = pomodoroColor;
		this.shortBreakSquare.style.backgroundColor = shortBreakColor;
		this.longBreakSquare.style.backgroundColor = longBreakColor;
	}

	addHandlerSettingsForm(controlSettings) {
		function abstractedHandler(event) {
			const otherModalOpen = this.settingsDiv.classList.contains("hidden");
			if (otherModalOpen) return;

			event.preventDefault();
			const formData = Object.fromEntries([...new FormData(this.settingsForm)]);
			// console.log([...new FormData(this.settingsForm)]);

			const dataIsValid =
				Math.sign(formData.pomodoroInput) +
					Math.sign(formData.shortBreakInput) +
					Math.sign(formData.longBreakInput) +
					Math.sign(formData.longBreakInterval) ===
				4;

			if (!dataIsValid) return;

			controlSettings(formData);
			this.overlay.classList.add("hidden");
			this.settingsDiv.classList.add("hidden");
		}

		this.settingsForm.addEventListener("submit", abstractedHandler.bind(this));
		this.overlay.addEventListener("click", abstractedHandler.bind(this));
		this.closeBtn.addEventListener("click", abstractedHandler.bind(this));

		// this.settingsForm.addEventListener("submit", function (event) {
		// 	event.preventDefault();
		// 	const formData = Object.fromEntries([...new FormData(this)]);
		// 	controlSettings(formData);
		// });
	}
}

export default new SettingsView();

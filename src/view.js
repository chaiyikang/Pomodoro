import { activeInterval } from "./controller.js";
class TimerView {
	settingsBtn = document.querySelector(".open-settings");
	settingsDiv = document.querySelector(".settings");
	overlay = document.querySelector(".overlay");
	timeDisplay = document.querySelector(".timer");
	startStopButton = document.querySelector(".start-stop");
	pomodoroButton = document.querySelector(".pomodoro");
	shortBreakButton = document.querySelector(".short-break");
	longBreakButton = document.querySelector(".long-break");
	messageEle = document.querySelector(".message");
	skipBtn = document.querySelector(".skip-timer-btn");
	intervalDisplay = document.querySelector(".counter");
	reportBtn = document.querySelector(".report-btn");
	reportDiv = document.querySelector(".report");
	reportCloseBtn = document.querySelector(".report-close");
	focusedTimeDisplay = document.querySelector(".display-hours");

	// event handlers

	addHandlerReportModal(getFocusedSeconds) {
		this.reportBtn.addEventListener("click", () => {
			this.focusedTimeDisplay.textContent = getFocusedSeconds();
			this.reportDiv.classList.remove("hidden");
			this.overlay.classList.remove("hidden");
		});
	}

	addHandlerCloseReport() {
		function handler() {
			const otherModalOpen = this.reportDiv.classList.contains("hidden");
			if (otherModalOpen) return;

			this.overlay.classList.add("hidden");
			this.reportDiv.classList.add("hidden");
		}

		this.overlay.addEventListener("click", handler.bind(this));
		this.reportCloseBtn.addEventListener("click", handler.bind(this));
	}

	addHandlerStartStop(handler) {
		this.startStopButton.addEventListener("click", (event) => {
			// arrow function keeps this referring to object instead of element
			this.handlerStartStop(handler);
		});
	}
	handlerStartStop(handler) {
		if (activeInterval) {
			this.changeButtonStart();
			handler(false);
		} else {
			this.changeButtonStop();
			handler(true);
		}
		this.updateSkipBtn();
	}

	addHandlerSkip(handler) {
		this.skipBtn.addEventListener("click", handler);
	}

	addHandlerTypes(handler) {
		this.pomodoroButton.addEventListener("click", () => {
			handler("pomodoro");
		});
		this.shortBreakButton.addEventListener("click", () => {
			handler("shortBreak");
		});
		this.longBreakButton.addEventListener("click", () => {
			handler("longBreak");
		});
	}

	// utility methods

	updateIntervalDisplay(cycles, reps) {
		this.intervalDisplay.textContent = `Cycle: #${cycles} Rep: #${reps}`;
	}

	updateSkipBtn() {
		if (activeInterval) {
			this.skipBtn.classList.remove("hidden");
			return;
		}
		this.skipBtn.classList.add("hidden");
	}

	updateMessage(type) {
		this.messageEle.textContent = type === "pomodoro" ? "Time to Focus!" : "Time for a break!";
	}

	updateBackgroundColor(type) {
		if (type === "pomodoro") {
			document.body.style.backgroundColor = "rgb(186, 73, 73)";
			this.startStopButton.style.color = "rgb(186, 73, 73)";
		} else if (type === "shortBreak") {
			document.body.style.backgroundColor = "rgb(56, 133, 138)";
			this.startStopButton.style.color = "rgb(56, 133, 138)";
		} else {
			document.body.style.backgroundColor = "rgb(57, 112, 151)";
			this.startStopButton.style.color = "rgb(57, 112, 151)";
		}
	}

	updateActiveButton(type) {
		this.pomodoroButton.classList.remove("button-active");
		this.shortBreakButton.classList.remove("button-active");
		this.longBreakButton.classList.remove("button-active");

		this[`${type}Button`].classList.add("button-active");
	}

	updateTimeDisplay(sec) {
		let displayMin = Math.floor(sec / 60);
		let displaySec = sec % 60;
		this.timeDisplay.innerHTML =
			`${displayMin}:`.padStart(3, "0") + `${displaySec}`.padStart(2, "0");
	}

	// helper methods
	clickStartStop() {
		this.startStopButton.click();
	}

	changeButtonStop() {
		this.startStopButton.dataset.state = "stop";
		this.startStopButton.textContent = "PAUSE";
	}

	changeButtonStart() {
		this.startStopButton.dataset.state = "start";
		this.startStopButton.textContent = "START";
	}
}

export default new TimerView();

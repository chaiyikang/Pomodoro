import helper from "./helpers.js";
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

	addHandlerSettingsModal(handler) {
		function settingsHandler(event) {
			helper.initSettingsValues();
			this._settingsDiv.classList.remove("hidden");
			this._overlay.classList.remove("hidden");
		}

		this.settingsBtn.addEventListener(
			"click",
			settingsHandler.bind({
				_settingsDiv: this.settingsDiv,
				_overlay: this.overlay,
			})
		);
	}

	clickStartStop() {
		this.startStopButton.click();
	}

	addHandlerStartStop(handler) {
		this.startStopButton.addEventListener("click", (event) => {
			if (this.startStopButton.dataset.state === "stop") {
				this.changeButtonStart();
				handler(false);
			} else {
				this.changeButtonStop();
				handler(true);
			}
		});
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

	updateMessage(type) {
		this.messageEle.textContent = type === "pomodoro" ? "Time to Focus!" : "Time for a break!";
	}

	changeButtonStop() {
		this.startStopButton.dataset.state = "stop";
		this.startStopButton.textContent = "PAUSE";
	}

	changeButtonStart() {
		this.startStopButton.dataset.state = "start";
		this.startStopButton.textContent = "START";
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
}

export default new TimerView();

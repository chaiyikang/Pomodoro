import TimerView from "./view.js";
import * as model from "./model.js";
import settingsView from "./settingsView.js";
let activeInterval;

const report = document.querySelector(".report-btn");
report.addEventListener("click", () => {
	console.log(model.state.durationLeftSec);
});

function clearIntervalSetFalse() {
	clearInterval(activeInterval);
	activeInterval = false;
}

function controlStartStop(trueForStart) {
	if (!trueForStart) {
		//stop
		clearIntervalSetFalse();
		return;
	}

	//start
	const timeStampStart = new Date().getTime();
	const timeStampEnd = timeStampStart + model.state.durationLeftSec * 1000;

	activeInterval = setInterval(() => {
		let timeStampCurrent = new Date().getTime();
		let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);

		model.state.durationLeftSec = timeLeftSec;

		TimerView.updateTimeDisplay(model.state.durationLeftSec);
		if (timeLeftSec <= 0) clearIntervalSetFalse();
		//TODO: handle when timer finishes
	}, 1000);
}

function controlPomodoro(type) {
	clearIntervalSetFalse();
	model.updateActiveTypeResetDurationLeft(type);
	TimerView.updateActiveButton(model.state.activeType);
	TimerView.changeButtonStart();
	TimerView.updateTimeDisplay(model.state.durationLeftSec);
	TimerView.updateBackgroundColor(type);
	TimerView.updateMessage(type);
}

function controlSettings(formData) {
	console.log(formData);
	const timeElapsed = model.state.elapsed;
	const noRunningNoPausedTimer =
		!activeInterval && model.state.durationLeftSec === model.state.activeLength;

	model.updateLengths(formData.pomodoroInput, formData.shortBreakInput, formData.longBreakInput);

	if (noRunningNoPausedTimer) {
		// alert("noRunningNoPausedTimer");
		controlPomodoro(model.state.activeType);
		return;
	}

	const noRunningPausedTimer = !activeInterval;
	if (noRunningPausedTimer) {
		// alert("noRunningPausedTimer");
		model.state.durationLeftSec = model.state.activeLength - timeElapsed;
		TimerView.updateTimeDisplay(model.state.durationLeftSec);
		return;
	}

	if (activeInterval) {
		model.state.durationLeftSec = model.state.activeLength - timeElapsed;
		controlStartStop(false);
		controlStartStop(true);
		return;
	}

	alert("Something went wrong");
}

function init() {
	TimerView.updateTimeDisplay(model.state.pomodoroLengthSec);
	TimerView.addHandlerStartStop(controlStartStop);
	TimerView.addHandlerTypes(controlPomodoro);
	TimerView.addHandlerSettingsModal();
	controlPomodoro("pomodoro");
	settingsView.addHandlerCloseSettingsModal();
	settingsView.addHandlerSettings(controlSettings);
}

init();

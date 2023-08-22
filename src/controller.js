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
		if (timeLeftSec > 0) {
			return;
		}
		controlTimerEnded();
	}, 1000);
}

function controlTimerEnded() {
	clearIntervalSetFalse();
	model.state.updateCycleTracker();
	controlPomodoro(model.state.nextType);

	const autoPomodoro =
		model.state.cycleTracker.activeType === "pomodoro" && model.state.toggleStartPomodoro;
	if (autoPomodoro) TimerView.clickStartStop();

	const autoBreaks =
		(model.state.cycleTracker.activeType === "shortBreak" ||
			model.state.cycleTracker.activeType === "longBreak") &&
		model.state.toggleStartBreaks;
	if (autoBreaks) TimerView.clickStartStop();
}

function controlPomodoro(type) {
	clearIntervalSetFalse();
	model.state.updateActiveTypeResetDurationLeft(type);
	TimerView.updateActiveButton(model.state.cycleTracker.activeType);
	TimerView.changeButtonStart();
	TimerView.updateSkipBtn(activeInterval);
	TimerView.updateTimeDisplay(model.state.durationLeftSec);
	TimerView.updateBackgroundColor(type);
	TimerView.updateMessage(type);
}

function controlSettings(formData) {
	const timeElapsed = model.state.elapsed;
	const noRunningNoPausedTimer =
		!activeInterval && model.state.durationLeftSec === model.state.activeLength;

	model.updateSettings(formData);

	if (noRunningNoPausedTimer) {
		// alert("noRunningNoPausedTimer");
		controlPomodoro(model.state.cycleTracker.activeType);
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
	TimerView.addHandlerSkip(controlTimerEnded);
	TimerView.addHandlerSettingsModal();
	controlPomodoro("pomodoro");
	// settingsView.addHandlerCloseSettingsModal();
	settingsView.addHandlerSettingsForm(controlSettings);
}

init();

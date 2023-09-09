import TimerView from "./views/view.js";
import * as model from "./model.js";
import settingsView from "./views/settingsView.js";
import colorsView from "./views/colorsView.js";
import audio from "./audio.js";
import notifications from "./notifications.js";
import helper from "./helpers.js";

export let activeInterval;
intervalEndedAudio = document.querySelector(".interval-ended-audio");

// if (module.hot) {
// 	module.hot.accept();
// }

function controlStartStop(trueForStart) {
	if (!trueForStart) {
		//stop
		clearIntervalSetFalse();
		model.updateLocalStorage();
		return;
	}

	//start
	model.state.timerRunning = true;
	model.updateLocalStorage();
	const timeStampStart = new Date().getTime();
	const timeStampEnd = timeStampStart + model.state.durationLeftSec * 1000;

	activeInterval = setInterval(() => {
		countDown(timeStampEnd);
		if (model.state.durationLeftSec > 0) {
			return;
		}
		controlTimerEnded();
	}, 1000);
}

function controlTimerEnded() {
	audio.playIntervalEnded();
	clearIntervalSetFalse();
	model.state.updateCycleTracker();
	const notificationMessage =
		model.state.nextType === "pomodoro"
			? `Time to work!`
			: `Time to take a ${helper.formatIntervalString(model.state.nextType)}!`;
	new Notification("Pomofocus", {
		body: notificationMessage,
	});
	// after controlPomodoro is caled, active type is mutated, hence nextType is mutated.
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
	TimerView.updateSkipBtn();
	TimerView.updateTimeDisplay(model.state.durationLeftSec);
	TimerView.updateBackgroundColor(type, getSettings);
	TimerView.updateMessage(type);
	TimerView.updateIntervalDisplay(...determineDisplayCycleRep());
}

function initPomodoro(type) {
	TimerView.updateActiveButton(model.state.cycleTracker.activeType);
	// TimerView.changeButtonStart();
	// TimerView.updateSkipBtn();
	TimerView.updateTimeDisplay(model.state.durationLeftSec);
	TimerView.updateBackgroundColor(type, getSettings);
	TimerView.updateMessage(type);
	TimerView.updateIntervalDisplay(...determineDisplayCycleRep());

	if (!model.state.timerRunning) {
		TimerView.changeButtonStart();
		return;
	}

	TimerView.clickStartStop();
}

function controlSettings(formData) {
	const timeElapsed = model.state.elapsed;
	const noRunningNoPausedTimer =
		!activeInterval && model.state.durationLeftSec === model.state.activeLength;

	model.updateSettings(formData);

	const noRunningPausedTimer = !activeInterval;

	if (noRunningNoPausedTimer) {
		controlPomodoro(model.state.cycleTracker.activeType);
	} else if (noRunningPausedTimer) {
		model.state.durationLeftSec = model.state.activeLength - timeElapsed;
		TimerView.updateTimeDisplay(model.state.durationLeftSec);
	} else if (activeInterval) {
		model.state.durationLeftSec = model.state.activeLength - timeElapsed;
		controlStartStop(false);
		controlStartStop(true);
	}

	model.updateLocalStorage();
}

function controlUpdateColorSettings(type, color) {
	model.state[`${type}Color`] = color;
	model.updateLocalStorage();
}

function init() {
	notifications.checkPermission();
	// TimerView.updateTimeDisplay(model.state.pomodoroLengthSec);
	TimerView.addHandlerStartStop(controlStartStop);
	TimerView.addHandlerTypes(controlPomodoro);
	TimerView.addHandlerSkip(controlTimerEnded);
	settingsView.addHandlerSettingsModal(getSettings);
	TimerView.addHandlerReportModal(() => model.state.secondsFocused);
	TimerView.addHandlerCloseReport();

	initPomodoro(model.state.cycleTracker.activeType);

	settingsView.addHandlerSettingsForm(controlSettings);
	colorsView.addHandlerOpenColorPickerModal(getSettings);
	colorsView.addHandlerSubmitColor(controlUpdateColorSettings, getSettings);
	colorsView.addHandlerCloseColorPickerModalWithOverlay();
	audio.addHandlerAudio();
}

init();

// helper functions
function getSettings() {
	return { ...model.state };
}

function clearIntervalSetFalse() {
	clearInterval(activeInterval);
	activeInterval = false;
	model.state.timerRunning = false;
	model.updateLocalStorage();
}

function countDown(timeStampEnd) {
	let timeStampCurrent = new Date().getTime();
	let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);
	if (timeLeftSec === 5 * 60 && Notification.permission === "granted") {
		new Notification("Pomofocus", { body: "5 minutes left!" });
	}

	model.state.durationLeftSec = timeLeftSec;
	model.state.secondsFocused++;
	model.updateLocalStorage();

	TimerView.updateTimeDisplay(model.state.durationLeftSec);
}

function determineDisplayCycleRep() {
	if (model.state.cycleTracker.activeType === "pomodoro") {
		return [model.state.completedSets + 1, model.state.currentRepToDo];
	}
	if (model.state.cycleTracker.totalRepsDone === 0) return [1, 1];

	let currSet;
	let currRep;
	if (model.state.currentRepToDo === 1) {
		currSet = model.state.completedSets;
		currRep = model.state.longBreakInterval;
	} else {
		currSet = model.state.completedSets + 1;
		currRep = model.state.currentRepToDo - 1;
	}
	return [currSet, currRep];
}

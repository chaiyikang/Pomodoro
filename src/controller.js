import TimerView from "./view.js";
import * as model from "./model.js";
import settingsView from "./settingsView.js";
let activeInterval;

function controlStartStop(trueForStart) {
	if (!trueForStart) {
		//stop
		clearInterval(activeInterval);
		return;
	}

	//start
	const timeStampStart = new Date().getTime();
	const timeStampEnd = timeStampStart + model.state.durationLeftSec * 1000;

	activeInterval = setInterval(() => {
		let timeStampCurrent = new Date().getTime();
		let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);

		model.state.durationLeftSec = timeLeftSec;

		TimerView.updateTimeDisplay(timeLeftSec);

		if (timeLeftSec <= 0) clearInterva(activeInterval);
		//TODO: handle when timer finishes
	}, 1000);
}

function controlPomodoro(type) {
	clearInterval(activeInterval);
	model.state.durationLeftSec = model.state[`${type}LengthSec`];
	TimerView.updateActiveButton(type);
	TimerView.changeButtonStart();
	TimerView.updateTimeDisplay(model.state[`${type}LengthSec`]);
	TimerView.updateBackgroundColor(type);
	TimerView.updateMessage(type);
}

function controlSettings(formData) {
	console.log(formData);
}

function init() {
	TimerView.updateTimeDisplay(model.state.pomodoroLengthSec);
	TimerView.addHandlerStartStop(controlStartStop);
	TimerView.addHandlerTypes(controlPomodoro);
	TimerView.addHandlerSettingsModal();
	settingsView.addHandlerCloseSettingsModal();
	settingsView.addHandlerSettings(controlSettings);
}

init();

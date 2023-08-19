import * as model from "./model.js";
class Helper {
	pomodoroInput = document.querySelector(".pomodoro-input");
	shortBreakInput = document.querySelector(".shortBreak-input");
	longBreakInput = document.querySelector(".longBreak-input");
	autoPomodoroInput = document.querySelector(".start-pomodoro");
	autoBreaksInput = document.querySelector(".start-breaks");
	longBreakInterval = document.querySelector(".long-break-interval-input");

	initSettingsValues() {
		this.pomodoroInput.value = model.state.pomodoroLengthSec / 60;
		this.shortBreakInput.value = model.state.shortBreakLengthSec / 60;
		this.longBreakInput.value = model.state.longBreakLengthSec / 60;
		this.autoBreaksInput.checked = model.state.toggleStartBreaks;
		this.autoPomodoroInput.checked = model.state.toggleStartPomodoro;
		this.longBreakInterval.value = model.state.longBreakInterval;
	}
}

export default new Helper();

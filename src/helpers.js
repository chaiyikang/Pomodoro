import * as model from "./model.js";
class Helper {
	pomodoroInput = document.querySelector(".pomodoro-input");
	shortBreakInput = document.querySelector(".shortBreak-input");
	longBreakInput = document.querySelector(".longBreak-input");

	initSettingsValues() {
		this.pomodoroInput.value = model.state.pomodoroLengthSec / 60;
		this.shortBreakInput.value = model.state.shortBreakLengthSec / 60;
		this.longBreakInput.value = model.state.longBreakLengthSec / 60;
	}
}

export default new Helper();

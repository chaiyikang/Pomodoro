export const state = {
	pomodoroLengthSec: 25 * 60,
	durationLeftSec: 25 * 60,
	shortBreakLengthSec: 5 * 60,
	longBreakLengthSec: 15 * 60,
	activeType: "pomodoro",

	get activeLength() {
		return this[`${this.activeType}LengthSec`];
	},

	get elapsed() {
		return this[`${this.activeType}LengthSec`] - this.durationLeftSec;
	},
};

export function updateActiveTypeResetDurationLeft(type) {
	state.activeType = type;
	state.durationLeftSec = state[`${state.activeType}LengthSec`];
}

export function updateLengths(pomodoroLength, shortBreakLength, longBreakLength) {
	state.pomodoroLengthSec = pomodoroLength * 60;
	state.shortBreakLengthSec = shortBreakLength * 60;
	state.longBreakLengthSec = longBreakLength * 60;
}

function init() {
	state.durationLeftSec = state.pomodoroLengthSec;
}

init();

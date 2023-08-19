export const state = {
	pomodoroLengthSec: 25 * 60,
	durationLeftSec: 25 * 60,
	shortBreakLengthSec: 5 * 60,
	longBreakLengthSec: 15 * 60,
	toggleStartBreaks: true,
	toggleStartPomodoro: true,
	longBreakInterval: 4,
	cycleTracker: {
		activeType: "pomodoro",
		cycle: 1,
		work: 1,
	},

	get nextType() {
		if (
			state.cycleTracker.activeType === "pomodoro" &&
			state.cycleTracker.cycle < state.longBreakInterval
		) {
			return "shortBreak";
		} else if (
			state.cycleTracker.activeType === "pomodoro" &&
			state.cycleTracker.cycle === state.longBreakInterval
		) {
			return "longBreak";
		} else return "pomodoro";
	},

	get activeLength() {
		return this[`${this.cycleTracker.activeType}LengthSec`];
	},

	get elapsed() {
		return this[`${this.cycleTracker.activeType}LengthSec`] - this.durationLeftSec;
	},
};

export function updateActiveTypeResetDurationLeft(type) {
	state.cycleTracker.activeType = type;
	state.durationLeftSec = state[`${state.cycleTracker.activeType}LengthSec`];
}

export function updateLengths(pomodoroLength, shortBreakLength, longBreakLength) {
	state.pomodoroLengthSec = pomodoroLength * 60;
	state.shortBreakLengthSec = shortBreakLength * 60;
	state.longBreakLengthSec = longBreakLength * 60;
}

function init() {
	updateActiveTypeResetDurationLeft("pomodoro");
}

init();

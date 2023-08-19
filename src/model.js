export const state = {
	pomodoroLengthSec: 1,
	durationLeftSec: 1,
	shortBreakLengthSec: 1,
	longBreakLengthSec: 1,
	toggleStartBreaks: true,
	toggleStartPomodoro: true,
	longBreakInterval: 4,
	cycleTracker: {
		activeType: "pomodoro",
		totalRepsDone: 0,
		get currentSet() {
			return this.totalRepsDone === 0 ? 1 : Math.ceil(this.totalRepsDone / 4);
		},
		get currentRepToDo() {
			return (this.totalRepsDone + 1) % 4 === 0 ? 4 : (this.totalRepsDone + 1) % 4;
		},
	},

	updateCycleTracker() {
		if (this.cycleTracker.activeType !== "pomodoro") {
			return;
		}
		this.cycleTracker.totalRepsDone++;
		console.log(`total reps done: ${this.cycleTracker.totalRepsDone}`);
		console.log(`current set: ${this.cycleTracker.currentSet}`);
		console.log(`current rep to do: ${this.cycleTracker.currentRepToDo}`);
	},

	get nextType() {
		if (this.cycleTracker.activeType !== "pomodoro") {
			return "pomodoro";
		}
		if (this.cycleTracker.currentRepToDo === 1) {
			return "longBreak";
		}
		return "shortBreak";
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

export const state = {
	durationLeftSec: 0.1 * 60,

	pomodoroLengthSec: 0.1 * 60,
	shortBreakLengthSec: 0.1 * 60,
	longBreakLengthSec: 0.1 * 60,

	toggleStartBreaks: false,
	toggleStartPomodoro: false,
	longBreakInterval: 4,

	cycleTracker: {
		activeType: "pomodoro",
		totalRepsDone: 0,
	},

	get currentSet() {
		return this.cycleTracker.totalRepsDone === 0
			? 1
			: Math.ceil(this.cycleTracker.totalRepsDone / this.longBreakInterval);
	},

	get currentRepToDo() {
		const currRep = (this.cycleTracker.totalRepsDone + 1) % this.longBreakInterval;
		return currRep === 0 ? this.longBreakInterval : currRep;
	},

	updateCycleTracker() {
		if (this.cycleTracker.activeType !== "pomodoro") {
			return;
		}
		this.cycleTracker.totalRepsDone++;
		// console.log(`total reps done: ${this.cycleTracker.totalRepsDone}`);
		// console.log(`current set: ${this.currentSet}`);
		// console.log(`current rep to do: ${this.currentRepToDo}`);
	},

	get nextType() {
		if (this.cycleTracker.activeType !== "pomodoro") {
			return "pomodoro";
		}
		if (this.currentRepToDo === 1) {
			return "longBreak";
		}
		return "shortBreak";
	},

	get activeLength() {
		return this[`${this.cycleTracker.activeType}LengthSec`];
	},

	get elapsed() {
		return this.activeLength - this.durationLeftSec;
	},

	updateActiveTypeResetDurationLeft(type) {
		this.cycleTracker.activeType = type;
		this.durationLeftSec = this.activeLength;
	},
};

// if boxes aren't ticked, omitted from FormData completely
export function updateSettings({
	pomodoroInput,
	shortBreakInput,
	longBreakInput,
	toggleStartBreaks = false,
	toggleStartPomodoro = false,
	longBreakInterval,
}) {
	state.pomodoroLengthSec = +pomodoroInput * 60;
	state.shortBreakLengthSec = +shortBreakInput * 60;
	state.longBreakLengthSec = +longBreakInput * 60;
	state.toggleStartBreaks = toggleStartBreaks && true;
	state.toggleStartPomodoro = toggleStartPomodoro && true;
	state.longBreakInterval = +longBreakInterval;
}

function init() {
	state.updateActiveTypeResetDurationLeft("pomodoro");
}

init();

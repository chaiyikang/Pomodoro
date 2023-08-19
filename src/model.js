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
		totalReps: 0,
		get currentSet() {
			return this.totalReps === 0 ? 1 : Math.ceil(this.totalReps / 4);
		},
		get currentRep() {
			return (this.totalReps + 1) % 4 === 0 ? 4 : this.totalReps % 4;
		},
	},

	updateCycleTracker() {
		if (this.cycleTracker.activeType === "pomodoro") {
			return;
		}
		this.cycleTracker.totalReps++;
		console.log(`total reps: ${this.cycleTracker.totalReps}`);
		console.log(`current set: ${this.cycleTracker.currentSet}`);
	},

	get nextType() {
		if (this.cycleTracker.activeType !== "pomodoro") {
			return "pomodoro";
		}
		if (this.cycleTracker.currentRep < this.longBreakInterval) {
			return "shortBreak";
		}
		return "longBreak";
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

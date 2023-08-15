export const state = {
	pomodoroLengthSec: 50 * 60,
	durationLeftSec: 25 * 60,
	shortBreakLengthSec: 5 * 60,
	longBreakLengthSec: 15 * 60,
};

function init() {
	state.durationLeftSec = state.pomodoroLengthSec;
}

init();

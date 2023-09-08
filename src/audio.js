class Audio {
	startStopButton = document.querySelector(".start-stop");
	startStopAudio = document.querySelector(".start-stop-audio");
	intervalEndedAudio = document.querySelector(".interval-ended-audio");

	addHandlerAudio() {
		this.startStopButton.addEventListener("click", (e) => {
			if (!e.isTrusted) return;
			this.startStopAudio.play();
		});
	}

	playIntervalEnded() {
		document.querySelector(".interval-ended-audio").play();
	}
}

export default new Audio();

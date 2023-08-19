class SettingsView {
	settingsForm = document.querySelector(".settings-form");
	settingsDiv = document.querySelector(".settings");
	overlay = document.querySelector(".overlay");
	closeBtn = document.querySelector(".close-btn");

	// addHandlerCloseSettingsModal() {
	// 	function closeModal(event) {
	// 		this.overlay.classList.add("hidden");
	// 		this.settingsDiv.classList.add("hidden");
	// 	}
	// 	const handler = closeModal.bind({ settingsDiv: this.settingsDiv, overlay: this.overlay });

	// 	this.overlay.addEventListener("click", handler);
	// 	this.closeBtn.addEventListener("click", handler);
	// }

	addHandlerSettingsForm(controlSettings) {
		function abstractedHandler(event) {
			event.preventDefault();
			const formData = Object.fromEntries([...new FormData(this.settingsForm)]);
			console.log(formData);
			controlSettings(formData);
			this.overlay.classList.add("hidden");
			this.settingsDiv.classList.add("hidden");
		}

		this.settingsForm.addEventListener("submit", abstractedHandler.bind(this));
		this.overlay.addEventListener("click", abstractedHandler.bind(this));
		this.closeBtn.addEventListener("click", abstractedHandler.bind(this));

		// this.settingsForm.addEventListener("submit", function (event) {
		// 	event.preventDefault();
		// 	const formData = Object.fromEntries([...new FormData(this)]);
		// 	controlSettings(formData);
		// });
	}
}

export default new SettingsView();

class SettingsView {
	settingsForm = document.querySelector(".settings-form");
	settingsDiv = document.querySelector(".settings");
	overlay = document.querySelector(".overlay");
	closeBtn = document.querySelector(".close-btn");

	addHandlerCloseSettingsModal() {
		function closeModal(event) {
			this.overlay.classList.add("hidden");
			this.settingsDiv.classList.add("hidden");
		}

		const handler = closeModal.bind({ settingsDiv: this.settingsDiv, overlay: this.overlay });

		this.overlay.addEventListener("click", handler);
		this.closeBtn.addEventListener("click", handler);
	}

	addHandlerSettings(handler) {
		this.settingsForm.addEventListener("submit", function (event) {
			event.preventDefault();
			const formData = Object.fromEntries([...new FormData(this)]);
			handler(formData);
		});
	}
}

export default new SettingsView();

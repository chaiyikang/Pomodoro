class SettingsView {
	settingsForm = document.querySelector(".settings-form");

	addHandlerSettings(handler) {
		this.settingsForm.addEventListener("submit", function (event) {
			event.preventDefault();
			const formData = Object.fromEntries([...new FormData(this)]);
			handler(formData);
		});
	}
}

export default new SettingsView();

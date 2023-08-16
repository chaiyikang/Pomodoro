class SettingsView {
	settingsForm = document.querySelector(".settings-form");

	addHandlerSettings(handler) {
		console.log(this);
		console.log(this.settingsForm);
		this.settingsForm.addEventListener("submit", function (event) {
			event.preventDefault();
			handler();
			console.log(this);
		});
	}
}

export default new SettingsView();

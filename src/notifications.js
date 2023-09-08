class Notifications {
	checkPermission() {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}
}

export default new Notifications();

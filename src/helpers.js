class Helpers {
	formatIntervalString(camelCase) {
		const spacedString = camelCase.replace(/([A-Z])/g, " $1");
		const displayType = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
		return displayType;
	}
}

export default new Helpers();

window.location.hash = "#how-to-use";

const settings = document.getElementById("settings");
settings.addEventListener("change", (e) => {
	chrome.storage.sync.get(['settings'], (result) => {
		const element = e.target;
		const settings = result.settings;

		if (element.id === "enable-alerts") {
			settings.alerts = element.checked;
		} else if (element.id === "autocopy") {
			settings.autoCopy = element.checked;
		} else {
			switch(element.id) {
				case "ext-alert":
					settings.alertType = "extension";
					break;
				case "page-alert":
					settings.alertType = "page";
					break;
			}
		}

		chrome.storage.sync.set({settings: settings});
	});
});

chrome.storage.sync.get(['settings'], (result) => {
	const settings = result.settings;

	const enableAlerts = document.getElementById("enable-alerts");
	const autocopy = document.getElementById("autocopy");
	const extAlert = document.getElementById("ext-alert");
	const pageAlert = document.getElementById("page-alert");

	console.log(settings);

	enableAlerts.checked = settings.alerts;
	autocopy.checked = settings.autoCopy;

	switch(settings.alertType) {
		case 'extension':
			extAlert.checked = true;
			break;
		case 'page':
			pageAlert.checked = true;
			break;
	}
});



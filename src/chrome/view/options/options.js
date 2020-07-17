window.location.hash = "#how-to-use";

const settings = document.getElementById("settings");
settings.addEventListener("change", (e) => {
	chrome.storage.sync.get(['settings'], (result) => {
		const element = e.target;
		const settings = result.settings;

		if (element.id === "autocopy") {
			settings.autoCopy = element.checked;
		} else {
			settings.popupType = element.id;
		}

		chrome.storage.sync.set({settings: settings});
	});
});

chrome.storage.sync.get(['settings'], (result) => {
	const settings = result.settings;

	const autocopy = document.getElementById("autocopy");
	const popupBox = document.getElementById(settings.popupType);

	console.log(settings);

	autocopy.checked = settings.autoCopy;
	popupBox.checked = true;
});

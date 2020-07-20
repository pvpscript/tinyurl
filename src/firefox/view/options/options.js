window.location.hash = "#how-to-use";

const settings = document.getElementById("settings");
settings.addEventListener("change", (e) => {
	browser.storage.sync.get(['settings'], (result) => {
		const element = e.target;
		const settings = result.settings;

		if (element.id === "autocopy") {
			settings.autoCopy = element.checked;
		}

		browser.storage.sync.set({settings: settings});
	});
});

browser.storage.sync.get(['settings'], (result) => {
	const settings = result.settings;
	const autocopy = document.getElementById("autocopy");

	autocopy.checked = settings.autoCopy;
});

chrome.contextMenus.create({
	title: "Create TinyURL",
	contexts: ["all"],
	id: "create",
}, () => {
	console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
	title: "Create TinyURL with alias",
	contexts: ["all"],
	id: "create_alias"
}, () => {
	console.log(chrome.runtime.lastError);
});

const menus = {
	"create": (url, settings) => { 
		const formattedUrl = formatUrl(encodeURIComponent(url));
		console.log(formattedUrl);

		makeTinyUrl(formattedUrl, settings);
	},
	"create_alias": (url, settings) => {
		const showPrompt = settings.popupType == "page"
			? (msg, callback) => tabPrompt(msg, callback)
			: (msg, callback) => {
				const res = prompt(msg);
				callback(res);
			};

		showPrompt("Type in an alias", (alias) => {
			if (alias) {
				const formattedUrl = formatUrl(
					encodeURIComponent(url),
					encodeURIComponent(alias)
				);

				makeTinyUrl(formattedUrl, settings);
			}
		});
	}
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
	const method = menus[info.menuItemId];

	chrome.storage.sync.get(['settings'], (result) => {
		method(tab.url, result.settings);
	});
});


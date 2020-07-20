browser.contextMenus.create({
	title: "Create TinyURL",
	contexts: ["all"],
	id: "create",
});

browser.contextMenus.create({
	title: "Create TinyURL with alias",
	contexts: ["all"],
	id: "create_alias"
});

const menus = {
	"create": (url, settings) => { 
		const formattedUrl = formatUrl(encodeURIComponent(url));
		console.log(formattedUrl);

		makeTinyUrl(formattedUrl, settings);
	},
	"create_alias": (url, settings) => {
		tabPrompt("Type in an alias", (alias) => {
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

browser.contextMenus.onClicked.addListener((info, tab) => {
	const method = menus[info.menuItemId];

	browser.storage.sync.get(['settings'], (result) => {
		method(tab.url, result.settings);
	});
});


chrome.contextMenus.create({
	title: "Create TinyURL",
	contexts: ["page"],
	id: "create",
});

chrome.contextMenus.create({
	title: "Create TinyURL with alias",
	contexts: ["page"],
	id: "create_alias"
});

const menus = {
	"create": (url) => { 
		const formattedUrl = formatUrl(encodeURIComponent(url));
		console.log(formattedUrl);

		makeTinyUrl(formattedUrl);
	},
	"create_alias": (url) => {
		tabPrompt("Type in an alias", (alias) => {
			if (alias) {
				const formattedUrl = formatUrl(
					encodeURIComponent(url),
					encodeURIComponent(alias)
				);

				makeTinyUrl(formattedUrl);
			}
		});
	}
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
	const method = menus[info.menuItemId];

	method(tab.url);
});


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
		const alias = prompt("Type in an alias");

		if (alias) {
			const formattedUrl =
				formatUrl(encodeURIComponent(url), alias);
			console.log(formattedUrl);

			makeTinyUrl(formattedUrl);
		}
	}
}


chrome.contextMenus.onClicked.addListener((info, tab) => {
	const method = menus[info.menuItemId];

	method(tab.url);
});


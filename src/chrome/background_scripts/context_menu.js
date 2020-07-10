chrome.contextMenus.create({
	title: "Create TinyURL",
	contexts: ["page"],
	id: "create_tinyurl",
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	const formattedUrl = formatUrl(tab.url);
	console.log(formattedUrl);

	makeTinyUrl(formattedUrl);
});


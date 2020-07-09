chrome.contextMenus.create({
	title: "Testing title",
	contexts: ["page"],
	id: "context_menu_id",
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	test();
});

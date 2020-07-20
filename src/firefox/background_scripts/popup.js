function makeTinyUrlFromPopup(url, alias) {
	const formattedUrl = formatUrl(encodeURIComponent(url), alias);

	browser.storage.sync.get(['settings'], (result) => {
		makeTinyUrl(formattedUrl, result.settings);
	});
}

const methods = {
	simple: (url, alias) => makeTinyUrlFromPopup(url, undefined),
	aliased: (url, alias) => makeTinyUrlFromPopup(url, alias),
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const action = methods[request.option];
	const alias = request.alias 
		? encodeURIComponent(request.alias)
		: undefined;

	browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
		action(tabs[0].url, alias);
	});
});

const resType = {
	error: [
		{
			query: /a url was not entered/i,
			msg: "A URL was not entered."
		},
		{
			query: /invalid url/i,
			msg: "Invalid URL."
		},
		{
			query: /alias is not available/i,
			msg: "Alias is not available."
		}
	],
	success: {
		query: /tinyurl was created/i,
		msg: "TinyURL was created!"
	}
};

function formatUrl(url, alias) {
	const model = "https://tinyurl.com/create.php?source=indexpage&url=" +
		url + (alias ? ("&alias=" + alias) : "");

	return model;
}

function copyToClipboard(text) {
	const randId = Math.random().toString(36).slice(2, -1);
	const txtElement = document.createElement("textarea");
	txtElement.textContent = text;

	document.body.appendChild(txtElement);
	txtElement.select();

	document.execCommand("copy");

	document.body.removeChild(txtElement);
}

const tabAlert = (msg) =>
	chrome.tabs.executeScript(null, {
		code: `alert(decodeURI("${msg}"));`
	});

const tabPrompt = (msg, callback) =>
	chrome.tabs.executeScript(null, {
		code: `prompt(decodeURI("${msg}"));`
	}, callback);

function makeTinyUrl(formattedUrl, settings) {
	fetch(formattedUrl).then(r => r.text()).then(result => {
		const showAlert = settings.popupType == "page"
			? (msg) => tabAlert(msg)
			: (msg) => alert(decodeURI(msg));

		const parser = new DOMParser();
		const html = parser.parseFromString(result, "text/html");

		const elements = html.querySelector('div[id="contentcontainer"]')
			.children[0].innerText;
		
		if (elements.search(resType.success.query) > -1) {
			const url = html.querySelector('a[id="copy_div"]').href;
			if (settings.autoCopy) {
				copyToClipboard(url);
			}

			showAlert(resType.success.msg + "%0A%0AURL: " + url);
		} else {
			let foundError = false;

			for (e of resType.error) {
				if (elements.search(e.query) > -1) {
					foundError = true;
					showAlert(e.msg);
					break;
				}
			}

			if (!foundError) {
				showAlert("An unknown error occurred.");
			}
		}
		//console.log(html);
	});
}

chrome.runtime.onInstalled.addListener(() => {
	const settings = {
		autoCopy: true,
		popupType: "page"
	};

	chrome.storage.sync.set({settings: settings});
});

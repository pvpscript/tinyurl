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

function makeTinyUrl(formattedUrl) {
	fetch(formattedUrl).then(r => r.text()).then(result => {
		const html = document.createElement("html");
		html.innerHTML = result;

		const elements = html.querySelector('div[id="contentcontainer"]')
			.children[0].innerText;
		
		if (elements.search(resType.success.query) > -1) {
			alert(resType.success.msg);
			const url = html.querySelector('a[id="copy_div"]').href;
			alert(`URL: ${url}`);
		} else {
			let foundError = false;

			for (e of resType.error) {
				if (elements.search(e.query) > -1) {
					foundError = true;
					alert(e.msg);
					break;
				}
			}

			if (!foundError) {
				alert("An unknown error occurred.");
			}
		}
		//console.log(html);
	});
}
